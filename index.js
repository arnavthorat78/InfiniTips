const carouselText = [{ text: "Insightful" }, { text: "Amazing" }, { text: "Interesting" }];

const typeSentence = async (sentence, eleRef, delay = 100) => {
	const letters = sentence.split("");
	let i = 0;

	while (i < letters.length) {
		await waitForMs(delay);
		$(eleRef).append(letters[i]);
		i++;
	}
	return;
};
const deleteSentence = async (eleRef) => {
	const sentence = $(eleRef).html();
	const letters = sentence.split("");

	while (letters.length > 0) {
		await waitForMs(100);
		letters.pop();
		$(eleRef).html(letters.join(""));
	}
};

const carousel = async (carouselList, eleRef) => {
	let i = 0;

	while (true) {
		await typeSentence(carouselList[i].text, eleRef);
		await waitForMs(1500);
		await deleteSentence(eleRef);
		await waitForMs(500);

		i++;
		if (i >= carouselList.length) {
			i = 0;
		}
	}
};

const waitForMs = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

$(document).ready(async () => {
	carousel(carouselText, "#sentence");
});
