const axios = require("axios");
const MAX_PRICE = 20;
const MIN_PRICE = 1;



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

function createTransaction(itemid = -1, itemcount = 0){
  return getFullHistory().then(getresponse => {
    //got history of everything in response, now need to manipulate prices
    let newprice
    let oldprice
    for(let k = 0;k<getresponse.length;k++){
     switch(k){
      case itemid:
        oldprice = getresponse[k].data[getresponse[k].data.length-1]
        newprice = getresponse[k].data[getresponse[k].data.length-1] * Math.pow(1.02,itemcount)
        if (newprice > MAX_PRICE){
          newprice = MAX_PRICE;}
        if (newprice < MIN_PRICE){
          newprice = MIN_PRICE;}
        getresponse[k].data.push(newprice)
        break;
      case -1:
      break;
      default:
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
      "item": itemid,
      "amount":itemcount,
      "price-per-unit": oldprice
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
