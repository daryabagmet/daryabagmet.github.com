const selectFrom = document.getElementById('currency-select-from'),
	selectTo = document.getElementById('currency-select-to'),
	currencyInputFrom = document.querySelector('.js-currency-input-from'),
	currencyInputTo = document.querySelector('.js-currency-input-to'),
	changeBtn = document.querySelector('.js-currency-change-btn'),
	resultContainer = document.querySelector('.js-result-total'),
	resultRate = document.querySelector('.js-currency-result-rate');

function getCurrentRate() {
	const apiHeader = new Headers();
	apiHeader.append('apikey', '1jM8nQwM4Az2woWoez5a3RuRA1mYdbHW');

	const requestOptions = {
		method: 'GET',
		redirect: 'follow',
		headers: apiHeader,
	};

    const currencyFrom = selectFrom.value,
        currencyTo = selectTo.value,
        amount = parseInt(currencyInputFrom.value);
        url = `https://api.apilayer.com/currency_data/convert?to=${currencyTo}&from=${currencyFrom}&amount=${amount}`;

    if(!amount || amount === 0) return;

    fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            const rate = data.info.quote;
                total = (rate * parseInt(currencyInputFrom.value)).toFixed(2);

            resultRate.innerText = `1 ${currencyFrom} = ${rate.toFixed(
                2
            )} ${currencyTo}`;
            resultContainer.innerText = `${total} ${currencyTo}`;
            currencyInputTo.value = total;
        })
        .catch((error) => console.log('error', error));
}





selectFrom.addEventListener('change', getCurrentRate);
selectTo.addEventListener('change', getCurrentRate);

currencyInputFrom.addEventListener('input', getCurrentRate);
currencyInputTo.addEventListener('input', getCurrentRate);

changeBtn.addEventListener('click', (e)=>{
    const savedCustomCurrency = selectTo.value;
    selectTo.value = selectFrom.value;
    selectFrom.value = savedCustomCurrency;

    getCurrentRate();
});