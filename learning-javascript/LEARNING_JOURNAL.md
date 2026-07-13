# Session [2026-6-25] [Function Callbacks]:

## The "Why" (The Concept):

- **Core Logic:**
- A callback allows the machine to hand off data to a helper, making the machine reusable.
- **"Aha!" Moment:**
- Realizing the machine doesn't need to know how the data is displayed.

### The Mental Model (Architectural Visualization):

- **The Anology:** The Kitchen vs. The Waiter" or "The Pipe vs. The Filter.
- **Data Flow Sketch:**
- Input -> Machine -> (Hand-off) -> Callback -> Output.

### The "Gotcha" (Debugging/Struggles):

- **The Mistake:**
- I tried to call the machine inside the callback, which caused an infinite loop.

- **The Fix:** How you solved it?

- Inside my showResult function I was calling addTen again. showResult should only be responsible for showing the resultm not for running the addTen machine again.

- **The Architectural" Lesson:**
- What this taught me about writing cleaner code.

### Code "Laboratory" (The Best Snippet):

// 1. The Machine: Focuses on the math
function addTen(number, callback) {
const result = number + 10;
// Just pass the result to the callback.
// You don't need console.log here if the callback will do it!
callback(result);
}

// 2. The Helper: Focuses ONLY on displaying the data
function showResult(data) {
console.log("The final answer is: " + data);
}

// 3. The Run: Connect them together
addTen(5, showResult);

### The "Bridge" (Connecting to Linux/Project):

- This reminds me of how | pipes data from one command to the next.

### Summary of Concept:

- callbacks aren't just a syntax rule; they are a strategy to keep your logic clean so your code doesn't become one big, messy, unmanageable file.

# Session [2026-7-3] [Scope]:

## The "Why" (The Concept):

- **Core Logic:**
- The scope is a fundamental concept in JavaScript that determines where variables and functions can be accessed.
- Scope is the area of your code where a variable or function is accessible. JavaScript creates a new scope inside every set of curly braces `{}` as well as a global scope for your entire file.
- Types of Scope:
  Global Scope; is the outrmost scope, your entier file. Variables declared here can be accessed from anywhere in your code.
  Block Scome; is created for any code between curly braces `{}`.
  Function Scope; is created whenever you define a function. A function scope is very similar to a block scope, but some JavaScript features use function scope insted of block scope.
  Nested Scope; you can have multiple levels of scope.

  ### The Mental Model (Architectural Visualiztion):

- **The "Missing Link" (Why I struggled):**
- The reason Closures are hard is because they break the standard "secure room" rule.

- Normally, when a function finishes running, all its variables (like parentVar) should be deleted/cleared out (like clearing a room at the end of a shift).

- But, if a child function is still alive, JavaScript realizes: "Wait! The child still needs parentVar to do its job. I won't delete it." It keeps that variable in a "special storage" instead of deleting it. That "special storage" is the Closure.

- **Aha! Moment:**

- Scope is like One-Way mirrors that always look outward. Outward scopes cannot see inner scopes.
- Naming conflict: You can have variables with the same name in different scopes without conflict.
- JavaScript starts with the current scope and works outward.
- Don't use the same name for different variables in nested scopes.

## Code Labritory:

Based on the rules above, which variables do you think `inner()` has access to? `ALL`

let globalVar = "Global";

function outer() {
let outerVar = "Outer";

function inner() {
let innerVar = "Inner";
// Which of these can inner() see?
}
}

## Reference Data:

### Lesson Review (Scope):

1. In JavaScript, What determines which variables and functions can be accessed at any given point in your code?

Scope determines what variables and functions can be accessed. JavaScript uses curly braces to define scope boundaries, and scope works as a one-way street where code can always look outward to outer scopes but never inward to inner scopes.

2. When JavaScript encounters multiple variables with the same name in different scopes, how does it determine which variable to use?

JavaScript starts at the innermost (current) level of scope and searches for the variable there. If it doesn't find the variable, it moves outward to the next level of scope, continuing this proess until it finds the variable or reaches the global scope. 3. What are the three main types of scope in JavaScript and how do they differ?

The three types are:

- Global scope: anything not wrapped in curly braces, available everwhere in the application.
- Block scope: created by curly braces, with variables accessible only within that block.
- Function scope: encompasses everything from the opening to closing curly brace of a function, even if there are nested scopes inside.

4. What happens when you create a global variable in one JavaScript file and try to access it in another JavaScript file loaded on the same HTML page?

Global variables are accessible acreoss all JavaScript files loaded on the same web page. The variable will be available in other files, though the loding order matters - the file declaring the variable must load before files that use it. If you try to redeclare the same global variable in another file, it will cause an error.

5. What is the best preactice regarding global scope usage in JavaScript, and why?

Minimize the use of global scope as much as possible. Variables in global scope are available everywhere in the application, which can lead to cunfusion about whether a variable has been changed elsewhere, what variables are available, and which variable is being used. It's better to move variables to the innermost scope possible where they're actually needed.

# Session [2026-7-3] [Hoisting]:

## The "Why" (The Concept):

- **Core Logic:**
- Hoisting is a JavaScript behavior where function declarations are moved to the top of their scope during compilation. This allows you to use functions before they're defined in your code.
- Normally, JavaScript executes code from top to bottom. However, functions work differently. You can call a function before it's defined.
- Before JS runs your code, it does a preliminary scan and moves all function declarations to the top of their scope.
- Functions are either hoisted to the top of the global scope or the top of their containing function scopre, depending on where they are defined.
- Arrow functions behave like variables and are not hoisted.

- **Aha! Moment:**

- Hoisting allows you to organize your code more flexibly. You can place your main program logic at the top and helper functions below, improving readability.

### Reference Data:

### Lesson Review (Hoisting):

1. In JavaScript, what happens when you try to use a variable before it is defined in the code?

You will get an error because the variable is not defined yet. JavaScript executes code from top to bottom, so variables must be defined before they are used.

2.  Why do arrow functions not get hoisted in JavaScript?

Arrow functions are not hoisted because they are defined using const or let keywords, which are variable declarations. Since varibles declare with const and let are not hoisted, arrow functions defined with these keywords do not get hoisted either. Only functions declared with the function keyword are hoisted.

3. What is the main practical benefit of hoisting when organizing code in a file?

Hoisting allows you to place the most important, easy-to-read code at the top of the file while putting implementation details and helper functions at the bottom. This makes code more readable because someone can understand what the program does by reading the top portion without needing to read through all the function implementaions.

4. Given the following code, will it execute successfully and why?

sum(1,2);

function sum(a, b) {
return a + b;
}

Yes, it will execute successfully and return 3. Even though the function is called before it is defined in the code, JavaScript hoists the function declaration to the top of the scope, making it available for use througout the entire file.

5. What is the main benefit of hoisting when organizing code?

It allows important code to be placed at the top of a file while helper functions can be placed at the bottom.

# Session [2026-7-3] [Closures]:

### Reference Data:

### Lesson Review (Closures):

1. What is a closure in JavaScript?
   A closure is what happens when an inner function accesses variables in a scope outside of it. It's essentially how scope works for functions - a function that looks outward to see other scope inside of it.
2. When a closure references a dynamic variable from an outer scope, which value does it use?
   For example:

let a = 1/

function print() {

console.log(a);
}

a = 2;

print();

The closure uses the most up-to-date value of the variable at the time the function is called. In this example, it would log 2 because that's the current value of 'a' when print() is executed. 3. What will the following code output?
function(a) {

function inner(b) {

    condole.log(a, b);

}

return inner;

}

const newFunc = outer(1);

newFunc(2);

It will output: 1 2
the inner function remembers the value of 'a' (which is 1) from when outer was called, and recieves 'b' (which is 2) when new Func is called. 4. Can a function inside another function access variable from multiple outer scope layers?
Yes, a nested function can access variables from all outer scope layers. It can access global variables, variables from its immediate outer function, and variables from any other outer functions in the scope chain, always looking outward. 5. What would the following code return?

function createGreeter(greeting) {

return function(name) {

};

}

const sayHello = createGreeter('Hello');

sayHello(Kyle');

It would return 'Hello Kyle'. The returned function remembers the 'greeting' parameter ('Hello') from the outer function and combines it with the 'name parameter ('Kyle') passed to the inner function.

6. What happens to variables from an outer function when an inner function is returned in JavaScript?
   The inner function remembers and keeps track of the outer function's variables.

7. In a closure with nested functions, how many scope layers can an inner function access?
   As many levels nested outward as exist.

# Session [2026-7-3] [Creating Variables with var]:

- **Core Logic:**

- var is like telling your roomate "I'm going to buy milk" but not buying it yet. When they go to the fridge, they find it empty-they don't know if you forgot or havent't gone to the store yet.

- let is like keeping the milk in a locked box until you've actually put it in the fridge. If they try to open the box while it's empty, you stop them immediately.

# JavaScript Learning Journal: Scope, Variables, and Functions

This journal tracks key concepts regarding how JavaScript handles data, scoping, and execution flow.

## 1. Variables and Declarations

- `var`: The "wild west" of declarations. Function-scoped, can be re-declared, and is hoisted with an `undefined` value. Avoid in modern code.
- `let`: Block-scoped. Cannot be re-declared in the same scope. Allows re-assignment.
- `const`: Block-scoped. Cannot be re-declared or re-assigned. Used for fixed values.

### Key Distinction

- **Re-declaring:** Using the same name twice (e.g., `let x = 1; let x = 2;`). Forbidden with `let` and `const`.
- **Re-assigning:** Changing the value of an existing variable (e.g., `x = 2;`). Forbidden with `const`.

## 2. Scope

Scope defines where a variable is "visible" or "accessible."

- **Global Scope:** Variables declared outside any function or block. Accessible everywhere.
- **Function Scope:** Variables declared inside a function are only accessible within that function.
- **Block Scope (`let`/`const`):** Variables exist only within the curly braces `{ }` where they were defined (e.g., `if` statements, loops).

### The Scope Chain

When a variable is requested, JavaScript looks:

1. In the current local scope.
2. In the parent scope.
3. Up to the global scope.
   _Functions can look "out," but parents cannot look "in" to child scopes._

## 3. Hoisting

JavaScript scans code for declarations (`var`) before execution.

- `var` declarations are "hoisted" to the top, but they are initialized as `undefined`.
- `let` and `const` are hoisted but remain in a "Temporal Dead Zone"—accessing them before declaration causes a `ReferenceError`.

## 4. Functions and Data Flow

- **Parameters:** Variables passed into a function create local "buckets" for the function's use.
- **Return Values:** If you don't "catch" the result of a function with a variable (e.g., `let result = myFunc();`), the returned value is discarded.
- **Global Hijack:** If you assign a value to a variable name without declaring it (`x = 10` inside a function), JavaScript looks up the scope chain and modifies the global variable instead of creating a local one.

## 5. Asynchronous Behavior

- **`setTimeout`:** A way to schedule code for the future. It places tasks on a "Wait List" rather than executing them immediately.
- **Loop Timing:** Loops execute instantly. By the time scheduled functions (like `setTimeout`) run, the variables they access may have already changed (e.g., `i` reaching its final value).

## 6. Closure ("The Vault")

- **Definition:** An inner function "remembers" the environment (variables) in which it was created, even after the parent function finishes.
- **Encapsulation:** By trapping a variable inside a function scope, you create a private variable that cannot be accessed or modified directly from the outside.
- **Gatekeepers:** Access is controlled through returned functions (like `add` or `reset`), creating a secure, private data structure.

## 7. Summary Cheat Sheet

| Concept | Can Re-declare? | Can Re-assign? | Scope    |
| :------ | :-------------- | :------------- | :------- |
| `var`   | Yes             | Yes            | Function |
| `let`   | No              | Yes            | Block    |
| `const` | No              | No             | Block    |

---

_Studied concepts: Variable declarations, function scope, scope chain, hoisting, return values, asynchronous timing, closures, and encapsulation._

# Session [2026-6-7] [Type Coercion]:

### Reference Data:

### Lesson Review (Type Coersion):

1. What is the difference between explicit and implicit type coercion in JavaScript?
   Explicit type coercion is when the programmer directly tells JavaScript to change a variable to another type. Implicit type coercion is when JavaScript automatically cnverts types behind the scenes without the programmer explicitly requesting it.
2. What is the difference between `parseInt()` and `parseFloat()` in JavaScript?
   `parseInt()` converts a string to a whole number (integer) and removes any decimal portion. `parseFloat()` converts a string to a number that preserves decimal points (floating point number). For example, `parseInt('1.3')` returns `1`, while `parseFloat('1.3')` returns `1.3`.
3. How do subtraction and multiplication operators handle type coercion differently than the addition operator when working with a number and a string?
   Ulike addition, subtraction and multiplication covert strings to numbers before performing the operation. For example, `3 - '1'` converts the string `'1'` to the number `1` and returns `2`. Similarly, `3 * '1'` returns `3`. The addition operator converts to strings instead.
4. How can you convert any value to a string in JavaScript?
   You can use the `toString()` function, which is available on every value in JavaScript. For example, `(1.34).toString()` converts the number `1.34` to the string `'1.34'`.
5. What is type coercion in JavaScript?
   Coverting one data type to another type, such as a number to a string or a string to a number.

# Session [2026-7-6] [NaN]:

### Reference Data:

### Lesson Review (NaN):

1. What does the `parseInt()` function return when passed a string that contains no numbers, such as "hello"?
   `parseInt()` returns NaN (Not a Number), which is a special reserved keyword in JavaScript that represents a value that cannot be converted to a valid number.
2. What does the `typeof` operator return when applied to `NaN`?
   The `typeof` operator returns "number" when applied to `NaN`, even though NaN stands for "not a number". This is because NaN represents an attempt to creat a number that failed, so it still has the type of number.
3. What is the result of comparing NaN to itself using the equality operator (e.g., NaN == NaN)?
   The comparison returns false. In JavaScript, NaN is never equal to anything, including itself. This is a hardcoded behavior in the language.
4. How can you properly check if a value is `NaN` in JavaScript?
   You must use `isNaN()` function. this function returns `true` if the value is `NaN` and `false` if it is a valid number. You cannot use equality operators because `NaN` is never equal to anything, including itself.
5. Given the following code, what will be the output?
   const a = parseInt("hello");
   const b = 5;
   console.log(isNaN(a)); // true
   console.log(isNaN(b)); // false
   The first `isNaN(a)` returns true becaues a is NaN (result of parsing "hello"). The second `isNaN(b)` returns false because b is a valid number (5).

# Session [2026-7-3] [Equality Type Comparison]:

### Reference Data:

### Lesson Review (Equality Type Comparison):

1. What is the difference between double equals (==) and triple equals (===) in JavaScript when comparing values?
   Double equals (==) perfoms immplicit type coercion before comparison, converting values to the same type if they're different. Triple equals (===) performs a strict equality check that first checks if the types are the same, and if they're not, it immediately returns false without any type coercion.
2. What result does the following comparison return in JavaScript and why?
   1 == "1" // true
   This returns true because the double equals operator performs type coercion. JavaScript converts the string "1" into the number 1 before doing the comparison, so both values become the number 1.
3. What are falsy values in JavaScript, and which specific values invovling zero and strings are mentioned as examples?
   Falsy values are values that evaluate to false when converted to a boolean. The number 0 and empty strings are considerd falsy values in JavaScript. When compared to false using double equals, they return true because they are converted to the boolean false.
4. What is the recommended approach for equality comparisons in JavaScript, and what is the one exception to this rule?
   The recommended approach is to always use strict equality (===) or strict inequality (!==) to avoid confusing type coercion behavior. The one exception is when comparing null and undefined, where double equals (==) is useful because it treats them as equal, allowing a single check for both values instead of needing separate checks.
5. What result does the following comparison return and why?
   let a = null;
   a == undefined
   // true
   This returns true because double equals performs type coercion and treats null and undefined as equal since they both represent "not a value." However, if using triple equals (===). this would return false because null and undefined are technically different types.

# Session [2026-7-6] [Arrays]:

### Reference Data:

### Lesson Review (Arrays):

1. In JavaScript, how do you create an empty array?
   You create an empty array using empty square brackets: `[]`. For example: `const myArray = [];`
2. What index number is used to access the first element in a JavaScript array, and why?
   The index number 0 is used to access the first element because JavaScript arrays are zero-indexed, meaning they start counting from 0 rather than 1. So the first element is a index 0, the second at index 1, and so on.
3. What method is used to add a new element to the end of an array in JavaScript?
   const names = ['Kyle', 'Sarah'];
   // Add 'John' to the end
   The `push()` method is used to add a new element to the end of an array. For example:
   `names.push('John');` will add 'John' to the end of the array, making it `['Kyle', 'Sarah', 'John']`.
4. How would you access the letter 'C' from this nested array?
   const grid = [
   [1, 2, 3],
   [4, 5, 6,],
   ['A', 'B', 'C']

];
console.log(grid[2][2])
You would use `grid[2][2]` to access the letter 'C'. The first `[2]` accesses the third row (the array containing 'A', 'B', 'C'), and the second `[2]` accesses the third element in that row, which is 'C'. 5. How do you determine the number of elements in a JavaScript array?
You use the `length` property of the array. for example, if you have `const myArray = ['A', 'B'];`, then `myArray.length` will return `2`, indicating there are 2 elements in the array. 6. How do you create an empty array in JavaScript?
Using empty square brackets: [].

# Session [2026-7-6] [Objects]:

### Reference Data:

### Lesson Review (Objects):

1. What is the primary difference between arrays and objects in JavaScript?
   Arrays are used for storing a list of data that starts at a point and ends at a point, while objects are used for storing a collection of data together as properties with named keys, whereas arrays store data in indexed positons.
2. What are the two ways to access properties in a JavaScript object, and which is preferred?
   The two ways are dot notation (e.g., `person.name`) and bracket notation (e.g., `person['name']`). Dot notation is preferred because it provides autocomplete support in text editors and is more readable. Bracket notation is useful when accessing properties dynamically using variables.
3. How do you define a function as a property within a JavaScript object using the shorthand syntax?
   You write the function name followed by parentheses and then curly brackets containing the function code, omittin gthe `function` keyword. for example:
   sayKi() {
   console.log('hi');
   };
4. How would you access a nested propety in a JavaScript object? For example, if you have a person object with an address object containing a street property?
   You chain dot notation to access nested properties. For example, `person.address.street` would access the street property within the address object. Each dot accesses the next level of nesting in the object structure.
5. What syntax is used to create an object in JavaScript, and how are propertiesx defined within it?
   Objects are created using curly brackets `{}`. Properties are defined as key-value pairs, with the property name followed by a colon and then the value. Multiple properties are separated by commas.
   For example:
   const person = {
   name: 'kyle',
   age: 30

}; 6. What is the shorhand syntax for defining a function called 'sayHi' inside an object?
`sayHi() { // function code }` 7. When would you use a bracket notation instead of dot notation to access object properties?
When you need to access properties dynamically using a variable.

# Session [2026-7-8] [Reference vs Value]:

### Reference Data:

### Lesson Review (Reference vs Value):

1. What is the difference between value types and reference types in JavaScript in terms of what gets stored in a variable?
   Value types store the actual data directly i the variable (like the number 10 or string "hi"). Reference types store a memory location that points to where the actual data is stored. Primitive types are value types, while arrays and objects are reference types.
2. Given the followin gcode, what will be the values of `a` and `b`, and why?

let a = 10;

let b = a;

b = b + 1;
`a` will be 10 and `b` will be 11. When `b` is assigned the value of `a` it copies the actual value (10). Since primitives are value types, `a` and `b` are indepenent variables, so changing `b` does not affect `a`. 3. Why does comparing two arrays with identical content using equality operators return false in JavaScript?

let a = [1, 2];

let b = [1, 2];

console.log(a === b );
The comparison returns false because equality operators compare the value column (the memory reference), not the actual content. when two arrays are created separately, they reference different locations in memeory, even if their contents are identical. The are like two different hotel rooms with the same furniture. 4. Why is it possible to modify a constant array using methods like `push()` but not possible to reassign it entirely?

const array = [1, 2];

array.push(3); // this works

array = [4, 5]; // this causes an error
The `const` keyword only prevents reassigning the value column (the memory reference). Using `push()` modifies the contents at the memory location without changing the reference itself. Reassigning with `=` tries to change the memory reference, which const prevents. It's like being allowed to reaarange furniture in your hotel room but not being allowd to switch to a different room.

5. What happens when an array is passed as a parameter to a function, and why does modifying it inside the function affect the original array?

function addElement(array, element) {

array.push(element);

}

let numbers = [1, 2, 3];

addElement(numbers, 4);

When an array is passed to a function, JavaScript passes reference (memory location) to that array, not a copy of the array itself. Both the original variable and the function parameter point to the same location in memory. Any modifications made inside the function affect the original array because they're both accessing the same data. 6. What happens when you assign one primitive value variable to another variable in JavaScript?
The value is copied directly inot the new variable, creating two independent variables. 7. What happens when you pass an array to a function in JavaScript?
A reference to the original is passed, so modifications affect the original. 8. What are the two main reference types in JavaScript?
Arrays and objects.

# Session [2026-7-9] [String Template Literals]:

### Reference Data:

### Lesson Review (String Template Literals):

1. What key on the keyboard is used to create template literal strings in JavaScript?
   The back tick key (`) which is located directly above the tab key on the keyboard (the tilde key).
2. What is the syntax for embedding a variable or JavaScript expression inside a template literal string?
   Use a dollar sign followed by curly braces:
   `S{expressions}`. Anything between the curly braces will be executed as JavaScript code and the result will be inserted into the string.
3. How would you rewrite the string concatenation `firstName + " " + lastName` using a template literal?
   Using template literals: `${firstNmae} ${lastName}`.
4. What happens to whitespace characters (spaces, tabs, and newlines) when using multi-line template literal strings?
   All whitespace characters including spaces, tabs, and newlines are preserved and included in the final string output. This means that any indentation of formatting in the code will arppear in the resulting string.
5. Can template literals execute JavaScript expression s other than varibles, and if so, what would `${2 + 3}` output?
   Yes, template literals can execute any JavaScript expression, not just variables. The expression `${2 + 3}` would output the string "5" because it evaluates the arithmetic expression and inserts the result into the string.
6. What is the primary advantage of useing template literals (back ticks) over traditional string concatenation in JavaScript?
   They allow you to embed variables and expressions directly into strings without using concatenation operators.
7. What can be placed inside the ${} syntax of a template literal?
   Any valid JavaScript code including variables, expressions, functions, and operations.

# Session [2026-7-9] [this Keyword & Classes]:

### Reference Data:

### Lesson Review (this Keyword & Classes):

1. What does the `this` keyword reference when used at the global scope in a browser environment?
   In the browser `this` at the global scope references the Window object, which is the global object in the brwoser environment. In Node.js, it would reference the global object instead.
2. How is `this` keyword typically used within an object method?
   Inside an object method, `this` references the object itself, allowing access to all properties and methods defined on that object. For example, in a `greet` function within a person object, `this.name` would access the name property of that person object.
3. What is the purpose of the `constructor` function in a JavaScript class?
   The constructor function is called when creating a new instance of a class using the `new` keyword. It initializes the object by setting properties and values. The constructor receives parameters (like name and age) and assigns them to the object using the `this` keyword.
4. What is the naming convention for classes in JavaScript, and why is it different from regular variables?
   Classes in JavaScript should start with an uppercase letter (using PascalCase where all words are capitalized), while regular variables use camelCase. This is a convention that helps distinguish classes from other variables and is consistent with built-in JavaScript classes.
5. Why is the `new` keyword required when creating an instance of a class like `Date`?

const date = new Date();
The `new` keyword is required to create a new instance of a class. It calls the constructor function of the class, creates a new object, and returns that object with all properties and methods defined in the class. Without `new` the constructor function would not execute properly.

6. In the following class definition, what is the purpose of the constructor function?

class Person {

constructor(name, age) {

    this.name = name;

    this.age = age;

}
}

- It initializes properties when creating a new instance of the class.

7. In the following code, what does `this.name` reference inside the `greet` method?

class Person {

constructor(name, age) {

    this.name = name;

    this.age = age;

}
greet() {

      console.log("Hello, my name is " + this.mame);

}

}

- The name property of the current Person instance.

# Session [2026-7-11] [if Statements]:

### Reference Data:

### Lesson Review (if Statements):

1. What is the syntax for creating a basic if statement in JavaScript?
   Write the keyword 'if' followed by parentheses containing the condition to check, then curly brackets containing the code to run if the condition is true. For example:

if (age >= 18) {

console.log("You can vote");

}

2. How does an if-else statement work in JavaScript when the condition evaluates to false?
   When the condition in an if statement evaluates to false, the code inside the if block is skipped entirely, and the code inside the else block is executed instead. The else keyword is placed directly after the closing bracket of the if statement, followed by curly brakets containing the alternative code to run.
3. Waht are the six falsy values in JavaScript that evaluate to false in conditional statements?
   The six falsy values in JavaScript are: 0 (zero), empty string (""), null, undefined, NaN (not a number), and false itself. All other values are considered truthy and will evaluate to true in a boolean context.
4. What are guard clauses and how do they help avoid nested if statements?
   Guard clauses are early returns from a function that check for invalid conditions first and exit immediately if they're met. Instead of nesting if statements, you check the opposite condition first and return early, allowing the rest of the code to execute without nesting. for example:

if (weather !== "sunny") {

console.log("Not a sunny day");

return;

}

// Continue with code knowing weather is sunny

5. How does an else-if statement work in JavaScript, and what happens when the first condition is false?
   An else-if statement is created by writing 'else if' after an if statement's closing bracket, followed by parentheses with a new condition to check. When the first condition is false, JavaScript moves to check the else-if condition. If that's true, it runs that block's code and skips to the end. If it's also false, if continues to the next else-if or else statement. Only one block of code will ever run in an if-else-if chain.
6. What is the difference between using `&&` (AND) and `||A` (OR) operators in an if satatement condition?
   AND requires all conditions to be true, OR requires at least one condition to be true.

# Session [2026-7-11] [Ternary Operator]:

### Reference Data:

### Lesson Review (Ternary Operator):

1. What are three components that make up a tenary operator in JavaScript?
   A tenray operator consists of:

1) A condition/check that evalueates to true or false
2) A question mark (?) symbol
3) A colon (:) symbol
   The syntax is: `condition ? valueIfTrue : valueIfFalse`

2. In a ternary operator, what value is returned when the condition evaluates to true versus false?
   When the conditon evaluates to true, the ternary operator returns the value immediately after the question mark (?). When the condition evaluates to false, it returns the value after the colon (:).
3. Why is chaining ternary operators generally discouraged?
   Chaining ternary operators makes code difficult to read and maintian. When multiple ternary operators are nested within each other, the code becomes messy and hard to understand. It's better to use a standard if-else-if statement for complex conditions.
4. What is the recommended use case for ternary operators?
   Ternary operators are best used when you have a simple condiiton with two outputs and you're using that output to assign a variable. They work well for straightforward expressions with simple values being assigned to a specicfic variable.
5. Conver the following if-else statement to a ternary operator:

let weather;

if (temperature > 75) {

weather = "hot";

} else {

weather = "not hot";
}

`const weather = temperature > 75 ? "hot" : "not hot"`

# Session [2026-7-11] [Switch Statement]:

### Reference Data:

### Lesson Review (Switch Statement):

1. What is the basic syntax structure of a switch statement in JavaScript?
   A switch statement uses the `switch` keyword followed by a variable in parentheses, then curly braces containing the cases. Each case uses the `case` keyword followed by a value and a colon, then code to execute, and ends witha break statement. A `default` case can be added as a fallback.
2. What happens if you forget to inclde a `break` statement at the end of a case in a switch statement?
   Without a `break` statement, the code will "fall through" to the next case and continue executing code until it reaches a `break` keyword or the end of the switch statement. This causes multiple cases to run together, which is usually unintended behavior.
3. When should you use a switch statement instead of an if-else statement?
   Switch statements are better when checking one variable against multiple values, when you have lots of different conditions to check, and when all conditions use strict equality. If-else statements are better for more complex conditions, comparing different variables, or when you only have one or two checks.
4. Why might you need to wrap code inside curly braces within a switch case, and what prolem does this solve?
   Switch statements don't automatically create separate scopes for each case. All cases share the same scope, which can cause errors if you try to declare variables with the same name in different cases. Wrapping case code in curly braces creates separate scopes for each case, preventing variable conflicts.
5. What type of equality comparison does a switch statement use, and can it perform type coercion?
   Switch statements use strict equality (===) to compare values. The do not perform automatic type coercion, so the value being compared must match both the value and the type of the case.
6. What keyword is used to define each condition in a switch statement?
   case

# Session [2026-7-12] [For Loops]:

## Aha Momemnt:

- In my Lab I used the condition `if (systemNodes[i] >= "Camera")` (Which was incorrect).
- In JavaScript, when you compare strings using `>=` or `<=`, the engine compares them alphabetically based on their Unicode values.

1. "Battery" vs "Camera": "B" comes before "C".
2. "Camera" vs "Camera": They are equal.
3. "LIDAR" vs "Camera": "L" comes after "C".

- Because of how this works, my current logic will trigger the [WARNING] for Camera, LIDAR, and Memeory (since they all come after "B" or are "C" or later). That's not what I wantfor a system health check!

**Correction:**
Why this is better for a System Admin:

- `===` (Strict Equality): As a engineer, I want to be precise. I don't want to accidentally trigger an alert because a node name happens to come after "Camera" in the alphabet. You want to trigger it because the specific node i'm checking has a problem.
- The Break: I used `break` perfectly. Once I hit the "Battery" fault, there is no need to keep checking the rest of the system; I've found the critical issue.

**Logic Challenge:**

- If I wanted to keep checking the rest of the system even if the Battery was low, I could replace `break` with `continue`. The loop would skip the "Battery" status log, jump back to the top, amd continue checking the other nodes. Ina a real robot, I might want that-to see if the LIDAR is also failing, even if the battery is dying.

### Reference Data:

### Lesson Review (For Loops):

1. What are the three parts that must be defined inside the parentheses of a for loop in JavaScript?
   The three parts are:

1) The intialization of the variable to loop over (e.g., let i = 0)
2) The condition that checks wheather to continue the loop (e.g., i < 5)
3) The update statement that modifies the variable after each iteration (e.g., i++).

2. What is the difference between the `break` and `continue` keywords when used inside a for loop?
   `break` immediately exits the entire for loop and stops all further iterations. `continue` skips only the current iteration and moves on to the next iteration, continuing the loop execution.
3. What is the syntax for a `for...of` loop in JavaScript, and what type of data structure does it iterate over?
   const fruit = ['apple', 'banana', 'orange'];
   The syntax is `for (const variable of array)`. For example: `for (const fruit of fruits)`. It iterates over arrays and provides direct access to each element's value, rather than its index.
4. What is the difference between `i++` and `i += 2` when used in a for loop's update statement?
   `i++` increments the variable by 1 each iteration (equivalent to i = i + 1), while `i += 2` increments the variable by 2 each iteration (equivalent to i = i + 2), allowing you to skip every other number.
5. When using a `for...in` loop an object in JavaScript, what does the loop variable represent?

const person = {
name: 'John',
age: 30,
city: 'NYC'

};
for (const key in person) {

console.log(key);

}
The loop variable represents the keys (property names) of the object, not the values. In this example, it would output the strings 'name', 'age', and 'city'. To access the values, you would use `person[key]`.

6. What is the most common syntax for looping through an array using a standard for loop?
   `for (let i = 0; i < array.lenght; i++) {//code}`
7. What is an off-by-one error in the context of for loops?
   When a loop accidentally runs one too many times or stops one iteration too early.

# Session [2026-7-12] [While Loop]:

### Reference Data:

### Lesson Review (While Loop):

1. What is the key difference between a for loop and a while loop in terms of when you should use each?
   A for loop is best used when you know exactly how many times you need to iterate, while a while loop is best used when you don't know how many iterations will be needed. While loops run until a condition because false, making them ideal for scenarios like processing user input until a specific command is entered or traversing nested data structures of unknown depth.
2. What are the three main components of a while loop and where are they positioned compared to a for loop?

The three components are:

1. initialization - placed before the while loop
2. codition check - placed inside the parentheses of the while statement
3. updater - placed at the end of the loop body. In a for loop, all three components are contained in the parentheses, but in a while loop they are separated.

3) Given the following while loop, what potential problem exists?

let i = 0;

while (i < 5) {
console.log(i);
}

The code creates an infinite loop becase variable i is never updated using the loop body. Since i starts at 0 and is always less than 5, the condition will always be true and the loop will never terminate. To fix this, you need to increment i (e.g., i++) at the end of the loop body.

4. What is the key difference between a while loop and a do-while loop?
   A do-while loop always executes the code in the loop body at least once before checking the condition, because the condition check happens at the end of the loop. In contrast, a regular while loop checks the condition first before executing any code, so if the conditon is false intially, the loop body never executes.
5. If you have the following code, what will be printed and why?

let i = 10;

do {

console.log("In loop");

i++;

} while (i < 5);

This code will print "In loop" exactly once. Even though the condition (i < 5) is false from the start since i equals 10, the do-while loop executes the loop body first before checking the condition. After first iteration, the condition is checked and found to be false, so the loop terminates.

6. Consider the following code:

let i = 10;

while (i < 5) {

console.log("In loop")

i++;

}
It will print nothing because the condition is false from the start.

# Session [2026-7-12] [Recursion]:

## Aha! Moment: [Recursion Lab]

- The Base Case `(if (n < 0) ): I created a safety net. Even if someone passes -5 into my funciton, my code handles it gracefully and returns immediately.
- The recursive step (`countdown(n - 1) ): I correctly identified that to "shrink" the problem, I need to call the function again witha small value.
- The Execution Order: I printed `n` before the recursive call, which is exactly how a countdwon should look.

## The Architect's View:

- I I ran this code, the "stack" (the memory the computer uses to keep track of these calls) would look like this:

* `countdown(1)` called.
  - Prints `1`.
  - `countdown(0)` called.
    - Prints `0`.
    - `countdown(-1)` called.
      - `-1` is less than `0`, so it hits my return and stops.

- If I wanted "Blastoff!" message, I would place `console.log("Blastoff!")` inside the base case.
  - The return: By placing `return` right after the "Blastoff!" print, I ensure the recursion ends immediately.
  - The Logic flow: Now, the function handles the entire countdown life cycle from start to finish.

### Reference Data:

### Lesson Review (Recursion):

1. What are the two main parts that every recursive function must have?
   A recursive function must have a base case (a condition that stops the recursion) and a recursive part (where the function calls itself). The base case prevents infinite loops, while the recursive part performs the reapeated operation.
2. What error will if a recursive funciton is missing its base case or never reaches it?
   The code will throw a "rage error: maximum call stack size exceeded" or similar error. This happens because the function calls itself infinitely, which is the recursive equivalent of an inifinite loop.
3. In this recursive countdown function, why does "after" get logged three times at the end?

function countdown(number) {

console.log(number);

console.log("before");

if (number <= 0)

return;

contdown(number- - 1);

console.log("after:);

}

countdown(3);

"after" gets logged three times because each recursive call creates a new function execution that must complete. When the base case is reached (0), the function returns and goes back through each nexted call, executing the remaining code ("after") for countdown(0), countdown(1), and countdown(2) in reverse order. 4. What type of data structures or problems are particularly well-suited for recursive soulutions?
Recursion is particularly useful fo rtree-liek structures and nested data. Examples include file systems with folders containing subfolders, or nested arrays. These problems involve data where you need to traverse through multiple levels of nesting. 5. How can you check if a value is an array in JavaScript when working with potential nested arrays?
You can use the `Array.isArray()` function, passing in the object you eant to check. It returns true if the value is an array, and false if it is not. This is useful in recursive functions that need to handle both arrays and individual values differently.

# Session [2026-7-12] [Short Circuit Evaluation]:

### Reference Data:

### Lesson Review (Short Circuit Evaluation):

1. What is short circuit evaluation in JavaScript and how does it work with the AND operator when the first operand is false?
Short circuit evaluation is when JavaScript stops evaluating a logincal expression once it knows the final result. Wih the AND operator, if the first perand is false, JavaScript skips evaluating the second perand etirely because false AND anything will always be false. It returns false immediately without checking what comes after.
2. How does short circit evaluation work with the OR operator when the first operand is true?
When using the OR operator, if the first operand is true, JavaScript skips evaluating the second operand because true OR anything will always be true. JavaScript returns true immediately without executing or checking the second value.
3. What value is returned when short circuit evaluation occurs in logical operations? For exmple, what does `true && 'hello'` return?
Shor circuit evaluation reurns the value at the point where JavaScript stops checking. For `true && 'hello'`, it returns 'hello' because JavaScript needs to check the second value (since true AND something could be true or false), so it returns that second value. For `false && 'hello'`, it would return false because JavaScript stops at the first operand.
4. What is the nullish coalescing operator (??) and how does it differ from the OR operator (||) when providing default values?
The nullish coalescing operator (??) only check for null or undefined values, not all falsy values. Ulike the OR operator which treats all falsy values (0, empty string, false, null, undefined) as triggers for the fallback, `??` only uses the fallback value when the first operand is specifically null or undefined. For example, `0 ?? 5000` returns 0, while `0 || 500` returns 5000.
5. What is optional chaining in JavaScript and how does it simplify accessing nested object properties? Provide an example.
Optional chaining uses `?.` syntax fo safely access deeply nested properties without having to manually check if each level exists. For example, `user?.profile?.settings?.theme` will return the theme value if all properties exist, or undefined if any property in the chain doesn't exist. This is much simpler than writing `user && user.profile && user.profile.settings && user.profile.settings.theme`. It can also be used with methods like `user.notify?.()` to check if a method exists before calling it.
6. Given the code 

const timeout = 0; 
const timeout1 = timeout ?? 5000;

What will be the value of timeout?

- 0, because nullish coalescing only checks for null or undefined.

# Session [] []:

## The "Why" ():

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review ():

# Session [] []:

## The "Why" ():

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review ():

# Session [] []:

## The "Why" ():

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review ():

# Session [] []:

## The "Why" ():

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review ():

# Session [] []:

## The "Why" ():

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review ():
