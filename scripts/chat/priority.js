const addPriority = document.querySelector(".addPriority");

if (!localStorage.getItem("authorizedVideos")) {
	addPriority.innerHTML = `<i class="bi bi-coin"></i>&nbsp; People who have paid have priority for suggestions.`;
}
