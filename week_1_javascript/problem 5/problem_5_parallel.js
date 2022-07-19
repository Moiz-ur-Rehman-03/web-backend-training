const { default: axios } = require("axios");

/* 
this function get the response from URL using axios and return it.
If there is some error then simply throw Error.
*/
const getResponse = async (URL, resultArray) => {
  try {
    //waiting for axios call
    const response = await axios.get(URL);

    //stroing data in passed array
    resultArray[URL] = response.data;

    //return response
    return response.data;
  } catch (err) {
    //stroing error in passed array
    resultArray[URL] = "URL is not correct";

    //throwing Error
    throw Error("URL is not correct");
  }
};

/* 
this function return response of URLs, passed to it as parameter. Using Promise.all method (parallel execution)
*/
const httpRequestUsingPromiseAll = async (URLs) => {
  let resultArray = {};
  promises = [];

  /// iterating URLs array
  URLs.forEach((URL) => {
    promises.push(getResponse(URL, resultArray));
  });
  
  //waiting for all promises to get settled
  await Promise.allSettled(promises);

  //return respone array
  return resultArray;
};

//exporting function for performace test in performance_problem_5.js
module.exports = {
  httpRequestUsingPromiseAll,
};
