// this function take n numbers and return total sum after adding all numbers

function sum(...numbers) {
  let total = 0;

  //loop adding numbers
  for (number of numbers) {
    total += number;
  }

  //returning total sum
  return total;
}

//testing 
console.log('Sum of "1"           =', sum(1)); // 1 
console.log('Sum of "1,2"         =', sum(1, 2)); // 3 
console.log('Sum of "1,2,3"       =', sum(1, 2, 3));// 6 
console.log('Sum of "1,2,3,4"     =', sum(1, 2, 3, 4));// 10
console.log('Sum of "1,2,3,4,5"   =', sum(1, 2, 3, 4, 5));// 15
console.log('Sum of "1,2,3,4,5,6" =', sum(1, 2, 3, 4, 5, 6));// 21
