// Get the required DOM elements
const totalAmount = document.querySelector(".total");
const country = document.querySelector(".country");

/**
 * The total amount in Australian dollars. **Do not change!**
 */
const AMOUNT = 4.99;

/**
 * Get data from Currency Convert.
 *
 * @param {"NZD" | "INR" | "USD"} type The type of currency
 * @returns A Promise, with an object containing the currency difference.
 */
const getData = (type) => {
	return new Promise((resolve, reject) => {
		fetch(
			`https://free.currconv.com/api/v7/convert?q=AUD_${type}&compact=ultra&apiKey=58b7e39c60ffbe776694`
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

// Wait for the submitting country to change
country.addEventListener("change", (e) => {
	// Inform the user
	totalAmount.classList.remove("lead");
	totalAmount.classList.add("text-muted");
	totalAmount.innerHTML = `
        <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        Getting estimated cost...
    `;

	// Set the billing country
	const billingCountry = e.target.value;
	let searchCountry = "";

	// Go through each case (if the selected value is Other, then default to AUD).
	switch (billingCountry) {
		case "australia":
			searchCountry = "AUD";
			break;
		case "newZealand":
			searchCountry = "NZD";
			break;
		case "india":
			searchCountry = "INR";
			break;
		case "usa":
			searchCountry = "USD";
			break;
		default:
			searchCountry = "AUD";
			break;
	}

	// Australian dollar conversion isn't required, since it is already stored.
	if (searchCountry !== "AUD") {
		getData(searchCountry)
			.then((data) => {
				// The formula for converting
				const finalValue = parseFloat((AMOUNT * data[`AUD_${searchCountry}`]).toFixed(2));

				totalAmount.classList.remove("text-muted");
				totalAmount.classList.add("lead");
				totalAmount.innerHTML = `${
					searchCountry === "INR" ? "₹" : "$"
				}${finalValue} ${searchCountry}`;
			})
			.catch((err) => {
				console.log(err);

				totalAmount.classList.remove("text-muted");
				totalAmount.classList.add("text-danger");
				totalAmount.innerHTML = `<i class="bi bi-exclamation-circle"></i>&nbsp; An error occured while calculating the price. Please <a herf="javascript:reload();">reload your page</a> and try again.`;
			});
	} else {
		totalAmount.classList.remove("text-muted");
		totalAmount.classList.add("lead");
		totalAmount.innerHTML = `$${AMOUNT} AUD`;
	}
});
