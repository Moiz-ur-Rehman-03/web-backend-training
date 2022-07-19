//importing "axios"
const axios = require("axios");

//function to check if URL contain protocol, if not then add the "https" protocol
const addHttps = (url) => {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "https://" + url;
  }
  return url;
};

//return response get after hitting it with axios
const getResponse = async (URL) => {
  return new Promise((resolve, reject) => {
    //checking if URL contain protocol
    URL = addHttps(URL);

    //getting response from URL using axios command
    axios
      .get(URL)
      .then((response) => {
        //returnong result on successful response
        resolve(response.data);
      })
      .catch((error) => {
        //returning error if didn't get any response
        reject("URLs are not correct !!!");
      });
  });
};

Array.prototype.populate = async function () {
  //making promises array to hit all URLs in array
  const promises = this.map(getResponse);

  try {
    //waiting for promises to get done
    const result = await Promise.all(promises);

    //changing values
    result.forEach((response, index) => {
      this[index] = response;
    });
  } catch (error) {
    //if there is some error like URLs are invalid
    console.log(error);
  }
};

//simple array contianing some URL
const array = [
  "qq",
  "https://jsonplaceholder.typicode.com/todos/3",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/1",
];

//testing prototype poplulate()
const testing = async () => {
  await array.populate();

  //priting array
  console.log(array);
};

testing();

/* 
RESULTS:

TEST # 1:

INPUT:
const array = [
  'qwe',
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3",
];

OUTPUT:
URLs are not correct !!!
[
  'qwe',
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3'
]

======================================================================

TEST # 2:

INPUT:
const array = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3",
];

OUTPUT:
[
  { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
  },
  { userId: 1, id: 3, title: 'fugiat veniam minus', completed: false }
]
*/
