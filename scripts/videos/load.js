// Getting elements required for function
const loadingVideos = document.querySelector(".loadingVideos");
const list = document.querySelector(".videos");

/**
 * Add a new video to the DOM.
 *
 * @param {{ cover: string, title: string, description: string, duration: number }} video The video object for rendering (retrieved from Firebase).
 * @param {string} id The unique ID for each video.
 */
const addVideo = (video, id) => {
	let html = `
        <div class="col-lg-4 d-flex align-items-stretch" data-id="${id}">
            <div class="card rounded-2 shadow m-3">
                <img
                    src="${video.cover}"
                    class="card-img-top border-bottom border-2"
                    alt="${video.title}"
                    draggable="false"
                />
                <div class="card-body">
                    <h5 class="card-title">
                        <span class="text-muted">${video.title}</span>
                    </h5>
                    <p class="card-text">
                        ${video.description}
                    </p>
                </div>
                <div class="card-footer text-muted bg-light">
                    <span class="me-3">Length: <strong>${
						video.duration === 1 ? `${video.duration} min` : `${video.duration} mins`
					}</strong></span>

                    <button class="btn btn-success btn-sm" data-id="${id}" title="Play video" data-type="BUTTON" data-bs-toggle="modal" data-bs-target="#watchVideo">
                        <i class="bi bi-play-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

	// Append to the start of the HTML
	list.innerHTML = html + list.innerHTML;
};

// Get all of the videos
db.collection("videos")
	.orderBy("created_at", "asc")
	.get()
	.then((snapshot) => {
		loadingVideos.classList.add("d-none");

		snapshot.docs.forEach((doc) => {
			addVideo(doc.data(), doc.id);
		});
	})
	.catch((err) => {
		console.log(err);
	});
