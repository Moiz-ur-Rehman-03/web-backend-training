const { default: axios } = require("axios");
const urlArray = require("./data").data();

/* 
this function get the response from URL using axios and return usinf promise
If there is some error then simply throw Error.
*/
const getResponse = (URL) => {
  //returing promise
  return new Promise(function (resolve, reject) {
    //axios call
    axios
      .get(URL)
      .then((response) => {
        //returning response
        resolve(response.data);
      })
      .catch((err) => {
        //returning error
        reject("URL is not correct");
      });
  });
};

/* 
this function return response of URLs, passed to it as parameter. Using promise method
*/
const httpRequestUsingPromises = (URLs) => {
  let resultArray = {};

  //wait variable using for setTimeout parameter
  const wait = Math.round(Math.random() * 3000);

  count = 0; //count to check if all URLs are incorrect

  return new Promise(function (resolve, reject) {
    /// iterating URLs array
    URLs.forEach((url) => {
      //waiting for response of getResponse function which will return response of URL
      getResponse(url)
        .then((data) => {
          //storing result in resultArray
          resultArray[url] = data;
        })
        .catch((err) => {
          count++;
          //if there is some error then store error message with related URL
          resultArray[URLs[i]] = err;
        });
    });

    //setTimeout is using so all the promises can be done before it
    setTimeout(function () {
      //checking if resultArray is empty or all the URLs are incorrect
      if (
        Object.keys(resultArray).length > 0 &&
        Object.keys(resultArray).length !== count
      ) {
        //returning array
        resolve(resultArray);
      } else {
        reject("All URLs are not correct");
      }
    }, wait);
  });
};

//exporting function for performace test in performance_problem_5.js
module.exports = {
  httpRequestUsingPromises,
};
