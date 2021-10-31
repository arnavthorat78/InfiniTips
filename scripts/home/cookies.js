// If the Cookie Consent wasn't accepted before, show the user.
if (!localStorage.getItem("cookieInfoShown")) {
	// Get the offcanvas and make a new offcanvas element from Bootstrap.
	const cookieInfo = document.querySelector("#cookieInfo");
	const cookieBootstrap = new bootstrap.Offcanvas(cookieInfo);

	// Show the offcanvas
	cookieBootstrap.show();

	// When the offcanvas is fully hidden (including when the animations are complete), make sure to not show the notice again!
	cookieInfo.addEventListener("hidden.bs.offcanvas", () => {
		localStorage.setItem("cookieInfoShown", "true");
	});
}
