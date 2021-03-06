const axios = require("axios");
const MAX_PRICE = 10;
const MIN_PRICE = 3;
const MAX_COUNT = 15;



//fetch("http://localhost:3001/api/drinks/1", {"headers":{"Content-Type":"application/json"},"body":'{"description":"IVE BEEN EDITED"}',"method":"PATCH"});

function getAllDrinks(){
  return axios
  .get("http://localhost:3001/api/drinks")
  .then(function(response) {
    return response.data;
  });
}
function getBevarages(){
  return axios.get("http://localhost:3001/api/bevarages")
  .then(function(response) {
    return response.data;
  });
}
function getMixers(){
  return axios.get("http://localhost:3001/api/mixers")
  .then(function(response) {
    return response.data;
  });
}
function getSpirits(){
  return axios.get("http://localhost:3001/api/spirits")
  .then(function(response) {
    return response.data;
  });
}
function getFullHistory(){
  return axios.get("http://localhost:3001/api/history")
  .then(function(response) {
    return response.data;
  });
}

function getDrinkById(drinkId = -1){
  let checkid = Number.parseInt(drinkId);
  if(Number.isNaN(checkid)){
    checkid = -1;
  }
  const address = "http://localhost:3001/api/drinks/".concat(checkid.toString())
  return axios.get(address)
  .then(function(response) {
    return response.data;
  });
}

function getHistoryById(historyId = -1){
  let checkid = Number.parseInt(historyId);
  if(Number.isNaN(checkid)){
    checkid = -1;
  }
  const address = "http://localhost:3001/api/history/".concat(checkid.toString())
  return axios.get(address)
  .then(function(response) {
    return response.data;
  });
}
/*
const getAll = axios.get("http://localhost:8001/api/drinks");
  const getBevarages = axios.get("http://localhost:8001/api/bevarages");
  const getMixers = axios.get("http://localhost:8001/api/mixers");
  const getSpirits = axios.get("http://localhost:8001/api/spirits");
  const getFullHistory = axios.get("http://localhost:8001/api/history");

  function getDrinkById(drinkId){
    axios.get("http://localhost:8001/api/drinks/");
  }
*/

//const getAll = axios.get("http://localhost:8001/api/drinks");
//const getBevarages = axios.get("http://localhost:8001/api/bevarages");
//const getMixers = axios.get("http://localhost:8001/api/mixers");
//const getSpirits = axios.get("http://localhost:8001/api/spirits");
//const getFullHistory = axios.get("http://localhost:8001/api/history");

/*

updatePrices() {
        const resetProducts = products.map(p => {
            p.price = p.count !== 0 // javascript ternary operator
                ? 1.02 ** p.count * p.price // do it if price is not equal to 0
                : 0.995 * p.price; // do otherwise if it is
            if (p.price > MAX_PRICE)
                p.price = MAX_PRICE;
            if (p.price < MIN_PRICE)
                p.price = MIN_PRICE;
            p.count = 0;
            if (p.price > p.maxPrice) {
                p.maxPrice = p.price;
            } else {
                p.minPrice = p.price;
            }
            return p;
        });

        this.setState({
            products: resetProducts
        });
    }

*/
// array with [[itemID, itemcount],....]
function createTransaction(items = []){
  if(items.length === 0){throw {message:"input array was empty! Fill with [ [itemID_1, itemAmount_1], [itemID_2, itemAmount_2],...]"}}
  else if(items.length > MAX_COUNT){throw {message:"Too many items selected! Maximum allowed amount is ".concat(MAX_COUNT.toString())}}

  return getFullHistory().then(getresponse => {
    //got history of everything in response, now need to manipulate prices
    let newprice
    let oldprice
    let trarr = [[],[],[]]
    for(let k = 0;k<getresponse.length;k++){
      // single history element, current = getresponse[k]
      let currentitem
      for(let i = 0;i<items.length;i++){
        if(items[i][0] === getresponse[k].drinkId){currentitem = items[i];break;}
      }
      if(currentitem){// this element was bought
        oldprice = getresponse[k].data[getresponse[k].data.length-1]
        trarr[0].push(currentitem[0])
        trarr[1].push(currentitem[1])
        trarr[2].push(oldprice)
        newprice = getresponse[k].data[getresponse[k].data.length-1] * Math.pow(1.02,currentitem[1])
        if (newprice > MAX_PRICE){
          newprice = MAX_PRICE;}
        if (newprice < MIN_PRICE){
          newprice = MIN_PRICE;}
        getresponse[k].data.push(newprice)
    
      }else{// this element was NOT bought
        let otherprice = getresponse[k].data[getresponse[k].data.length-1] * 0.995
        if (otherprice > MAX_PRICE){
          otherprice = MAX_PRICE;}
        if (otherprice < MIN_PRICE){
          otherprice = MIN_PRICE;}
        getresponse[k].data.push(otherprice)
      }
    }
    const transactionobj = {
      "timestamp": new Date().toISOString(),
      "items": trarr[0],
      "amounts":trarr[1],
      "price-per-unit": trarr[2]
    }
    return axios.post("http://localhost:3001/api/transactions",transactionobj).then(transactionresp =>{sendPatch(getresponse);return transactionresp.data});
  });
}

function sendPatch(response = []){
  if(response.length>0){
  const latest = response.pop();
  const dataobj = {"data":latest.data}
  return axios
    .patch("http://localhost:3001/api/history/".concat(latest.id.toString()), dataobj)
    .then(function(putresponse){
      return sendPatch(response);
    });
  }
  return;
}

module.exports = {
  getAllDrinks,
  getBevarages,
  getMixers,
  getSpirits,
  getFullHistory,
  getHistoryById,
  getDrinkById,
  createTransaction
};
