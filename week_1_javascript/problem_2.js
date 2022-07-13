//importing "axios"
const axios = require("axios");

/* 
creating a prototype of Array which will replace all correct URL with 
respond the axios get after hitting the URL and also tell the URL 
which URL are not correct
*/
Array.prototype.populate = function () {
  //iterating whole array
  for (let i = 0; i < this.length; i++) {
    /* 
    checking if URL contain http or https,
    if http is not present then will place before it and
    then hit the URL with axios
    */

    let URL = this[i];

    if (!this[i].includes("http")) {
      URL = "http://" + this[i];
    }
    //axios get call
    axios
      .get(URL)
      .then((response) => {
        //if URL is correct and got data from the URL

        //then replace it with URL
        this[i] = response.data;

        //printing the whole array to check if it is changing or not
        console.log(Object.values(this));
      })
      .catch((error) => {
        //if URL is not correct
        console.log("Invalid URL : " + URL);
      });
  }
};

//simple array contianing some URL
const array = [
  "google.com",
  "facebook.com",
  "mm.mm",
  "qwe",
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2"
];

//calling prototype poplulate()
array.populate();
