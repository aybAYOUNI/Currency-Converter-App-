let images = document.querySelectorAll('.drop_list .select_box img');
let inputAmount = document.querySelector('.amount #inputAmount');
let result = document.querySelector('.exchange_rate p');
let exchange = document.querySelector('button');
let toOption = document.querySelector('.to select');
let fromOption = document.querySelector('.from select');
let optionTags = document.querySelectorAll('.drop_list select');
const keyApi = "VOTRE_CLE_API";  // Remplacez par votre clé API

function display(data) {
    for (const code in data) {
        const country = data[code];
        const countryCode = country.alpha2Code;
        const flagUrl = country.flag.medium;
        const currenciesData = country.currencies;

        for (const currencyCode in currenciesData) {
            const currency = currencyCode;
            optionTags.forEach((optionTag, i) => {
                let selected = "";
                if (i === 0 && currency === "USD") {
                    selected = "selected";
                    images[i].src = "https://flagsapi.com/US/flat/64.png";
                } else if (i === 1 && currency === "MAD") {
                    selected = "selected";
                    images[i].src = "https://flagsapi.com/MA/flat/64.png";
                }
                optionTag.innerHTML += `<option value="${currency}" ${selected} data-code="${countryCode}">${currency}</option>`;

                optionTag.addEventListener('change', e => {
                    getFlags(e.target.options[e.target.selectedIndex].getAttribute('data-code'), i);
                });
            });
        }
    }
}

function getFlags(countryCode, index) {
    images[index].src = `https://flagcdn.com/96x72/${countryCode.toLowerCase()}.png`;
}

exchange.addEventListener('click', e => {
    e.preventDefault();
    getExchange();
});

async function getExchange() {
    let amount = inputAmount.value;
    if (amount === "0" || amount === "") {
        inputAmount.value = "1";
        amount = 1;
    }

    const urlApiExch = `https://v6.exchangerate-api.com/v6/${keyApi}/latest/${fromOption.value}`;
    try {
        const response = await fetch(urlApiExch);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const conversionRates = data.conversion_rates;
        result.innerHTML = `${amount} ${fromOption.value} = ${(conversionRates[toOption.value] * amount).toFixed(2)} ${toOption.value}`;
    } catch (error) {
        console.error('Erreur détectée :', error);
    }
}
