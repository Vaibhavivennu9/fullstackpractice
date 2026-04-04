const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
  const dropdown = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const fromcurrency = document.querySelector(".from select");
  const tocurrency = document.querySelector(".to select");
  const msgTag = document.querySelector(".msg");
  let i=0;
  for(let select of dropdown){
    for(let currcode in countryList){
        let n_option = document.createElement("option");
        n_option.innerText=currcode
        n_option.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            n_option.selected = true;
        }
        else if(select.name === "to" && currcode === "INR"){
            n_option.selected = true;
        }
        select.append(n_option);
    }
    select.addEventListener("change", e=>{
        updateFlag(e.target);
    });
}
const updateFlag = (element)=>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let imgTag = element.parentElement.querySelector("img");
    imgTag.src = newsrc;
 }
 btn.addEventListener("click", async e => {
    e.preventDefault();

    let amount = document.querySelector(".amount input");
    let amtval = amount.value;

    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }

    const url = `${BASE_URL}/${fromcurrency.value.toLowerCase()}.json`;

    let response = await fetch(url);
let data = await response.json();

let exrate =
    data[fromcurrency.value.toLowerCase()][
        tocurrency.value.toLowerCase()
    ];

console.log("FROM:", fromcurrency.value);
console.log("TO:", tocurrency.value);
console.log("URL:", url);
console.log("DATA:", data);
console.log("RATE:", exrate);
console.log("AMOUNT:", amtval);

let totalexrate = (amtval * exrate).toFixed(2);

msgTag.innerText =
    `${amtval} ${fromcurrency.value} = ${totalexrate} ${tocurrency.value}`;
});