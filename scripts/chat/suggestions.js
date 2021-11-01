const list = document.querySelector(".suggestionsList");
const loading = document.querySelector(".loading");

const addSuggestion = document.querySelector(".addSuggestion");
const feedback = document.querySelector(".feedback");

const addSuggestionDOM = (suggestion, id) => {
	let html = `
        <div class="card rounded-2 shadow-sm m-2" data-id="${id}">
            <div class="card-header fw-bold h5 border-0">${suggestion.suggestion}</div>
            <div class="card-body">${
				suggestion.elaborate ? suggestion.elaborate : "<i>No elaboration was provided!</i>"
			}</div>
            <div class="card-footer text-muted">
                <small>${suggestion.name}</small>
            </div>
        </div>
    `;

	list.innerHTML = html + list.innerHTML;
};

const deleteSuggestionDOM = (id) => {
	const doc = document.querySelector(`[data-id="${id}"]`);

	if (!doc) {
		return;
	} else {
		doc.remove();
	}
};

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

addSuggestion.addEventListener("submit", (e) => {
	e.preventDefault();

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

	const now = new Date();
	const suggestion = {
		name: addSuggestion.name.value,
		suggestion: addSuggestion.suggestion.value,
		elaborate: addSuggestion.elaborate.value,
		created_at: firebase.firestore.Timestamp.fromDate(now),
	};

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
