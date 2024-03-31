// "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json"     Api for rate
let select_list = document.querySelectorAll(".select-list")
let code1 = document.querySelector("#country1")
let code2 = document.querySelector("#country2")
let btn1 = document.querySelector("#convert_btn")
let images = document.querySelectorAll("img")
let rate_box = document.querySelector("#rates")
let con1_name = document.querySelector("#con1_name")
let con2_name = document.querySelector("#con2_name")
let amount  = document.getElementById("amount")


// fecthing list of country code
for (let select of select_list) {
    for (code in countryList) {
        let newoption = document.createElement("option")
        newoption.value = code
        newoption.innerText = code
        select.append(newoption)
    }
}

select_list[0].addEventListener("change", async () => {

    // fetching image of the country 
    let con1 = code1.value;
    images[0].src = `https://flagsapi.com/${countryList[`${con1}`]}/shiny/64.png`

    // fetching name of the country 
    let promise = await fetch(`https://restcountries.com/v3.1/alpha/${countryList[`${con1}`]}`)
    promise = await promise.json()
    let arr = promise[0]
    con1_name.innerText = arr["name"].common;
})
select_list[1].addEventListener("change", async () => {

    // fetching image of country 
    let con2 = code2.value
    images[1].src = `https://flagsapi.com/${countryList[`${con2}`]}/shiny/64.png`

    //  fetching name of country 
    let promise1 = await fetch(`https://restcountries.com/v3.1/alpha/${countryList[`${con2}`]}`)
    promise2 = await promise1.json()
    let arr1 = promise2[0]
    con2_name.innerText = arr1["name"].common;
})


// for fetching rate 
btn1.addEventListener("click", async () => {
    let con1 = code1.value;
    let con2 = code2.value
    
    result(con1, con2)
})
let result = async (con1, con2) => {
    con1 = con1.toLowerCase()
    con2 = con2.toLowerCase()

    let value = amount.value;
    rate_box.style.color="black"
  
    if(!value)
    {
        value = 1
    }
    if(isNaN(value))
    {
        rate_box.innerText="enter valid amount"
        rate_box.style.color="red"
        
    }
    else{
    let promise = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${con1}/${con2}.json`)
    console.log(promise)
    promise = await promise.json();
    rate_box.innerText = value +" "+ con1.toUpperCase() + " =" + " " + value*promise[`${con2}`] + " " + con2.toUpperCase()
    }
}


