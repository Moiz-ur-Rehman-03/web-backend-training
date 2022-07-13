const EventEmitter = require("events");

//observer for updated values
const observer = new EventEmitter();

//dashboard event is just to show how value will sent to frontend on once all values get updates
const dashboard = new EventEmitter();

///events for temperature , airPressure, humidity
const temperature = new EventEmitter();
const airPressure = new EventEmitter();
const humidity = new EventEmitter();

//contain current values
let displayObject = {
  temperature: Math.random(),
  airPressure: Math.random(),
  humidity: Math.random(),
};

//Requirement # 3
//object to keep check for the values which are not changes for 1 second
let oneSecondDisplayObject = {
  temperature: 0,
  airPressure: 0,
  humidity: 0,
};

//Requirement # 4
//last values of display object to keep in check that all values are changed before sent it to dashboard
let lastDisplayObject = {
  temperature: 0,
  airPressure: 0,
  humidity: 0,
};

//return random value between range of 100 and 2000
const getRandomValue = () => {
  return (Math.random() * (2000 - 100 + 1)) + 100;
};

//on emit temprature
temperature.on("data", () => {
  //get random value
  const randomValue = getRandomValue();

  //run after random value
  setTimeout(() => {
    //change value in current object
    displayObject.temperature = randomValue;

    //Requirement # 2
    //notifying observer about change
    observer.emit("valueUpdated");
  }, randomValue);
});

//on emit humidity
humidity.on("data", () => {
  //get random value
  const randomValue = getRandomValue();

  //run after random value
  setTimeout(() => {
    //change value in current object
    displayObject.humidity = randomValue;

    //Requirement # 2
    //notifying observer about change
    observer.emit("valueUpdated");
  }, randomValue);
});

//on emit air pressure
airPressure.on("data", () => {
  //get random value
  const randomValue = getRandomValue();

  //run after random value
  setTimeout(() => {
    //change value in current object
    displayObject.airPressure = randomValue;

    //Requirement # 2
    //notifying observer about change
    observer.emit("valueUpdated");
  }, randomValue);
});

//Requirment # 3
//checking values if they are not changed for 1000ms
const oneSecondDisplayChecker = () => {
  setInterval(() => {
    //checking temperature value
    if (displayObject.temperature === oneSecondDisplayObject.temperature) {
      displayObject.temperature = "N/A";
    } else {
      oneSecondDisplayObject.temperature = displayObject.temperature;
    }

    //checking airPressure value
    if (displayObject.airPressure === oneSecondDisplayObject.airPressure) {
      displayObject.airPressure = "N/A";
    } else {
      oneSecondDisplayObject.airPressure = displayObject.airPressure;
    }

    //checking humidity value
    if (displayObject.humidity === oneSecondDisplayObject.humidity) {
      displayObject.humidity = "N/A";
    } else {
      oneSecondDisplayObject.humidity = displayObject.humidity;
    }
  }, 1000);
};

//when oberver get notified
observer.on("valueUpdated", () => {
  //Requirement # 1
  //not run more often then every 100ms
  setTimeout(() => {
    //Requirment # 4
    // if all values are differnet
    if (
      lastDisplayObject.temperature !== displayObject.temperature &&
      lastDisplayObject.humidity !== displayObject.humidity &&
      lastDisplayObject.airPressure !== displayObject.airPressure
    ) {
      //then update the lastDisplayObject
      lastDisplayObject = Object.assign({}, displayObject);

      //sending values to dashboard when all values are changed
      dashboard.emit("display_object", displayObject);
    }
  }, 100);
});

//when dashboard get notified
dashboard.on("display_object", (data) => {
  console.log(data);
});

//main function which will emit values of temperature, humidity and airPressure
const main = () => {
  // value checker
  oneSecondDisplayChecker();
  // emitting value after 100 ms
  setInterval(() => {
    temperature.emit("data");
    humidity.emit("data");
    airPressure.emit("data");
  }, 100);
};

// calling function
main();
