const overflow = document.querySelector(".overflow");

const OVERFLOW_LIMIT = 2;

overflow.style.height = `${window.innerHeight / OVERFLOW_LIMIT}px`;
window.addEventListener("resize", () => {
	overflow.style.height = `${window.innerHeight / OVERFLOW_LIMIT}px`;
});
