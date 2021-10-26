// Getting the videos
const list = document.querySelector(".videos");
const loadingVideos = document.querySelector(".loadingVideos");

// Getting the elements for adding a video
const addVideoForm = document.querySelector(".addVideo");
const feedback = document.querySelector(".feedback");

// Getting the elements for deleting a video
const deleteFeedback = document.querySelector(".deleteFeedback");

/**
 * Add a video to the DOM.
 * 
 * @param {any} video The data of the video provided by Firestore.
 * @param {string} id The ID of the video provided by Firestore. This must be unique.
 */
const addVideo = (video, id) => {
	// Setting the HTML template
	let html = `
        <div class="card mt-3 shadow-sm video" data-id="${id}">
            <div class="card-body">
                <div class="row">
                    <div class="col-8 border-end border-2">
                        <img
                            class="img-fluid me-3"
                            src="${video.cover}"
                            alt="${video.title}"
                            width="100"
                            height="150"
                            draggable="false"
                        />

                        <span class="lead me-2">${video.title}</span>
                        <small class="text-muted me-5 text-break">${video.description}</small>
                    </div>
                    <div class="col">
                        <span class="text-muted m-2">
                            Length: <strong>${
								video.duration === 1
									? `${video.duration} min`
									: `${video.duration} mins`
							}</strong>
                        </span>

                        <button class="btn btn-danger m-2 deleteVideo" title="Delete video" data-type="BUTTON" data-id="${id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
	
	// Appending the HTML snippet to the start of the video list.
	list.innerHTML = html + list.innerHTML;
};
/**
 * Delete a video from the DOM.
 * 
 * @param {string} id The ID of the video to delete.
 */
const deleteVideo = (id) => {
	// Get all of the videos
	const video = document.querySelectorAll(".video");

	// For each of the videos, if the ID passed in is the ID for deleting, remove it from the DOM.
	video.forEach((video) => {
		if (video.getAttribute("data-id") === id) {
			video.remove();
		}
	});
};

// Firestore real-time listener (order by the most recent video at the top).
db.collection("videos")
	.orderBy("created_at", "asc")
	.onSnapshot((snapshot) => {
		// Cycle through each change
		snapshot.docChanges().forEach((change) => {
			// Get the document for each change
			const doc = change.doc;

			// Remove the loading symbol
			loadingVideos.classList.add("d-none");

			// Call a method depending on the type
			if (change.type === "added") {
				addVideo(doc.data(), doc.id);
			} else if (change.type === "removed") {
				deleteVideo(doc.id);
			}
		});
	});

// Add a video
addVideoForm.addEventListener("submit", (e) => {
	// Prevent the page from reloading
	e.preventDefault();

	// Inform the user that the video is being added to the database.
	feedback.classList.remove("text-success", "text-danger");
	feedback.classList.add("text-warning");
	feedback.innerHTML = `
        <div
            class="spinner-grow spinner-grow-sm me-2"
            role="status"
        >
            <span class="visually-hidden">Loading...</span>
        </div>
        <span>Adding "<i>${addVideoForm.title.value}</i>"!</span>
    `;

	// Set the data as a JavaScript object.
	// The new Date() is for the timestamp.
	const now = new Date();
	const video = {
		title: addVideoForm.title.value,
		description: addVideoForm.description.value,
		iframe: addVideoForm.iframe.value,
		cover: addVideoForm.cover.value,
		duration: addVideoForm.duration.valueAsNumber,
		created_at: firebase.firestore.Timestamp.fromDate(now),
	};

	// Add the video
	db.collection("videos")
		.add(video)
		.then(() => {
			// Inform the user that the addition was successful.
			feedback.classList.remove("text-warning");
			feedback.classList.add("text-success");
			feedback.innerHTML = `Successfully added video "<i>${addVideoForm.title.value}</i>"!`;
		})
		.catch((err) => {
			console.log(err);

			// Inform the user that the addition was problematic.
			feedback.classList.remove("text-warning");
			feedback.classList.add("text-danger");
			feedback.innerHTML = `An error occured while uploading "<i>${addVideoForm.title.value}</i>". Please try again later.`;
		});
});

// Delete a video
// Listen for a click inside the list.
list.addEventListener("click", (e) => {
	// If the type is a button, and the user confirmed that it should be deleted...
	if (
		e.target.getAttribute("data-type") === "BUTTON" &&
		confirm("Are you sure you want to delete the video? This action is irreversible!")
	) {
		// Inform the user that the deletion is in progress.
		deleteFeedback.classList.remove("text-success", "text-danger");
		deleteFeedback.classList.add("text-warning");
		deleteFeedback.innerHTML = `
            <div
                class="spinner-grow spinner-grow-sm me-2"
                role="status"
            >
                <span class="visually-hidden">Loading...</span>
            </div>
            <span>Deleting video, please wait...</span>
        `;

		// Get the ID to delete
		const id = e.target.getAttribute("data-id");

		// Delete the document with the ID
		db.collection("videos")
			.doc(id)
			.delete()
			.then(() => {
				// Inform the user that the deletion was successful.
				deleteFeedback.classList.remove("text-warning");
				deleteFeedback.classList.add("text-success");
				deleteFeedback.innerHTML = `Successfully deleted video!`;
			})
			.catch((err) => {
				console.log(err);

				// Inform the user that the deletion was problematic.
				deleteFeedback.classList.remove("text-warning");
				deleteFeedback.classList.add("text-danger");
				deleteFeedback.innerHTML = `An error occured while deleting the video. Please try again later.`;
			});
	}
});
