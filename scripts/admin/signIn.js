// Getting form elements and feedback.
const signIn = document.querySelector(".signIn");
const passwordInput = document.querySelector(".passwordInput");
const feedback = document.querySelector(".feedback");

// The password.
// TODO Add this in Firebase.
const PASSWORD = "adminPasswordVideos";

// Waiting for the form to be submitted, and preventing the page from reloading.
signIn.addEventListener("submit", (e) => {
	e.preventDefault();

	// Check if the password is valid.
	if (signIn.password.value === PASSWORD) {
		// Remove the invalid feedback (if there was any).
		passwordInput.classList.remove("is-invalid");
		feedback.classList.remove("invalid-feedback");

		// Set, in the session storage, that the admin is logged in.
		sessionStorage.setItem("adminLoggedIn", "true");

		// Say to the user that the password is valid.
		passwordInput.classList.add("is-valid");
		feedback.classList.add("valid-feedback");
		feedback.innerHTML = "The password is valid! Redirecting you to the admin dashboard...";

		// Wait for two seconds before redirecting to the admin panel, to show the user the message.
		setTimeout(() => {
			location.replace("./admin-panel.html");
		}, 2000);
	} else {
		// Say to the user that the password is invalid.
		passwordInput.classList.add("is-invalid");

		feedback.classList.add("invalid-feedback");
		feedback.innerHTML = "The password provided is incorrect.";
	}
});
