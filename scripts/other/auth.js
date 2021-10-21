const adminDash = document.querySelector(".adminDash");

adminDash.addEventListener("click", (e) => {
	if (!sessionStorage.getItem("adminLoggedIn")) {
		console.log(e);
	}
});
