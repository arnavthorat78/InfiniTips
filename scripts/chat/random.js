// Get the form and button
const randomAddForm = document.querySelector(".addSuggestion");
const randomId = document.querySelector(".randomId");

/**
 * Generate a random user.
 *
 * @param {number} length The number of characters for the user to have. Maximum safe integer is 13-17.
 * @returns A string containing the chosen random username.
 */
const generateRandomUser = (length = 10) => {
	const random = Math.random().toString().replace("0.", "").slice(0, length);

	return `User ${random}`;
};

// Wait for a click, and then set the name to a random one
randomId.addEventListener("click", (e) => {
	randomAddForm.name.value = generateRandomUser();
});
