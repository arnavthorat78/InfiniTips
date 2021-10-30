const loadingVideos = document.querySelector(".loadingVideos");
const list = document.querySelector(".videos");

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

                    <button class="btn btn-success btn-sm" data-id="${id}">
                        <i class="bi bi-play-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

	list.innerHTML = html + list.innerHTML;
};

db.collection("videos")
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
