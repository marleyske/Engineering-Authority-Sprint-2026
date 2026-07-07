/*
The Challenge:
Create a function called calculateSquare that:

Takes two parameters: number and a callback.

Inside, create a variable square that multiplies the number by itself.

Pass that square variable to the callback.

Console log the result of the callback.

Bonus: Create a callback called doubleIt that takes that square and multiplies it by 2.


function calculateSquare(number, callback) {
  const square = number * number;
  console.log(callback(square));
}

function doubleIt(num) {
  return num * 2;
}

function addFive(num) {
  return num + 5;
}

calculateSquare(5, doubleIt);
calculateSquare(5, addFive);
*/