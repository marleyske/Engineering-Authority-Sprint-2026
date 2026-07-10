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
*/
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

console.log(numbers)