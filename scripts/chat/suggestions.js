// Getting the list from the DOM
const list = document.querySelector(".suggestionsList");
const loading = document.querySelector(".loading");

// Getting the elements for adding a suggestion
const addSuggestion = document.querySelector(".addSuggestion");
const feedback = document.querySelector(".feedback");

/**
 * Add a new suggestion to the DOM.
 *
 * @param {{ suggestion: string, elaborate: string, paid: boolean, name: string }} suggestion The suggestion object retrieved from Firebase.
 * @param {string} id The identifier for each suggestion.
 */
const addSuggestionDOM = (suggestion, id) => {
	let html = `
        <div class="card rounded-2 shadow-sm m-2" data-id="${id}">
            <div class="card-header fw-bold h5 border-0">${suggestion.suggestion}</div>
            <div class="card-body">${
				suggestion.elaborate ? suggestion.elaborate : "<i>No elaboration was provided!</i>"
			}</div>
            <div class="card-footer text-muted">
                <small>${suggestion.paid ? `<i class="text-warning bi bi-coin"></i>&nbsp; ` : ""}${
		suggestion.name
	}</small>
            </div>
        </div>
    `;

	// Append to the start of the HTML
	list.innerHTML = html + list.innerHTML;
};

/**
 * Remove a suggestion from the DOM.
 *
 * @param {string} id The unique ID to find and remove.
 */
const deleteSuggestionDOM = (id) => {
	const doc = document.querySelector(`[data-id="${id}"]`);

	if (!doc) {
		return;
	} else {
		doc.remove();
	}
};

// Get the suggestions, and order them so that the latest created one will show last.
db.collection("suggestions")
	.orderBy("created_at", "asc")
	.onSnapshot((snapshot) => {
		snapshot.docChanges().forEach((change) => {
			const doc = change.doc;

			loading.classList.add("d-none");

			if (change.type === "added") {
				addSuggestionDOM(doc.data(), doc.id);
			} else if (change.type === "removed") {
				deleteSuggestionDOM(doc.id);
			}
		});
	});

// Wait for a new suggestion to be submitted...
addSuggestion.addEventListener("submit", (e) => {
	// Prevent the page from reloading
	e.preventDefault();

	// Informing the user of the processes
	feedback.classList.remove("text-success", "text-danger");
	feedback.classList.add("text-warning");
	feedback.innerHTML = `
        <div
            class="spinner-grow spinner-grow-sm me-2"
            role="status"
        >
            <span class="visually-hidden">Loading...</span>
        </div>
        <span>Adding suggestion...</span>
    `;

	// Making the Firebase object
	const paidUser = localStorage.getItem("authorizedVideos") ? true : false;
	const now = new Date();
	const suggestion = {
		name: addSuggestion.name.value,
		suggestion: addSuggestion.suggestion.value,
		elaborate: addSuggestion.elaborate.value,
		paid: paidUser,
		created_at: firebase.firestore.Timestamp.fromDate(now),
	};

	// Adding to the database
	db.collection("suggestions")
		.add(suggestion)
		.then(() => {
			feedback.classList.remove("text-warning");
			feedback.classList.add("text-success");
			feedback.innerHTML = `Successfully added suggestion!`;
		})
		.catch((err) => {
			console.log(err);

			feedback.classList.remove("text-warning");
			feedback.classList.add("text-danger");
			feedback.innerHTML = `An error occured while adding the suggestion. Please try again later.`;
		});
});
