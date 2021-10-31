// Getting vital DOM elements
const allVideos = document.querySelector(".videos");
const displayFeedback = document.querySelector(".feedback");
const videoPopup = document.querySelector(".videoPopup");

/**
 * Display a video in the popup.
 * 
 * @param {{ title: string, iframe: string }} video The video object from Firebase.
 */
const displayVideo = (video) => {
	let html = `
        <div class="modal-header">
            <h5 class="modal-title" id="watchVideoLabel">${video.title}</h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
        </div>
        <div class="modal-body">
            ${video.iframe}
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
            </button>
        </div>
    `;

	videoPopup.innerHTML = html;
};

// Wait for a click on the Play button on the list of all videos.
// TODO Fix issue with button not responding when icon clicked.
allVideos.addEventListener("click", (e) => {
    // If the attribute data-type is a button (play button)...
	if (e.target.getAttribute("data-type") === "BUTTON") {
        // Make and set some loading content for the user
		let loadingHTML = `
            <div class="modal-header">
                <h5 class="modal-title" id="watchVideoLabel">
                    <div class="spinner-border spinner-border-sm me-1" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    Loading content...
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <p class="lead">Please wait... we're just getting the video data!</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                </button>
            </div>
        `;
		videoPopup.innerHTML = loadingHTML;

        // Inform the user that the video is still in progress
		displayFeedback.classList.remove("text-danger", "text-success");
		displayFeedback.classList.add("text-warning");
		displayFeedback.innerHTML = `
            <div class="spinner-border spinner-border-sm me-1" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <span>Getting data and displaying video...</span>
        `;

        // Get the ID from the button
		const id = e.target.getAttribute("data-id");

        // Get a single document based on the ID
		db.collection("videos")
			.doc(id)
			.get()
			.then((snapshot) => {
                // Show the video
				displayVideo(snapshot.data());

				displayFeedback.classList.remove("text-warning");
				displayFeedback.classList.add("text-success");
				displayFeedback.innerHTML = `
                    <span>Successfully received and displayed video!</span>
                `;
			})
			.catch((err) => {
				console.log(err);

                // Inform the user that an error occured!
				displayFeedback.classList.remove("text-warning");
				displayFeedback.classList.add("text-danger");
				displayFeedback.innerHTML = `
                    <span class="fw-bold">An error occured while displaying and/or getting the video. Please try again.</span>
                `;
			});
	}
});
