// Making the carousel text.
// TODO Either add colours, or remove the objects.
const carouselText = [{ text: "Insightful" }, { text: "Amazing" }, { text: "Interesting" }];

/**
 * Type a sentence in typewriter effect.
 *
 * @param {string} sentence The sentence to type.
 * @param {Element} eleRef The element reference to type the sentence in.
 * @param {number} delay The number of seconds to wait between each letter typed.
 */
const typeSentence = async (sentence, eleRef, delay = 100) => {
	// Initialization (split the letters and set the counter).
	const letters = sentence.split("");
	let i = 0;

	while (i < letters.length) {
		await waitForMs(delay);
		$(eleRef).append(letters[i]);
		i++;
	}
	return;
};
/**
 * Delete a sentence in typewriter effect.
 *
 * @param {Element} eleRef The element reference to delete the sentence.
 */
const deleteSentence = async (eleRef) => {
	// Initialization (get the reference and split the letters).
	const sentence = $(eleRef).html();
	const letters = sentence.split("");

	// Until there are no more letters...
	while (letters.length > 0) {
		await waitForMs(100);
		letters.pop();
		$(eleRef).html(letters.join(""));
	}
};

/**
 * Make a forever carousel.
 *
 * @param {{ text: string }[]} carouselList The list of the carousel words/sentences.
 * @param {Element} eleRef The element to do the carousel in.
 */
const carousel = async (carouselList, eleRef) => {
	// Set the counter
	let i = 0;

	while (true) {
		// Type the sentence, wait for 1.5 seconds to show the user the word, then delete the sentence, and then wait for half a second until retyping the next word.
		await typeSentence(carouselList[i].text, eleRef);
		await waitForMs(1500);
		await deleteSentence(eleRef);
		await waitForMs(500);

		// If all the words are done, start over again.
		i++;
		if (i >= carouselList.length) {
			i = 0;
		}
	}
};

/**
 * Wait for a number of milliseconds. This is like Python's `sleep()` method.
 *
 * @param {number} ms The number of milliseconds to wait.
 */
const waitForMs = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

$(document).ready(async () => {
	carousel(carouselText, "#sentence");
});
