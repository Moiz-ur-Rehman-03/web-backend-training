const { default: axios } = require("axios");

/* 
this function return response of URLs, passed to it as parameter. Using asycn await method
*/
const httpRequestUsingAsyncAwait = async (URLs) => {
  let resultArray = {};
  count = 0; //count to check if all URLs are incorrect
  /// iterating URLs array
  for (let i = 0; i < URLs.length; i++) {
    try {
      //waiting for response of getResponse function which will return response of URL
      const response = await axios.get(URLs[i]);
      //storing reponse in resultArray
      resultArray[URLs[i]] = response.data;
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

//exporting function for performace test in performance_problem_5.js
module.exports = {
  httpRequestUsingAsyncAwait,
};
