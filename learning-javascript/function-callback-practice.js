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
*/

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
