
let urlApiContr = `https://countryapi.io/api/all?apikey=${keyApicontry}`;


fetch(urlApiContr)
    .then(response=>response.json())
        .then((data)=>{
            //console.log(data)
            display(data)
        });




