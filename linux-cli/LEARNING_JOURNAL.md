Markdown

# Linux CLI Learning Journal

## [2026-06-2025] Session: Core Foundations

**Topics:** Linux vs Unix, Kernel vs Distros, VMs vs Emulation.
**Key Takeaways:**

- The Linux Kernel handles memory/scheduling; distros add the "packageing."
- Virtualization (VMs) runs on the same instruction set; Emulation fakes different hardware.

Lesson Review:

## [2026-06-25] Session: CLI Streams & Redirection

**Topics:** >, >>, <, 1>, 2> /dev/null.
**Relection:**

- The pipe operator (|) is the "bridge" between programs
- Using `grep` with pipes is how I will triage log files in the real world.
- When using angle brackets (>), (>>) to redirect output to a file a single angle bracket replaces the entire contents of the file with new content and the double bracket appends the output to the end of the file without removing existing content.
- Example: echo "text" >> file.txt with add "text to the end rather than replace it.
- Using 2> followed by the file name will redirect any error message to .txt file. Opposed to 1> which refers to standard output.
- You can ridirect both standard output and stardard error to the same file like 1> file.txt 2> file.txt
- The purpose of /dev/null is it acts as a black hole for data if redirected to it then it's discarded and not saved. (used to surpress outputs or errors).
- Example: ls 2> /dev/null will hide any error messages, or command > /dev/null will suppress standard output.
- Angle bracket (<) reads from a file and feeds it into standard in.
- In the grep command `'text' < input.txt > output.txxt 2> /dev/null` Standard input is fread from `input.txt (via <)`, standard output is redirected to `output.txt (via >)`, and standard error is redirected to `/dev/null (via 2>)` effectively ignoring any errors.

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

5. In the command `grep "text" < input.txt > output.txt 2> /dev/null`, what happens to each stream?
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
- User Control: Ctrl+C (SIGINT) is for your manual interrupts; Ctrl+D (SIGQUIT) is for a more forceful session shutdown.
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

- Source of Truth: always create the repo on GitHub first to establish the remote origin.
- The "Snapshot" Loop: Every set of changes must be added and committed before it can be pushed.
- Authentication: GitHub uses Personal Access Tokens (PAT) INSTEAD OF PASSWORDS. If you get a 403 error, your token may have expired or you need to refresh you remote origin URL.

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

## [2026-6-28] Session: Creating & Moving Files

**Topics:** rm, cp, rm -rf
**Key Takeaways:**

- Using the rm command removes a file.
- Using -rf flag with the rm command is dangerous could delete your whole computer.
- -r flag meand recursive delete and allows you to delete directories. -f flag meand force which prevents the system from prompting for confirmantion before deleting each file.
- cp (copy) creates a duplicate file or directory while keeping the other.
- mv (move) relocates/rename the file or directory moving it from original location. (primary purpose is to rename files & directories).

## Reference Data:

Lesson Review (Creating & Moving Files):

1. What does the touch command do when used on a file that doesn't exist?
   The touch command creates a new empty file if the file doesn't exist.

2. What happens when you run the touch command on a file that already exists?

3. When used on an existing file, touch updates the file's last modified time without changing the file's contents.

4. Why is the rm command considered dangerous, and what should you be aware of when using it?
   The rm command is dangerous because it permanently deletes files and directories with no way to recover them. Unlike moving files to a recycle bin, files removed with rm are legitimately gone and cannot be recovered. Using incorrect flags like rm -rf \* or rm -rf / can delete the entire system.

5. What do the -r and -f flags mean when used with the rm command?
   The -r flag stands for recursive delete and allows you to delete directories and their contents. The -f flag stands for force and prevents the system from prompting for confirmation before deleting each file.

6. What is the difference between cp and mv commands in Linux?
   cp (copy) creates a duplicate of a file or directory while keeping the original, whereas mv (move) relocates or renames a file or directory, removing it from its original location.

7. What does the cp -R command do?
   It recursively copies directories and their contents

8. What is the primary purpose of the mv command?
   To move or rename files and directories

Reflection:

## [2026-6-28] Session: Wildcards & Replacement

**Topics:** `*`, `?`, {1,2,3,4,5}, {1..5}, {1..100..10}
**Key Takeaways:**

-

## Reference Data:

Lesson Review (Wildcards & Replacements):

1. What does the curly brace syntax `{1,2,3,4}` do in a bash command like `touch file{1,2,3,4}.txt`?
   The curly brace syntax performs expansion, creating multiple variations of the command. In this example, it expands to create file1.txt, file2.txt, file3.txt, and file4.txt. Bash expands this before passing it to the command, so the program receives the full list of filenames.

2. What is the difference between the `*` wildcard and the `?` wildcard in bash?
   The _ wildcard matches zero or more characters, while the ? wildcard matches exactly one character. For example, `file_.txt`will match`'file.txt', 'file1.txt'`, and `'file10.txt'`, but `file?.txt`will only match filenames with exactly one character between`'file'`and`'.txt'`, like `'file1.txt'`but not`'file.txt'`or`'file10.txt'`.

3. How can you create files numbered 1 through 30 using bash expansion syntax?
   You can use the range syntax with two dots: touch file{1..30}.txt. This will create file1.txt through file30.txt. The double dot syntax works for numeric ranges and can also be used with letters.

4. What does the syntax `{1..100..10}` do in bash expansion?
   It creates a range from 1 to 100, incrementing by 10 each time. This produces: 1, 11, 21, 31, 41, 51, 61, 71, 81, 91. The third number specifies the step increment for the range.

5. How do you create a filename that contains a space character in bash?
   You escape the space character with a backslash: touch file\ name. The backslash tells bash to treat the next character literally rather than as a special character, allowing the space to be part of the filename.

6. What does the expansion `{1..10}` generate?
   The numbers 1 through 10.

Reflection:

## [2026-6-28] Session: Pipes

**Topics:** Pipes Usage
**Key Takeaways:**

- (|) is used to create a pipe that connects output of on program to input of another.
- `grep` is frequently used with `|` pipes; it takes a list of text and find specific items in it. (usefull for thoughts of lines of output).
- The command `ps aux | grep "node"` takes long output from all running processes and feeds it into grep to filter only processes matchin "node".
- The grep process detects itself in the process list because the search string appears in its own command.

Reflection:

Using pipes and grep along with ps aux helps sort through long outputs when searching for something specific. Both `grep` & `|` commands are frequently used with eachother to find specific items within a pipe. I will use these whenever I need to find something specific in a full output that an be timely to sort through manually.

## [2026-6-28] Session: Priciples of Least Power

**Topscs:**
**Key Takeaways:**

-
-
-
-

Reflection:

### 1. The "Triage & Rescue" Lab (Simulation)

This lab simulates the exact work of an autonomous vehicle support specialist: finding a specific error in a large file and documenting it.

- **The Setup:** Create a folder called `log_simulation`. Inside it, create 5 dummy log files (e.g., `system_1.log`, `system_2.log`, etc.).
- **The Task:** Use `cat` or `grep` to search through those files to find a specific string (e.g., "ERROR: Connection Lost").
- **The Documentation:** Once you find the error, use `nano` or `vim` to create a new file named `incident_report.txt`. In that file, log the filename where the error was found, the time (you can make this up), and a brief description of how you found it.
- **Why this works:** It forces you to use `grep`, file navigation, and documentation—the three pillars of the role you applied for.

### Answer:

ERROR Files:

system_3.log:2:ERROR: Critical failure in memory allocation
system_5.log:2:ERROR: Connection timeout on port 8080
system_5.log:3:ERROR: Database authentication failed

Time: 7:20pm

Description:

I found these errors by running the `grep -ni "error" system_*` command and obtained the file errors and also the line number.

## CLI Triage Patterns:

### Pattern: Log Searching

- Use grep -ni <pattern> <files> as the default search.
- -n provides the location (line number) for fast navigation.
- -i prevents missed hits due to case mismatch.
- Use wildcards (`*`) to search across multiple logs in one command.

### Pattern: Delete Lines Matching Phrase

- Use `sed -i `/YOUR_MESSAGE_HERE/d' filename.txt
- -i modifies you file in-place (saves the changes automatically).
- `/YOUR_MESSAGE_HERE/' : search for the text you want to remove.
- d: Deletes the matching line.

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

### Answer:

ubuntu@first-skink:~/log_simulation$ ls -l | grep "log"
-rw-rw-r-- 1 ubuntu ubuntu 26 Jun 25 23:33 system_1.log
-rw-rw-r-- 1 ubuntu ubuntu 26 Jun 25 23:33 system_2.log
-rw-rw-r-- 1 ubuntu ubuntu 71 Jun 25 23:35 system_3.log
-rw-rw-r-- 1 ubuntu ubuntu 26 Jun 25 23:34 system_4.log
-rw-rw-r-- 1 ubuntu ubuntu 103 Jun 25 23:37 system_5.log
ubuntu@first-skink:~/log_simulation$ history | grep "ssh"
56 history | grep "ssh"

### Architect's Decision Log:

- **Date:** 2026-06-25 7:20pm
- **Task:** Triage & Rescue
- **Outcome:** Successfully identified "ERRORS" with time and line number when `grep -ni "error" system_*` was applied. Resolved by updating vim with those said errors, files they were in, time and line numbers.
- **Reflection:** This confirmed how system folders containing errors in their files can fail.

- **Date:** 2026-06-25
- **Task:** Permission Lockdown Lab
- **Outcome:** Successfully identified "Permission denied" error when `chmod 000` was applied. Resolved by restoring read permissions.
- **Reflection:** This confirmed how system services might fail if they lack access to critical configuration files.

- **Date:**
- **Task:**
- **Outcome:**
- **Reflection:**
