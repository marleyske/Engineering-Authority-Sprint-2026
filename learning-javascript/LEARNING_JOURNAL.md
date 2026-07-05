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
- Hoisting is a JavaScript behavior where function declarations are moved to the top of their scope during compilation. This allows you to use functions before they;re defined in your code.
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

### Lesson Review (Hoisting):

# Session [2026-7-3] []:

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review (Hoisting):

# Session [2026-7-3] []:

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review (Hoisting):

# Session [2026-7-3] []:

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review (Hoisting):

# Session [2026-7-3] []:

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review (Hoisting):

# Session [2026-7-3] []:

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review (Hoisting):

# Session [2026-7-3] []:

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review (Hoisting):

# Session [2026-7-3] []:

## The "Why" (The Concept):

- **Core Logic:**

- **Aha! Moment:**

### Reference Data:

### Lesson Review (Hoisting):
