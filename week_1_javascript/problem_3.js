//this function can add n numbers using clousres
const add = (total) => {
  //checking if passed parameter is correct
  if (typeof total == "number") {
    // if yes then will return a function which will take next number as passed parameter
    return (number) => {
      if (typeof number == "number") {
        /* if it's valid paramter then return add function and pass sum of current passed
        paramter and total, which is present in it's outer enviroment , as parameter in 
        add function */

        return add(total + number);
      } else {
        // if not valid type then return total sum till now
        return total;
      }
    };
  }
  //if first paramter is not valid
  return "Invalid Input";
};

///  Testing
console.log(add()); //invalid input
console.log("Sum of 2,2,3 : ", add(1)(2)(3)()); // 6
console.log("Sum of 2,3   : ", add(2)(3)()); // 5
