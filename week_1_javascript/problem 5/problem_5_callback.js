const { default: axios } = require("axios");

/* 
this function get the response from URL using axios and return it.
If there is some error then simply throw Error.
*/
const getResponse = async (URL) => {
  try {
    //waiting for axios response
    const response = await axios.get(URL);

    //returning response
    return response.data;
  } catch (err) {
    //throwing error
    throw Error("URL is not correct");
  }
};

/* 
this function return response of URLs, passed to it as parameter. Using callback method
*/
const httpRequestUsingCallback = async (URLs, callback) => {
  let resultArray = {};
  count = 0; //count to check if all URLs are incorrect

  /// iterating URLs array
  for (let i = 0; i < URLs.length; i++) {
    try {
      //waiting for response of callback function which will return response of URL
      const response = await callback(URLs[i]);

      //storing result in resultArray
      resultArray[URLs[i]] = response;
    } catch (error) {
      count++;
      //if there is some error then store error message with related URL
      resultArray[URLs[i]] = "URL is not Correct";
    }
  }

  //checking if resultArray is empty or all the URLs are incorrect
  if (
    Object.keys(resultArray).length > 0 &&
    Object.keys(resultArray).length !== count
  ) {
    return resultArray;
  }
  return "All URLs are not correct";
};

//testing

//callback is deafult so we can use this function in perfomance_problem_5.js
const main = async (callback = httpRequestUsingCallback) => {
  const array = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
  ];
  try {
    //getting response of all URLs present in array using CallBack method
    const result = await callback(array, getResponse);

    //printing result
    console.log("Callback Response: ", result);
  } catch (error) {
    console.log("Something Is Wrong");
  }
};

//exporting main function for performace test in performance_problem_5.js
module.exports = {
  main,
};
