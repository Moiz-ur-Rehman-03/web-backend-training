// getting all files for performance test
const promisesFile = require("./problem_5_promises");
const callbackFile = require("./problem_5_callback");
const asyncAwaitFile = require("./problem_5_async_await");
const promiseAllFile = require("./problem_5_parallel");

//function which take function as callback and return execution time of that function
const measureTime = async (callback) => {
  //starting time
  startTime = performance.now();
  //waiting for function to get executed
  await callback();
  //finishing time
  endTime = performance.now();

  //returning the execution time
  return endTime - startTime;
};

//this function stroing execution time of each method
const recordPerformance = async () => {
  executionTime = {};

  let time = await measureTime(promisesFile.main);
  executionTime["Promises Execution (Serial Execution)"] = time;

  time = await measureTime(callbackFile.main);
  executionTime["CallBack Execution (Serial Execution)"] = time;

  time = await measureTime(promiseAllFile.main);
  executionTime["Promises.all Execution (Parallel Execution)"] = time;

  time = await measureTime(asyncAwaitFile.main);
  executionTime["Async Await Execution (Serial Execution)"] = time;

  console.log("Performance Status (millisecond) : ", executionTime);
};

//this function printing the perfroance status of all methods
const performanceStatus = async () => {
  try {
    await recordPerformance();
  } catch (error) {
    console.log("Something Bad HappenedZ");
  }
};

performanceStatus();
