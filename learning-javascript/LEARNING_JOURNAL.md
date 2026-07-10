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

## The "Why" (The Concept):

- **Core Logic:**
-

- **Aha! Moment:**

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

## The "Why" (The Concept):

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

- **Aha! Moment:**

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

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

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

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

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

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

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

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

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

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

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

## The "Why" ():

- **Core Logic:**

- **Aha! Moment:**

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

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

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

6. In the follwing class definition, what is the purpose of the constructor function?

class Person {

constructor(name, age) {

    this.name = name;

    this.age = age;

}
}

It initializes properties when creating a new instance of the class.

7. In the following code, what does `this.mame` reference inside the `geet` method?

class Person {

constructor(name, age) {

    this.name = name;

    this.age = age;

}
greet() {

    console.log("Hello, my name is " + this.mame);

}

}

# Session [] []:

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review ():

# Session [] []:

## The "Why" ():

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review (Hoisting):

# Session [] []:

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review ():

# Session [] []:

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review ():

# Session [] []:

## The "Why" ():

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review (Hoisting):
