if (!localStorage.getItem("cookieInfoShown")) {
	const cookieInfo = document.querySelector("#cookieInfo");
	const cookieBootstrap = new bootstrap.Offcanvas(cookieInfo);

	cookieBootstrap.show();

	cookieInfo.addEventListener("hidden.bs.offcanvas", () => {
		localStorage.setItem("cookieInfoShown", "true");
	});
}
