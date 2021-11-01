const randomAddForm = document.querySelector(".addSuggestion");
const randomId = document.querySelector(".randomId");

const generateRandomUser = (length = 10) => {
	const random = Math.random().toString().replace("0.", "").slice(0, length);

	return `User ${random}`;
};

randomId.addEventListener("click", (e) => {
	randomAddForm.name.value = generateRandomUser();
});
