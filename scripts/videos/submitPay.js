// Get the form and feedback for information
const signInForm = document.querySelector(".signIn");
const feedback = document.querySelector(".feedback");

// When the form is submitted, prevent reloading of the page.
signInForm.addEventListener("submit", (e) => {
	e.preventDefault();

	// Fake 'checking credentials'!
	feedback.classList.remove("text-success");
	feedback.classList.remove("text-danger");
	feedback.classList.add("text-danger");
	feedback.innerHTML = `
        <div class="spinner-grow spinner-grow-sm me-1" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <span>Checking credentials...</span>
    `;

	// Fake wait...
	setTimeout(() => {
		// Remove colours, and change text
		feedback.classList.remove("text-danger");
		feedback.classList.add("text-warning");

		feedback.innerHTML = `
            <div class="spinner-grow spinner-grow-sm me-1" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <span>Allowing access...</span>
        `;

		// Trying to allow access. If there is an error, inform the user.
		try {
			localStorage.setItem("authorizedVideos", "true");
		} catch (err) {
			console.log(err);

			feedback.classList.remove("text-warning");
			feedback.classList.add("text-danger");
			feedback.innerHTML = `<i class="bi bi-exclamation-circle-fill me-1"></i>&nbsp;An error occured while allowing access.\n<small class="text-muted">Make sure you have allowed storage for this website!</small>`;
		}

		// Wait to inform the user what is happening, then inform the user that saving was successful.
		setTimeout(() => {
			feedback.classList.remove("text-warning");
			feedback.classList.add("text-success");
			feedback.innerHTML = `<span>Successfully saved credentials and allowed access! Redirecting you to the Videos page...</span>`;

			// Redirect to the Videos page
			setTimeout(() => {
				location.replace("./videos.html");
			}, 2000);
		}, 1000);
	}, 2000);
});
