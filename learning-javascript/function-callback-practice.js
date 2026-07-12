/*
Exercise:
Create a function called processOrder that:

Takes three parameters: item, price, and a callback.

Creates a variable orderSummary that combines the item and price (e.g., "Laptop: $1000").

Passes that orderSummary to the callback.

Prints the result.

Now, create two different callbacks:

addTax: Takes the summary and adds " + Tax" to the end.

addDiscount: Takes the summary and adds " - Discount" to the end.


function processOrder(item, price, callback) {
  const orderSummary = item + ": $ " + price;
  console.log(callback(orderSummary));
}

function addTax(summary) {
  return summary + " + Tax";
}

function addDiscount(summary) {
  return summary + " - Discount";
}

processOrder("Laptop", 1000, addTax);
processOrder("Laptop", 1000, addDiscount);


var a = 10;
var b = 20;

function scopeMaze(a) {
  a = a + 5;
  b = 100;
  return a;
}

b = scopeMaze(a);
console.log(a, b);

function createCounter() {
  let count = 0;

  return {
    add() {
      count++;
    },
    subtrack() {
      count--;
    },
    show() {
      console.log(count);
    },
    reset() {
      count = 0;
    },
  };
}

const myVault = createCounter();
myVault.add();
myVault.add();
myVault.show();
myVault.reset();
myVault.show();

const letters = ["A", "B", "C", "D", "E"];

console.log(letters[2]);

const grid = [
  [1, 2, 3],
  [4, 5, 6],
  ["A", "B", "C"],
];
console.log(grid[2][2]);

// Create an object called book with the following properties:
// title - the book title
// author - an object with firstName and lastName
// yearPublished - the year the book was published
// publish - A function that prints the message "Publishing your book"

const book = {
  title: "Life",
  author: {
    firstName: "Dan",
    lastName: "Johnson",
  },
  yearPublished: 2026,
  publish() {
    console.log("Publishing your book");
  },
};
book.publish();

function addElement(array, element) {
  array.push(element);
}

let numbers = [1, 2, 3];

addElement(numbers, 4);

console.log(numbers);

/*
Exercise
Try writing an if statement that:

Checks if a person can get a driver's license
Requirements: Must be at least 16 years old AND have completed driver's education
If they can get a license, log "You can get your license!"
If they're too young, log "You must be at least 16"
If they haven't completed driver's ed, log "You need to complete driver's education"
*/

const age = 17;
const hasDriversEd = true;

if (age < 16) {
  console.log("You must be at least 16");
} else if (!hasDriversEd) {
  console.log("You need to complete driver's education");
} else {
  console.log("You can get your license");
}

// Alternative (Guard Cause if we were in a funciton)
/*
const age = 17;
const hasDriversEd = true;

if (age < 16) {
  console.log("You must be at least 16");
  return;
}

if (!hasDriversEd) {
  console.log("You need to complete driver's education");
  return;
}

console.log("You can get your license!");


// Convert this if-else statement to a ternary operator:

let weather;
if (temperature > 75) {
  weather = "hot";
} else {
  weather = "not hot";
}

const weather = temperature > 75 ? "hot" : "not hot";

/*
Exercise
Create a switch statement that takes a month number (1-12) and returns the season:

December (12), January (1), February (2): "Winter"
March (3), April (4), May (5): "Spring"
June (6), July (7), August (8): "Summer"
September (9), October (10), November (11): "Fall"
*/

function getSeason(month) {
  switch (month) {
    case 12:
    case 1:
    case 2:
      return "Winter";
    case 3:
    case 4:
    case 5:
      return "Spring";
    case 6:
    case 7:
    case 8:
      return "Summer";
    case 9:
    case 10:
    case 11:
      return "Fall";
    default:
      return "Invalid month";
  }
}
console.log(getSeason(7));
console.log(getSeason(16));

/*
Exercise
Write a for loop that:

Creates an array of the first 10 even numbers (2, 4, 6, 8, ...)
Then calculates the sum of those numbers in a second loop
Finally, prints the array and the sum
*/

// Create array of first 10 even numbers
const evenNumbers = [];

for (let i = 1; i <= 10; i++) {
  evenNumbers.push(i * 2);
}

// Calculate the sum
let sum = 0;
for (let i = 0; i < evenNumbers.length; i++) {
  sum += evenNumbers[i];
}

console.log("Even numbers:", evenNumbers);
console.log("Sum:", sum);

/*
Exercise
Write a recursive function that finds the maximum value 
in a nested array structure like this:
*/

function findMax(arr) {
  let max = -Infinity;

  for (const item of arr) {
    if (Array.isArray(item)) {
      // Recursive case: if item is an array, find max in that array
      const subMax = findMax(item);
      max = Math.max(max, subMax);
    } else {
      // Base case: if item is a number, compate with current
      max = Math.max(max, item);
    }
  }

  return max;
}

const data = [1, [2, 3], 4, [5, 6], 7];
console.log(findMax(data)); // 7
