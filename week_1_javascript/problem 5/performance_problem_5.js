//get URL Array
const urlArray = require("./data").data();

// getting all files for performance test
const promisesFile = require("./problem_5_promises");
const callbackFile = require("./problem_5_callback");
const asyncAwaitFile = require("./problem_5_async_await");
const promiseAllFile = require("./problem_5_parallel");

//function which take label and a function as callback, and print execution time and return the reponse
const measureTime = async (label, callback) => {
  //starting time
  console.time(label);

  //waiting for function to get executed
  response = await callback(urlArray);

  //ending time
  console.timeEnd(label);

  //return response
  return response;
};

//this function stroing execution time of each method
const recordResponses = async () => {
  allResponses = {};

  console.log("Response time: \n");
  /// promises serial execution
  let response = await measureTime(
    "Promises Execution (Serial Execution)",
    promisesFile.httpRequestUsingPromises
  );
  allResponses["Promises Execution (Serial Execution)"] = response;

  /// callback serial execution
  response = await measureTime(
    "CallBack Execution (Serial Execution)",
    callbackFile.httpRequestUsingCallback
  );
  allResponses["CallBack Execution (Serial Execution)"] = response;

  // promise.all parallel execution
  response = await measureTime(
    "Promises.all Execution (Parallel Execution)",
    promiseAllFile.httpRequestUsingPromiseAll
  );
  allResponses["Promises.all Execution (Parallel Execution)"] = response;

  // async await serial execution
  response = await measureTime(
    "Async Await Execution (Serial Execution)",
    asyncAwaitFile.httpRequestUsingAsyncAwait
  );
  allResponses["Async Await Execution (Serial Execution)"] = response;

  // printing all responses
  console.log("\nReponses from all files : ", allResponses);
};

//this function printing the perfroance status of all methods
const performanceStatus = async () => {
  try {
    await recordResponses();
  } catch (error) {
    console.log("Something Bad Happened");
  }
};

performanceStatus();

/// OUTPUT

/* 
Response time: 

Promises Execution (Serial Execution): 1.626s
CallBack Execution (Serial Execution): 868.642ms
Promises.all Execution (Parallel Execution): 406.887ms
Async Await Execution (Serial Execution): 861.011ms

Reponses from all files :  {
  'Promises Execution (Serial Execution)': {
    'https://jsonplaceholder.typicode.com/todos/1': { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
    'https://jsonplaceholder.typicode.com/todos/2': {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false
    }
  },
  'CallBack Execution (Serial Execution)': {
    'https://jsonplaceholder.typicode.com/todos/1': { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
    'https://jsonplaceholder.typicode.com/todos/2': {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false
    }
  },
  'Promises.all Execution (Parallel Execution)': {
    'https://jsonplaceholder.typicode.com/todos/1': { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
    'https://jsonplaceholder.typicode.com/todos/2': {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false
    }
  },
  'Async Await Execution (Serial Execution)': {
    'https://jsonplaceholder.typicode.com/todos/1': { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
    'https://jsonplaceholder.typicode.com/todos/2': {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false
    }
  }
}

*/
