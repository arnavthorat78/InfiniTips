// Get the priority element to display
const addPriority = document.querySelector(".addPriority");

// If the user hasn't paid, then warn the user
if (!localStorage.getItem("authorizedVideos")) {
	addPriority.innerHTML = `<i class="bi bi-coin"></i>&nbsp; People who have paid have priority for suggestions.`;
}
