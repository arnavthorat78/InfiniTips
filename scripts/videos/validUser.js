// If the user has not yet paid, then ask them to pay.
if (!localStorage.getItem("authorizedVideos")) {
	location.replace("./pay.html");
}
