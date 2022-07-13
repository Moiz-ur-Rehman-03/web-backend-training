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
this function return response of URLs, passed to it as parameter. Using asycn await method
*/
const httpRequestUsingAsyncAwait = async (URLs) => {
  let resultArray = {};
  count = 0; //count to check if all URLs are incorrect
  /// iterating URLs array
  for (let i = 0; i < URLs.length; i++) {
    try {
      //waiting for response of getResponse function which will return response of URL
      const response = await getResponse(URLs[i]);
      //storing reponse in resultArray
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
const main = async () => {
  const array = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
  ];
  try {
    //getting response of all URLs present in array
    const result = await httpRequestUsingAsyncAwait(array);
    //printing result
    console.log("Aync Await Response: ",result);
  } catch (error) {
    console.log("Something Is Wrong");
  }
};

//exporting main function for performace test in performance_problem_5.js
module.exports = {
  main,
};
