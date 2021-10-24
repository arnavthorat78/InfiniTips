const adminDash = document.querySelector(".adminDash");

adminDash.addEventListener("click", () => {
	if (!sessionStorage.getItem("adminLoggedIn")) {
		location.replace("./sign-in.html");
	} else {
		location.replace("./admin-panel.html");
	}
});
