// Get the button.
const adminDash = document.querySelector(".adminDash");

// When the button is clicked, check if the admin is logged in.
// If the user isn't, then ask for their credentials, otherwise, redirect them to the admin panel.
adminDash.addEventListener("click", () => {
	if (!sessionStorage.getItem("adminLoggedIn")) {
		location.replace("./sign-in.html");
	} else {
		location.replace("./admin-panel.html");
	}
});
