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
*/

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
*/

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
*/

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
convertTemperature(80, getNiceMessage);

/*
write a function called logFileStatus that:

Takes a fileName and a status (a string like "Success" or "Error").

Uses a callback to format the output.

The Goal: Return a string that looks like this: [FILE STATUS]: fileName.

Example: logFileStatus("system.log", "Error") should return [ERROR]: system.log (hint: use .toUpperCase() again!).
*/

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
*/

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

