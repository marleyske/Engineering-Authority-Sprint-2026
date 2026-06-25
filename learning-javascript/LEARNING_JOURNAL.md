# Session [2] [Title of Lesson]:

### The "Why" (The Concept):
- **Core Logic:**
- Explain the concept in one sentence (e.g., "A callback allows the machine to hand off data to a helper, making the machine reusable").
- **"Aha!" Moment:** 
- What made the concept finally click? (e.g., "Realizing the machine doesn't need to know how the data is displayed").

### The Mental Model (Architectural Visualization):
- **The Anology:** (e,g., "The Kitchen vs. The Waiter" or "The Pipe vs. The Filter").
- **Data Flow Sketch:** 
- Input -> Machine -> (Hand-off) -> Callback -> Output.

### The "Gotcha" (Debugging/Struggles):
- **The Mistake:**
- Briefly explain what you did wrong (e.g., I tried to call the machine inside the callback, which caused an infinite loop).

- **The Fix:** How you solved it?

- Inside my showResult function I was calling addTen again. showResult should only be responsible for showing the resultm not for running the addTen machine again.

- **The Architectural" Lesson:** 
- What this taught you about writing cleaner code.

### Code "Laboratory" (The Best Snippet):
-**Paste your final working version of the concept here. (Only the clean code).

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
- How does this relate to your Linux studies (e.g., This reminds me of how | pipes data from one command to the next.)?

### Summary of Concept:
- callbacks aren't just a syntax rule; they are a strategy to keep your logic clean so your code doesn't become one big, messy, unmanageable file.
