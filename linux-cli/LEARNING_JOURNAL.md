Markdown

# Linux CLI Learning Journal

## [2026-06-2025] Session: Core Foundations

**Topics:** Linux vs Unix, Kernel vs Distros, VMs vs Emulation.
**Key Takeaways:**

- The Linux Kernel handles memory/scheduling; distros add the "packageing."
- Virtualization (VMs) runs on the same instruction set; Emulation fakes different hardware.

Lesson Review:

## [2026-06-25] Session: CLI Streams & Redirection

**Topics:** >, >>, |, 1>, 2> /dev/null.
**Relection:**

- The pipe operator (|) is the "bridge" between programs
- Using `grep` with pipes is how I will triage log files in the real world.

Reference Data:

## Lesson Review (Streams & Redirection):

### Lesson Review (Output Streams)

1. What does the > operator do when used with a command in Unix/Linux?
   The > operator redirects the standard output stream to a file. For example, echo "text" > file.txt will write "text" to file.txt, replacing any existing content. It can be prefixed with 1 (e.g., 1>) to explicitly specify standard out, though this is the default behavior.

2. What is the difference between using > and >> when redirecting output to a file?
   A single > replaces the entire contents of the file with the new output, while >> appends the output to the end of the file without removing existing content. For example, echo "text" >> file.txt will add "text" to the end of file.txt rather than replacing its contents.

3. How do you redirect standard error to a file in Unix/Linux?
   Use 2> followed by the filename. For example, cat non-existent-file.txt 2> error.txt will redirect any error messages to error.txt. The number 2 specifically refers to the standard error stream, as opposed to 1 which refers to standard output.

4. How can you redirect both standard output and standard error to the same file?
   You can either omit the stream number and use > file.txt, or explicitly specify both streams like 1> file.txt 2> file.txt. The simpler approach of just using > without a number will redirect both streams to the same destination.

5. What is the purpose of /dev/null in Unix/Linux?
   /dev/null is a special file that acts as a black hole for data. Anything redirected to it is discarded and not saved. It's commonly used when you want to suppress output or errors, for example: ls 2> /dev/null will hide any error messages, or command > /dev/null will suppress standard output.

6. What happens when you use double angle brackets (>>) for redirection?
   It appends to the file

7. Which number represents standard error when redirecting streams?
   2

8. What does the command cat file.txt > output.txt accomplish?
   It redirect file content to output.txt

### Lesson Review (Input Streams)

1. What is the purpose of the input redirection operator (<) in Unix/Linux shells?
   The input redirection operator (<) reads content from a file and feeds it into a program's standard input (stdin). For example, 'cat < file.txt' reads from file.txt and passes it as input to the cat command.

2. What happens when you use the pipe operator (|) with grep in the following command:
   cat ls.txt | grep "ls error.txt"
   The pipe operator takes the standard output from cat (which reads ls.txt) and feeds it as standard input to grep. Grep then searches through that input for lines containing "ls error.txt" and outputs any matches.

3. Why does grep remove color formatting when output is piped to another command?
   Grep is smart enough to detect when output is being piped to another program and removes colorization to make the text easier for machines to parse. Colors are added only for human benefit
   when output goes directly to the terminal.

4. What is the difference between using '1>' and '2>' in output redirection?
   '1>' redirects standard output (stdout) to a file, while '2>' redirects standard error (stderr) to a file. The numbers refer to file descriptors: 1 for standard output and 2 for standard error.

5. In the command 'grep "text" < input.txt > output.txt 2> /dev/null', what happens to each stream?
   Standard input is read from input.txt (via <), standard output is redirected to output.txt (via >), and standard error is redirected to /dev/null (via 2>), effectively ignoring any errors.

6. What does the angle bracket < do in a command?
   It reads from a file and feeds it into standard in

7. What happens when you use grep with a pipe redirection in terms of output formatting?
   It removes colors to make parsing easier for the machines.

8. What does the character '1' before a redirection operator (1>) signify?
   It redirects standard out

9. In the command grep 'text' < input.txt > output.txt 2> /dev/null, what is the order requirement for the redirection operators?
   The order doesn’t matter

10. What does the character '2' before a redirection operator (2>) represent?
    It redirects standard errors.

## [2026-06-25] Session: CLI Process Signals

**Topics:** Signal-based process control and termination.
**Key Takeaways:**

- Graceful vs Forced: Use SIGTERM (default) to ask a process to clean up; use SIGKILL (9) only when a process is unresponsive
- User Control: Ctrl+C (SIGINT) is for your manuall interrupts; Ctrl+D (SIGQUIT) is for a more forceful session shutdown.
- OS Lifecycle: The OS sends SIGTERM automatically durign shutdowns to protect data integrity.

Real-World Application: In an AV (Autonomous Vehicle) fleet, I should never use SIGKILL unless a process has frozen completely. Using SIGTERM ensures the system saves its logs and closes connections, which is critical for debugging why the vehicle stopped.

Reference Data:

## Lesson Review (Signals):

1. What is a signal in bash?
   A signal is a construct in bash that allows you to send a program a message to do something. It communicates intent to the program (like asking it to end early), but doesn't force the program to do anything - it's up to the program to handle the signal and respond appropriately.

2. What is SIGINT and how is it triggered
   SIGINT (signal interrupt) is a signal that tells a program to please interrupt or stop running. It is triggered by pressing Ctrl+C. Programs like tail -f use this signal to stop execution when the user wants to end the process.

3. What is the difference between SIGINT and SIGQUIT?
   SIGINT is a less powerful signal that asks a program to stop what it's doing (triggered by Ctrl+C). SIGQUIT is a stronger signal that shuts down the entire program (triggered by Ctrl+D). SIGQUIT is more forceful and will end the entire terminal session if sent to the shell itself.

4. What is SIGTERM and when is it typically used?
   SIGTERM (terminate) is a signal sent by the operating system when the computer is shutting down. It tells all running programs that the system is shutting down and gives them time to clean up their operations, shut down gracefully, write out files, and clear logs before the system fully shuts down.

5. What is SIGKILL and how does it differ from other termination signals?
   SIGKILL is an immediate program termination signal that kills a process without allowing it to clean up. Unlike SIGTERM, SIGQUIT, and SIGINT which allow programs to wrap things up, write files, clear logs, or send data to servers, SIGKILL shuts down the process immediately with no cleanup opportunity.

6. What is the purpose of the tail -f command?
   It watches a file and displays new content as it’s added.

7. Which signal number corresponds to SIGKILL?
   9

8. What is the key difference between SIGKILL and SIGTERM?
   SIGKILL immediately terminates without cleanup; SIGTERM allows cleanup.

## [2026-06-25] Session: VIM Usage

**Topics:** VIM Controls and Usage.
**Key Takeaways:**

- Mode Awareness: i for Inser(typing), Esc to retun to Command mode (navigating/deleting).
- Write/Save or Delete: In VIM you can write (save) commands with :w and save and quit in one action with :wq.
- Movement & Deletion: Use dd to delete a line instantly (faster than :d). Use v to enter Visual Mode to highlight specific text blocks, then press d to delete that highlighted section. For multiple like, 100 :d100.
- Quitting and Visual Mode: To quit vim I press the escape button & q! and to go in visual mode I use v.

Real-World Application: Vim is my primary IDE for Linux system admistration. It is critcal for editing configuration files directly on a server, wher GUI-based editors (like VS Code) aren't available. Mastering these keybindings ensures I can troubleshoot system logs and configs with maximum speed during incident response.

## Reference Data:

Lesson Review (VIM a Brief History):

1. What is the historical relationship between ed and qed?
   ed was based on an older project called qed. ed was developed by Ken Thompson at Bell Labs in 1969 and was a line-oriented editor.

2. Why were line editors like ed designed to operate one line at a time?
   Line editors were designed this way because memory was very precious at the time, and they couldn't keep entire text files in memory. Additionally, output was frequently printed, so they wanted to process one line at a time because screen space was precious. This was during a time when bits (not kilobytes or megabytes) were the unit of concern.

3. What was the original relationship between vi and ex?
   vi started as visual mode for the ex editor. It was a screen-oriented version of ex that still used ex under the hood, but provided a more visual representation. Initially, vi was just a mode within ex, not a separate editor.

4. What does the acronym 'Vim' originally stand for, and how did its meaning change?
   Vim originally stood for 'Vi IMitation' when it was first created as a vi clone. It was later renamed to mean 'Vi IMproved' instead.

5. Who created Vim and for what platform was it originally developed?
   Bram Moolenaar created Vim by porting a vi clone (originally made by Tim Thompson for the Atari ST) to the Amiga. Vim was designed as a set of quality of life improvements on the original vi.

6. What does 'vi' stand for in the text editor's name?
   Visual mode

7. What command can you use in 'ex' to switch to visual mode?
   :visual

Lesson Review (VIM Basic Commands):

1. What is the command to quit vim?
   The command to quit vim is :q. To force quit without saving changes, use :q!

2. What are the two primary modes in vim that are essential to understand?
   The two primary modes are command mode (the default mode where you can run commands) and insert mode (where you can type and edit text). You can press Escape to return to command mode and press 'i' to enter insert mode.

3. In vim, what command deletes the current line you're on?
   The command :d deletes the current line. You can also use variations like d100 to delete the next 100 lines.

4. What is the command to save a file in vim?
   The command to save (write) a file in vim is :w

5. What is the command to save and quit vim in one action?
   The command :wq both saves (writes) the file and quits vim at the same time.

6. What is the primary purpose of pressing Escape in vim?
   To return to command mode

7. In vim command mode, what does :d do?
   Deletes the line you’re on

## [2026-6-25] SOP: Git & Repository Workflow

**Topics:** Version Control, Repository Sync, and Authentication.
**Key Takeaways:**
* Source of Truth: always create the repo on GitHub first to establish the remote origin.
* The "Snapshot" Loop: Every set of changes must be added and committed before it can be pushed.
* Authentication: GitHub uses Personal Access Tokens (PAT) INSTEAD OF PASSWORDS. If you get a 403 error, your token may have expired or you need to refresh you remote origin URL.

Standard Workflow (The Daily "Reps"):

1. Stage changes: git add .

2. Commit changes: git commit -m "feat/docs: [describe your update here]"

3. Push to GitHub: git push -u origin main

Troubleshooting (The "403 Forbidden" Fix):
If git push fails due to authentication:

1. Generate new Classic PAT in GitHub Settings > Developer Settings.

2. Update the remote URL:
git remote set-url origin [https://YOUR_TOKEN@github.com/marleyske/Engineering-Authority-Sprint-2026.git]

3. Retry the push

Reflection:

Documenting the workflow now ensures that I don't lose time on configuration during future lab sessions. I will add this section whenever I encounter a new Git command or error.
### 1. The "Triage & Rescue" Lab (Simulation)

This lab simulates the exact work of an autonomous vehicle support specialist: finding a specific error in a large file and documenting it.

- **The Setup:** Create a folder called `log_simulation`. Inside it, create 5 dummy log files (e.g., `system_1.log`, `system_2.log`, etc.).
- **The Task:** Use `cat` or `grep` to search through those files to find a specific string (e.g., "ERROR: Connection Lost").
- **The Documentation:** Once you find the error, use `nano` or `vim` to create a new file named `incident_report.txt`. In that file, log the filename where the error was found, the time (you can make this up), and a brief description of how you found it.
- **Why this works:** It forces you to use `grep`, file navigation, and documentation—the three pillars of the role you applied for.

### 2. The "Permissions Lockdown" Lab

Support specialists often have to troubleshoot why a system service cannot access a file.

- **The Setup:** Create a file called `sensitive_data.txt`. Use `chmod` to remove all read/write permissions from it (`chmod 000 sensitive_data.txt`).
- **The Task:** Try to read the file using `cat`. It should fail with a "Permission denied" error.
- **The Fix:** Use `chmod` to add read permissions back so you can read it again.
- **The Pro-Move:** Try to change the owner of a file using `chown` (you may need `sudo` for this). Understanding how ownership (`user:group`) and permissions (`rwx`) work together is a fundamental skill for any technical support role.

### 3. Mastering the "Pipe" (`|`)

You are currently studying pipes, which is the ultimate tool for a Support Specialist.

- **The Task:** Combine commands to become more efficient.
- Instead of just listing files with `ls`, try `ls -l | grep "log"`. This command lists all files and _filters_ the output to only show files with "log" in the name.
- Use `history | grep "ssh"` to find every time you have used the SSH command in your bash history.

- **Why this works:** This is exactly how you will "triage" data in a real-world environment. You will be filtering massive amounts of system output to find the _one_ piece of information that matters.

### 4. Professionalizing your "Architect's Decision Log"

Since you are already keeping this log, use it to track these labs!

- Every time you complete one of these mini-labs, add an entry to your `LEARNING_JOURNAL.md`.
- **Format:**
- **Date:** 2026-06-25
- **Task:** Permission Lockdown Lab
- **Outcome:** Successfully identified "Permission denied" error when `chmod 000` was applied. Resolved by restoring read permissions.
- **Reflection:** This confirmed how system services might fail if they lack access to critical configuration files.

**My suggestion for your flow:** Spend 30 minutes a day on one of these "labs" rather than just watching more video content. If you can explain _why_ a command worked (or why it failed) in your journal, you will walk into an interview with the confidence of someone who has actually been "in the trenches."

**Does this "Lab" approach feel like a good way to get those reps in without feeling like you're just staring at a screen?**
