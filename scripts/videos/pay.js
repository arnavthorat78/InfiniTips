// Overflow for the payment part
const overflow = document.querySelector(".overflow");

// Getting DOM elements for the type
const signIn = document.querySelector(".signIn");
const type = document.querySelectorAll("[data-type]");
const typeDisplay = document.querySelector(".typeDisplay");
const submit = document.querySelector(".submit");

// Constant overflow limit. This is the number that gets divided by the height.
const OVERFLOW_LIMIT = 2;

// Calculating and using the overflow
overflow.style.height = `${window.innerHeight / OVERFLOW_LIMIT}px`;
window.addEventListener("resize", () => {
	overflow.style.height = `${window.innerHeight / OVERFLOW_LIMIT}px`;
});

// Cycling through each type (there should be two)
type.forEach((element) => {
	// Each element will listen for a change
	element.addEventListener("change", (e) => {
		// Get the type of payment from the ID, and set the large form for if the type is a credit/debit card.
		const payType = e.target.getAttribute("id");
		const typeDisplayHTML = `
			<h5 class="text-start">Card Information</h5>

			<div class="form-floating mb-2">
				<input
					type="text"
					class="form-control"
					id="nameOnCard"
					name="nameOnCard"
					placeholder="Name on Card..."
					required
				/>
				<label for="nameOnCard">Name on Card</label>
			</div>

			<div class="form-floating mb-4">
				<input
					type="number"
					class="form-control"
					id="cardNumber"
					name="cardNumber"
					placeholder="Card Number..."
					required
				/>
				<label for="cardNumber">Card Number</label>
			</div>

			<div class="form-floating mb-2">
				<input
					type="date"
					class="form-control"
					id="expiry"
					name="expiry"
					placeholder="Expiry Date..."
					required
				/>
				<label for="expiry">Expiry Date</label>
			</div>

			<div class="form-floating">
				<input
					type="number"
					class="form-control"
					id="code"
					name="code"
					placeholder="Security Code..."
					required
				/>
				<label for="code">Security Code</label>
			</div>
		`;

		// Change button and form styles depending on the type
		if (payType === "paypal") {
			typeDisplay.innerHTML = `
				<h4 class="text-center">Paying with PayPal</h4>
				<p class="text-muted">Click the button below to pay with PayPal!</p>
			`;

			submit.classList.remove("btn-success");
			submit.classList.add("btn-primary");
			submit.innerHTML = `<i class="bi bi-paypal"></i>&nbsp; Pay with PayPal`;
		} else if (payType === "creditDebit") {
			typeDisplay.innerHTML = typeDisplayHTML;

			submit.classList.remove("btn-primary");
			submit.classList.add("btn-success");
			submit.innerHTML = `<i class="bi bi-lock-fill"></i>&nbsp; Pay Securely`;
		}
	});
});
