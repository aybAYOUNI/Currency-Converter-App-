let image = document.querySelectorAll('.drop_list .select_box img');
let inputAmount = document.querySelector('.amount #iputAmount');
let ruselt = document.querySelector('.exchange_rate p');
let exchange = document.querySelector('button');
let optionTag = document.querySelectorAll('.drop_list select');
let toOption = document.querySelector('.to select');
let fromOption = document.querySelector('.from select');
let iconChange =document.querySelector('form .icon');
function display(data){

    for (const code in data){
        const contrys = data[code].alpha2Code;
        const currenciesData= data[code].currencies;

        for (const codeCurrencies in currenciesData){
            currencie = codeCurrencies;
            for (let i= 0 ;i<optionTag.length; i++){
                let selected;
                if(i==0){
                    selected =currencie === "USD" ? "selected" : "";
                    image[i].src = "https://flagsapi.com/US/flat/64.png";
                }
                else if(i==1){
                    selected =currencie === "MAD" ? "selected" : "";
                    image[i].src = "https://flagsapi.com/MA/flat/64.png";
                }
                optionTag[i].innerHTML += `<option value="${currencie}" ${selected} name="${contrys}" indes="${i}">${currencie}</option>`;
                optionTag[i].addEventListener('change', e => {
                    const countryCode = e.target.options[e.target.selectedIndex].getAttribute('name');
                    const index = e.target.options[e.target.selectedIndex].getAttribute('indes');
                    getflags(countryCode, index);

                });
            }
        }
    }
}
function getflags(element ,index){
        image[index].src = `https://flagcdn.com/96x72/${element.toLowerCase()}.png`;

}
iconChange.addEventListener('click' ,e=>{
    const varname1 = fromOption.options[fromOption.selectedIndex].getAttribute('name');
    const varname2 = toOption.options[toOption.selectedIndex].getAttribute('name');
    const varinds1 = fromOption.options[fromOption.selectedIndex].getAttribute('indes');
    const varinds2 = toOption.options[toOption.selectedIndex].getAttribute('indes');
    iconExchange();getExchange(); getflags(varname1 ,varinds2);getflags(varname2 ,varinds1)
})

function iconExchange(){
    let var1 = fromOption.value
    fromOption.value = toOption.value;
    toOption.value = var1;
}

exchange.addEventListener('click', e =>{
    e.preventDefault() ; getExchange();
});

function getExchange() {
    let amount = inputAmount.value;
    if (amount == "0" || amount == "") {
        inputAmount.value = "1";
        amount = 1;
    };

    let urlApiExch = `https://v6.exchangerate-api.com/v6/${keyApi}/latest/${fromOption.value}`;
    fetch(urlApiExch).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
        .then(data => {
            let conversion_rates = data.conversion_rates;
            ruselt.innerHTML=`${amount} ${fromOption.value} = ${(conversion_rates[toOption.value] * amount).toFixed(3)}  ${toOption.value}`;
        })
        .catch(error => console.error('Erreur détectée :', error))
}