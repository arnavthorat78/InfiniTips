const adminDash = document.querySelector(".adminDash");

adminDash.addEventListener("click", () => {
	if (!sessionStorage.getItem("adminLoggedIn")) {
		location.replace("./sign-in.html");
	} else {
		// Code to redirect to admin panel here...
	}
});
