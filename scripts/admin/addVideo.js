const list = document.querySelector(".videos");
const loadingVideos = document.querySelector(".loadingVideos");

const addVideoForm = document.querySelector(".addVideo");
const feedback = document.querySelector(".feedback");

const deleteFeedback = document.querySelector(".deleteFeedback");

const addVideo = (video, id) => {
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

	list.innerHTML = html + list.innerHTML;
};

const deleteVideo = (id) => {
	const video = document.querySelectorAll(".video");
	video.forEach((video) => {
		if (video.getAttribute("data-id") === id) {
			video.remove();
		}
	});
};

db.collection("videos")
	.orderBy("created_at", "asc")
	.onSnapshot((snapshot) => {
		snapshot.docChanges().forEach((change) => {
			const doc = change.doc;

			loadingVideos.classList.add("d-none");

			if (change.type === "added") {
				addVideo(doc.data(), doc.id);
			} else if (change.type === "removed") {
				deleteVideo(doc.id);
			}
		});
	});

addVideoForm.addEventListener("submit", (e) => {
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
        <span>Adding "<i>${addVideoForm.title.value}</i>"!</span>
    `;

	const now = new Date();
	const video = {
		title: addVideoForm.title.value,
		description: addVideoForm.description.value,
		iframe: addVideoForm.iframe.value,
		cover: addVideoForm.cover.value,
		duration: addVideoForm.duration.valueAsNumber,
		created_at: firebase.firestore.Timestamp.fromDate(now),
	};

	db.collection("videos")
		.add(video)
		.then(() => {
			feedback.classList.remove("text-warning");
			feedback.classList.add("text-success");
			feedback.innerHTML = `Successfully added video "<i>${addVideoForm.title.value}</i>"!`;
		})
		.catch((err) => {
			console.log(err);

			feedback.classList.remove("text-warning");
			feedback.classList.add("text-danger");
			feedback.innerHTML = `An error occured while uploading "<i>${addVideoForm.title.value}</i>". Please try again later.`;
		});
});

list.addEventListener("click", (e) => {
	if (
		e.target.getAttribute("data-type") === "BUTTON" &&
		confirm("Are you sure you want to delete the video? This action is irreversible!")
	) {
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

		const id = e.target.getAttribute("data-id");

		db.collection("videos")
			.doc(id)
			.delete()
			.then(() => {
				deleteFeedback.classList.remove("text-warning");
				deleteFeedback.classList.add("text-success");
				deleteFeedback.innerHTML = `Successfully deleted video!`;
			})
			.catch((err) => {
				console.log(err);

				deleteFeedback.classList.remove("text-warning");
				deleteFeedback.classList.add("text-danger");
				deleteFeedback.innerHTML = `An error occured while deleting the video. Please try again later.`;
			});
	}
});
