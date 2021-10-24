const signIn = document.querySelector(".signIn");
const passwordInput = document.querySelector(".passwordInput");
const feedback = document.querySelector(".feedback");

const PASSWORD = "adminPasswordVideos";

signIn.addEventListener("submit", (e) => {
	e.preventDefault();

	if (signIn.password.value === PASSWORD) {
		passwordInput.classList.remove("is-invalid");
		feedback.classList.remove("invalid-feedback");

		sessionStorage.setItem("adminLoggedIn", "true");

		passwordInput.classList.add("is-valid");
		feedback.classList.add("valid-feedback");
		feedback.innerHTML = "The password is valid! Redirecting you to the admin dashboard...";

		setTimeout(() => {
			location.replace("./admin-panel.html");
		}, 2500);
	} else {
		passwordInput.classList.add("is-invalid");

		feedback.classList.add("invalid-feedback");
		feedback.innerHTML = "The password provided is incorrect.";
	}
});
