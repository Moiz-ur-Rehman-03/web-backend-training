/* 
This function get the URL as a passed parameter and check if program ever hit this URL,
If it's first time then program will get data using axios and then push it into local storage and return the response data.
If it's not first time then program simply check from localstorage and return the data present there regarding
passed URL
*/

const { default: axios } = require("axios");

const urlHistory = {}; // store data for runtime process

const memoization = (URL) => {
  //returning promise because execution can take time
  return new Promise(function (resolve, reject) {
    //checking if data is present in localstorage related to this URL
    const data = localStorage.getItem(URL);
    if (data) {
      //if data is present in localstorage then simply return it.
      return data;
    }
    //if not, then get data from URL using axios
    axios
      .get(URL)
      .then((response) => {
        // if axios got a response then store it in localstorage and return it using resolve
        localStorage.setItem(URL, response.data);
        urlHistory[URL] = response.data; //storing data for runtime processing
        resolve(response.data);
      })
      .catch((err) => {
        // if there is some problem then return it using reject
        console.log("error: " + err);
        reject(err);
      });
  });
};

//testing
memoization("https://jsonplaceholder.typicode.com/todos/1").then((data) => {
  console.log(data);
});

/// NOTE: to test it on browser you have to add CDN of axios.
