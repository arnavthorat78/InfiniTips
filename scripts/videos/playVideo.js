const allVideos = document.querySelector(".videos");
const displayFeedback = document.querySelector(".feedback");
const videoPopup = document.querySelector(".videoPopup");

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

allVideos.addEventListener("click", (e) => {
	if (e.target.getAttribute("data-type") === "BUTTON") {
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

		displayFeedback.classList.remove("text-danger", "text-success");
		displayFeedback.classList.add("text-warning");
		displayFeedback.innerHTML = `
            <div class="spinner-border spinner-border-sm me-1" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <span>Getting data and displaying video...</span>
        `;

		const id = e.target.getAttribute("data-id");

		db.collection("videos")
			.doc(id)
			.get()
			.then((snapshot) => {
				displayVideo(snapshot.data());

				displayFeedback.classList.remove("text-warning");
				displayFeedback.classList.add("text-success");
				displayFeedback.innerHTML = `
                    <span>Successfully received and displayed video!</span>
                `;
			})
			.catch((err) => {
				console.log(err);

				displayFeedback.classList.remove("text-warning");
				displayFeedback.classList.add("text-danger");
				displayFeedback.innerHTML = `
                    <span class="fw-bold">An error occured while displaying and/or getting the video. Please try again.</span>
                `;
			});
	}
});
