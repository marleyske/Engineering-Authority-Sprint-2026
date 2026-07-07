/*
Challenge: "The String Manipulator"
Create a function called formatMessage that:

Takes two parameters: text and a callback.

Inside, create a variable upperText that converts the text to uppercase (using the .toUpperCase() method in JavaScript).

Pass that upperText into the callback.

Log the result.

Now, create two callbacks:

exclaimIt: Takes the text and adds "!!!" to the end.

questionIt: Takes the text and adds "???" to the end.


function formatMessage(text, callback) {
  const upperText = text.toUpperCase();
  console.log(callback(upperText));
}

function exclaimIt(input) {
  return input + "!!!";
}

function questionIt(input) {
  return input + "???";
}

formatMessage("hello world", exclaimIt);
formatMessage("how are you", questionIt);

/*
Create a function doubleNumber(num, callback) that converts a number to a string using 
.toString() and then passes it to a callback that adds the word " total" to the end.


function doubleNumber(num, callback) {
  const convertNumber = num.toString();
  console.log(callback(convertNumber));
}

function sum(add) {
  return add + " total";
}

doubleNumber(10, sum);

/* The Challenge: "The Temperature Converter"
Create a function called convertTemperature that:

Takes two parameters: celsius (a number) and a callback.

Inside, create a variable fahrenheit that converts the celsius number using this formula: (celsius * 9/5) + 32.

Pass that fahrenheit value to the callback.

Log the result.

Now, create two callbacks:

getWarning: Takes the fahrenheit temperature and returns it with a string: "It is [temp] degrees, wear a coat!"

getNiceMessage: Takes the fahrenheit temperature and returns it with a string: "It is [temp] degrees, enjoy the weather!"


function convertTemperature(celsius, callback) {
  const fahrenheit = (celsius * 9) / 5 + 32;
  console.log(callback(fahrenheit));
}

function getWarning(temp) {
  return `It is ${temp} degrees, wear a coat!`;
}

function getNiceMessage(temp) {
  return `It is ${temp} degrees, enjoy the weather!`;
}

convertTemperature(10, getWarning);
convertTemperature(40, getNiceMessage);

/*
write a function called logFileStatus that:

Takes a fileName and a status (a string like "Success" or "Error").

Uses a callback to format the output.

The Goal: Return a string that looks like this: [FILE STATUS]: fileName.

Example: logFileStatus("system.log", "Error") should return [ERROR]: system.log (hint: use .toUpperCase() again!).


function logFileStatus(fileName, status, callback) {
  const formattedStatus = status.toUpperCase();
  console.log(callback(formattedStatus, fileName));
}

function formatMessage(status, name) {
  return `[${status}]: ${name}`;
}

logFileStatus("system.log", "error", formatMessage);

/*'"Permission Checker." Create a function checkPermission(user, callback) that:

Takes a user name and a callback.

Checks if the user is "admin".

Passes true or false to the callback.

The callback should return: "Access Denied" or "Access Granted".


function checkPermission(user, callback) {
  const isAuthorized = user === "admin";
  console.log(callback(isAuthorized));
}

function translator(isAllowed) {
  return "Is access granted? " + isAllowed;
}

checkPermission("admin", translator);
checkPermission("guest", translator);

// [INCCORECT ANSWER]:

// function addTen(number, callback) {
//     const result = number +10;
//     console.log(callback(result));
// }

// function showResult(data) {
//     return addTen(5, showResult);
// }

// addTen(5, showResult);

// [CORRECT ANSWER]:

// The Machine (The Kitchen)
function addTen(number, callback) {
  const result = number + 10;
  // The Machine hands the 'result' to the 'callback'
  callback(result);
}

// The Helper (The Waiter)
function showResult(data) {
  // The Waiter receives the 'data' (which is the result from above)
  // and decides to print it.
  console.log("The final answer is: " + data);
}

// The Run
addTen(5, showResult);

// SCOPE LESSON:

/*
1. Global Scope (The Public Lobby)
If you declare a variable outside of any function, it is global. Everyone can see it.

let coffeeLevel = 100; // Global variable

function checkCoffee() {
  console.log(coffeeLevel); // Yes, it can see it.
}


2. Function Scope (The Secure Room)
If you declare a variable inside a function, it is trapped in that room. No one outside can see it.


function secureRoom() {
  let secretCode = "1234";
  console.log(secretCode); // Works!
}

console.log(secretCode); // Error! This code is outside the room.


3. Nested Scope (The "Parent-Child" Relationship)
This is where the magic (and the confusion) happens. A function inside a function can see its own variables plus its parent's variables.


function parent() {
  let parentVar = "I am the parent";
  
  function child() {
    let childVar = "I am the child";
    console.log(parentVar); // The child can "reach up" and see the parent!
  }
}
*/

/*
Practice Exercise: CLOSURE
Create a function called createGreeter that:

Takes a greeting parameter (like "Hello" or "Hi")
Returns a function that takes a name parameter
The returned function should log the greeting + name


function createGreeter(greeting) {
  return (name) => {
    console.log(greeting + " " + name);
  };
}
const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");

sayHello("Marvin"); // "Hello Marvin"
sayHi("Leo"); // "Hi Leo"

function createCounter() {
  let count = 0;
  return () => {
    count++;
    console.log(count);
  };
}

const myCounter = createCounter();
myCounter();
myCounter();

/*
Practice Exercise: The "Vault Access"
Your goal is to write a function createAccessCard that holds a userLevel. It should return a function that, when called, checks if a person is allowed to enter.

Syntax Pattern to practice:

Outer function: Takes the initial data (the "stuff" to remember).

Inner function: Uses that data to make a decision.


function createAccessCard(userLevel) {
  // 1. The ourter function holds the "userLevel" in its scope.

  return (requiredLevel) => {
    // 2. The inner function reaches out to see the "userLevel"
    // and compares it to the "requiredLevel"

    if (userLevel >= requiredLevel) {
      console.log("Access Granted");
    } else {
      console.log("Access Denied");
    }
  };
}

// Now we create two different "cards"
const adminCard = createAccessCard(5);
const guestCard = createAccessCard(1);

adminCard(3); // "Access Granted" (because 5 >= 3)
guestCard(3); // "Access Denied" (because 1 < 3)

/*
The "Temperature Gauge"
Write a function called createThermometer that takes a baseTemp (the starting temperature).

The returned function should take a newTemp and log whether it is Hotter or Colder than the baseTemp.

Try to write this code. Don't worry if you get the syntax wrong—just try to get the "Outer" and "Inner" structure in place. How would you start this?


function createThermometer(baseTemp) {
  return (newTemp) => {
    // If baseTemp (88) is higher than newTemp (79), it got COLDER.
    if (baseTemp > newTemp) {
      console.log("It's Colder");
    } else {
      console.log("It's Hotter");
    }
  };
}

const summerDay = createThermometer(88);
const winterDay = createThermometer(62);

summerDay(79); // 88 > 79 so it logs: "It's Colder"
winterDay(45); // 62 > 45 so it logs: "It's Colder"
winterDay(75); // 62 < 75 so it logs: "It's Hotter"

/*
Challenge: The "Inventory System"
You are back at the auto shop. You want to create a function createInventoryManager that remembers the itemName and the stockCount.

The Goal:

The outer function should take two inputs: itemName and initialStock.

The returned function should take a number to sell.

It should subtract that number from the stock and log: "Sold [number] [itemName]. Remaining: [stockCount]".


function createInventoryManager(itemName, initialStock) {
  // 1. We keep the data here in the "Manager's Office"
  let stock = initialStock;
  
  // 2. The inner function "closes over" the variables 'stock' and 'itemName'
  return (amountToSell) => {
    stock = stock - amountToSell; 
    console.log("Sold " + amountToSell + " " + itemName + ". Remaining: " + stock);
  };
}

const oilFilterManager = createInventoryManager("Oil Filters", 50);

oilFilterManager(5);
oilFilterManager(10);
*/
