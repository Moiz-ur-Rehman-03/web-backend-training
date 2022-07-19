// this function take n numbers and return total sum after adding all numbers

const sum = (...numbers) => {
  //loop adding numbers
  let total = 0;

  try {
    numbers.forEach((number) => {
      //checking if not number
      if (isNaN(number)) {
        // if not number then throw error
        throw new Error("Only numbers are allowed...");
      }
      //add total sum
      total += number;
    });

    //return the sum
    return total;
  } catch (error) {
    //print error
    console.log(error.message);
  }
};

//testing
console.log('Sum of "1"           =', sum(1)); // 1
console.log('Sum of "1,\'a\'"         =', sum(1, "a")); // throw error
console.log('Sum of "1,2,3"       =', sum(1, 2, 3)); // 6
console.log('Sum of "1,2,3,4"     =', sum(1, 2, 3, 4)); // 10
console.log('Sum of "1,2,3,4,5"   =', sum(1, 2, 3, 4, 5)); // 15
console.log('Sum of "1,2,3,4,5,6" =', sum(1, 2, 3, 4, 5, 6)); // 21
