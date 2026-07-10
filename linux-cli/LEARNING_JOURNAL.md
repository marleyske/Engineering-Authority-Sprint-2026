Markdown

# Linux CLI Learning Journal

## [2026-06-2025] Session: Core Foundations

**Topics:** Linux vs Unix, Kernel vs Distros, VMs vs Emulation.
**Key Takeaways:**

- The Linux Kernel handles memory/scheduling; distros add the "packageing."
- Virtualization (VMs) runs on the same instruction set; Emulation fakes different hardware.

Lesson Review:

## [2026-06-25] Session: CLI Streams & Redirection

**Topics:** >, >>, <, 1>, 2>, |, /dev/null.
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
- In the grep command `'text' < input.txt > output.txxt 2> /dev/null` Standard input is freed from `input.txt (via <)`, standard output is redirected to `output.txt (via >)`, and standard error is redirected to `/dev/null (via 2>)` effectively ignoring any errors.

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

### Lesson Review (VIM Basic Commands):

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

### Lesson Review (Creating & Moving Files):

1. What does the touch command do when used on a file that doesn't exist?
   The touch command creates a new empty file if the file doesn't exist.

2. What happens when you run the touch command on a file that already exists?

3. When used on an existing file, touch updates the file's last modified time without changing the file's contents.

4. Why is the rm command considered dangerous, and what should you be aware of when using it?
   The rm command is dangerous because it permanently deletes files and directories with no way to recover them. Unlike moving files to a recycle bin, files removed with rm are legitimately gone and cannot be recovered. Using incorrect flags like `rm -rf *` or `rm -rf /` can delete the entire system.

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

### Lesson Review (Wildcards & Replacements):

1. What does the curly brace syntax `{1,2,3,4}` do in a bash command like `touch file{1,2,3,4}.txt`?
   The curly brace syntax performs expansion, creating multiple variations of the command. In this example, it expands to create file1.txt, file2.txt, file3.txt, and file4.txt. Bash expands this before passing it to the command, so the program receives the full list of filenames.

2. What is the difference between the `*` wildcard and the `?` wildcard in bash?
   The `*` wildcard matches zero or more characters, while the `?` wildcard matches exactly one character. For example, `file_.txt`will match`'file.txt', 'file1.txt'`, and `'file10.txt'`, but `file?.txt`will only match filenames with exactly one character between`'file'`and`'.txt'`, like `'file1.txt'`but not`'file.txt'`or`'file10.txt'`.

3. How can you create files numbered 1 through 30 using bash expansion syntax?
   You can use the range syntax with two dots: `touch file{1..30}.txt`. This will create `file1.txt` through `file30.txt`. The double dot syntax works for numeric ranges and can also be used with letters.

4. What does the syntax `{1..100..10}` do in bash expansion?
   It creates a range from 1 to 100, incrementing by 10 each time. This produces: 1, 11, 21, 31, 41, 51, 61, 71, 81, 91. The third number specifies the step increment for the range.

5. How do you create a filename that contains a space character in bash?
   You escape the space character with a backslash: `touch file\ name`. The backslash tells bash to treat the next character literally rather than as a special character, allowing the space to be part of the filename.

6. What does the expansion `{1..10}` generate?
   The numbers 1 through 10.

Reflection:

## [2026-6-28] Session: Pipes

**Topics:** Pipes Usage
**Key Takeaways:**

- (|) is used to create a pipe that connects output of on program to input of another.
- `grep` is frequently used with `|` pipes; it takes a list of text and find specific items in it. (useful for thoughts of lines of output).
- The command `ps aux | grep "node"` takes long output from all running processes and feeds it into grep to filter only processes matchin "node".
- The grep process detects itself in the process list because the search string appears in its own command.

## Reference Data:

Lesson Review (Pipes):

1. What symbol is used to create a pipe that connects the output of one program to the input of another?
   The vertical bar (|) symbol, located above the Enter key, is used to create a pipe between programs.

2. What does the command ps aux do?
   ps aux outputs all of the currently running processes on the computer.

3. Why is grep frequently used with pipes in command line operations?
   grep is frequently used with pipes because it takes a list of text and finds specific items in it. This is useful when dealing with thousands of lines of output where you need to find specific entries.

4. In the command ps aux | grep "node", what is the purpose of the pipe?
   The pipe takes the long output from ps aux (all running processes) and feeds it into grep to filter and find only the processes matching "node".

5. What is the purpose of the -i flag when used with the rm command?
   The -i flag forces the rm command to ask yes or no questions before removing each file, providing an interactive confirmation for each deletion.

6. What does the ampersand (&) at the end of a command do?
   Runs the process in the background

7. In the command ps aux | grep "yes", why does grep sometimes appear in its own search results?
   The grep process detects itself in the process list because the search string appears in its own command.

Reflection:

Using pipes and grep along with ps aux helps sort through long outputs when searching for something specific. Both `grep` & `|` commands are frequently used with eachother to find specific items within a pipe. I will use these whenever I need to find something specific in a full output that an be timely to sort through manually.

## [2026-6-28] Session: Priciples of Least Power

**Topics:** User Priviledge
**Key Takeaways:**

- The `whoami` command displays the name of the current logged-in user
- `cat /etc/passwd` is the command you use to see all users on a linux system.
- The priciple of least power means giving minimal amount of permission to each user account neccssary to perform required task. The root user has inherant priviledge to perform any operation on the system.
- Root user has inherant priviledge to creat files and directories in the root directory.

## Reference Data:

Lesson Review (Principles of Least Power):

1. What is the purpose of the whoami command in Linux?
   The whoami command displays the name of the currently logged-in user. It identifies which user account you are operating under in the terminal session.

2. What file can you view to see all users on a Linux system, and how do you display it?
   You can view the /etc/passwd file using the command cat /etc/passwd. This file contains a list of all user accounts on the system, including system users and regular users.

3. What does it mean when a user's login shell is set to /bin/false in the /etc/passwd file?
   When a user's login shell is set to /bin/false, it means the user cannot log in interactively. The /bin/false program simply returns false, preventing interactive login while still allowing the user account to exist for other purposes like running services.

4. What is the principle of least power in the context of Linux user accounts?
   The principle of least power means giving each user account only the minimum amount of permissions necessary to perform its required tasks. This limits potential damage from both security breaches and accidental mistakes by restricting what actions unprivileged users can perform.

5. Why is the root user significant in Linux file system permissions?
   The root user has inherent privileges to perform any operation on the system, including creating, modifying, or deleting files in protected directories like the root directory (/). Only root can make changes to system-level directories and files that regular users cannot access.

6. Which user has inherent privileges to create files and directories in the root directory (/)?
   Root

Reflection: The priciple of least power gives each user account only the minimum amout of permission sneccessary to perform required tasks. The root has inherent privileges to create files & directories in the root directory (/). I can use `cat /etc/passwd` to see all users on linux system, and whoami let's me know which user account i'm logged in as at the moment.

## [2026-6-28] Session: Superuser

**Topics:**
**Key Takeaways:**

- `sudo` command temporarily allos a user to switch to the super user to execute a single command with elevated privileges, then returns to their user account.
- `su` command switches you to another user account and `sudo su` switches you to super user (root).
- `sudo useradd [username]` (`su` for root) is the command to create a new user and `sudo passwd [username]` creates them a password.
- Groups allow you to manage mutiple users permmisons instead of having to do them seperately. You can use `usermod -aG` command.
- Example, add user to sudo group: `sudo usermod -aG sudo newtech`

## Reference Data:

Lesson Review (Superuser):

1. What is the purpose of the sudo command in Linux?
   The sudo command allows a user to temporarily switch to the super user (root) to execute a single command with elevated privileges, then immediately return to their normal user account. This provides a safeguard against accidental system damage while still allowing authorized users to perform administrative tasks.
   - Example: `sudo useradd marv`

2. Why is it dangerous to continuously operate as the root user?
   Operating as the root user is dangerous because you have unrestricted access to all system functions and files. This means mistakes can have catastrophic consequences, such as accidentally deleting critical system files. Running as a regular user with sudo privileges provides a safety net that prevents many accidental destructive actions.

3. What command switches you to the root user, and how do you exit that session?
   The command sudo su switches you to the root user, giving you full administrative privileges. To exit the root user session and return to your normal user account, use the exit command.

4. What are the commands to create a new user named 'alice' and set a password for that user?
   To create a new user named 'alice', use sudo useradd alice. To set a password for that user, use sudo passwd alice, which will prompt you to enter and confirm the new password.

5. What is the purpose of groups in Linux user management?
   Groups allow you to manage privileges for multiple users efficiently. Instead of adding permissions individually to each user, you can assign permissions to a group and then add users to that group. All members of the group automatically inherit the group's permissions, making it easier to manage large numbers of users with similar access needs.

6. Which command switches the current user to another user account?
   Su

7. What command is used to add a user to an existing group?
   Usermod -aG

Reflection: Superuser is your root user, you use command `sudo su` to switch to root user. It is insecure to operate as the root user instead using sudo for temporary root access is key. For users to use sudo command you have to assign them to the sudo group using the `sudo usermod -aG sudo [user]` command. You add users with the `useradd -m` command (use -m flag to create home directory), assign their password with `sudo passwd [user]` command and you can alternate/move between users on the linux system by using the `su` command. Lastly, you can switch back from user you used `su` command for by using the `exit` command.

## [2026-6-28] Session: Group Permission

**Topics:** Permissions `chown`, `chmod`
**Key Takeaways:**

- The three groups of permissions represent users (file owner), groups and everyone else.
- `d` in the file permissions means the item is a directory `-` indicates it's a flat file, (text, js or img).
- `chown` command means change ownership which, does just that by using `sudo chown` when not in the root directory you can switch ownership between a file or directory after confirming your password.
- `chmod` changes the rwx (read, write, execute) permissions and the syntax for using chmod is either `chmod u-rwx,g=rwx,o=rww [file]`.

## Reference Data:

Lesson Review (Group Permissions):

1. In Linux file permissions (e.g., rwxrwxrwx), what do the three groups of permissions represent?
   The first group (rwx) represents user permissions for the file owner. The second group (rwx) represents group permissions for anyone in the file's group. The third group (rwx) represents permissions for everyone else who is neither the owner nor in the group.

2. What does the 'd' character mean when it appears as the first character in Linux file permissions?
   The 'd' character indicates that the item is a directory (folder). A dash '-' indicates a normal flat file, such as a text file, JavaScript file, or image.

3. What does the chown command do in Linux?
   chown (change ownership) changes the ownership of a file or directory from one user and group to another. For example, sudo chown ubuntu:ubuntu /hello would change ownership of the /hello directory to the ubuntu user and ubuntu group.

4. If a file has permissions -rw-r--r--, can a user who is neither the owner nor in the file's group write to the file?
   No, they cannot write to the file. The last three characters r-- indicate that other users (those who are neither the owner nor in the group) can only read the file, not write to it or execute it.

5. What is the syntax for using chmod to set specific read, write, and execute permissions for user, group, and other?
   The syntax is chmod u=rwx,g=rwx,o=rwx filename where 'u' stands for user, 'g' stands for group, and 'o' stands for other. You can specify any combination of r (read), w (write), and x (execute) for each category. For example: sudo chmod u=rw,g=rw,o=rw hello.txt

Reflection: When it comes to permissions you have three groups, the users, groups, and everyone else. the `d` stands for directory and `-` stands for flat file, .txt, .js or .img. The command used to change ownership is `chown` this command is key. It is great for switching ownership of a file from one user to another. Lastly, the `chmod` command. This command is a frequent use for me it modifies the permissions I spoke about earlier you can use it to give users on the linux system different read, write and execute permission based on their group.

## [2026-6-28] Session: Permission Shortcuts

**Topics:** chmod, chmod +x, setting file permissions
**Key Takeaways:**

- The three numbers in `chmod 777` represents user permissions, group permissions and everyone else (others).
- The numeric chmod notation values you add for read, write and execute are 4 for read permission, 2 for write permission and 1 for execute permission.
- Use `chmod +x` to add execution permission to all categories.
- Setting file permissions to 777 is insecure because it grants read, write and execute permissions to all categories allowing anyone to do anything to the file.

## Reference Data:

Lesson Review (Permission Shortcuts):

1. What do the three numbers in chmod 777 represent?
   The first number represents user permissions, the second number represents group permissions, and the third number represents permissions for others (everyone else).

2. In the numeric chmod notation, what values do you add for read, write, and execute permissions?
   Add 4 for read permissions, 2 for write permissions, and 1 for execute permissions. These values are combined to create the permission number (e.g., 7 = 4+2+1 = read, write, and execute).

3. What permissions does chmod 700 grant on a file?
   The user can read, write, and execute the file, while the group and others have no permissions at all.

4. What does the command chmod +x filename do?
   It adds executable permissions to the file for all permission categories (user, group, and others).

5. Why is setting file permissions to 777 generally considered insecure?
   Because 777 grants read, write, and execute permissions to everyone (user, group, and others), allowing anyone to do anything to the file, which is a very insecure practice.

Reflection: The permission shortcuts help with quick group permission changes. Command `chmod 777` is a example of numeric chmod notation values you add to read, write and execute. 4 for read permissions, 2 for write permissions and 1 for execute permission, following a 4+2+1 numerical system. `chmod +x` adds execute permissions to all groups. One thing to remember with the `chmod 777` command it is insecure grantion read, write and execute permissions to all users isn't ideal.

## [2026-7-1] Session: Environments

**Topics:** /etc/environment, .bashrc, .bash_profile & some scripting
**Key Takeaways:**

- To display all currently set environment variables in bash shell use `printenv`
- You can reference an environment variable ($) before a variable ex. `$USER`.
- When you modify an environment directly in the shell using `VARIABLE=value` it persist for the current session only.
- If in one of the users other than root use `sudo vi /etc/environment` to set environment variables that need to be available to all users.
- .bashrc file is a script that runs at the beginning of every bash session for a specific user located in it's home directory (`~/.bashrc`). It's used for customizations like setting environment variables, changing the prompt, setting up colors, and scripts for that user only. Use `source ~/.bashrc` to apply changes immediately.
- .bash_profile runs on login. .bashrc runs on every new interactive terminal window. That is why you "source" the bashrc-so that your termianl settings persist even if you aren't logging in fresh from the terminal screen.
- .bash_profile should source .bashrc to ensure consistency. The bash script syntax to ensure bashrc is being run (use in `~/.bash_profile`):
  if [ -f ~/.bashrc ]; then
  source ~/.bashrc
  fi
- Every user has their own .bashrc always create a `~/.bashrc.bak` for backup before editing if changes applied to `~/.bashrc` breaks something `mv .bashrc.bak .bashrc` to retain backup.

## Reference Data:

### Lesson Review (Environments):

1. What command can be used to display all currently set environment variables in a bash shell?
   The printenv command displays all currently set environment variables in a bash shell.

2. How do you reference an environment variable in bash to use its value in a command?
   You reference an environment variable using a dollar sign ($) before the variable name. For example, echo $USER will display the value of the USER variable. Bash interprets and replaces the variable with its value before running the command.

3. Where should you set environment variables that need to be available to all users on a system?
   Environment variables that should be available to all users can be set in sudo vi /etc/environment (if not in root). Any variables defined in this file will be available to every user on the system when they start a bash session.

4. What is the purpose of the .bashrc file and where is it located?
   The .bashrc file is a script that runs at the beginning of every bash session for a specific user. It is located in the user's home directory (~/.bashrc) and is used for customizations like setting environment variables, changing the prompt, setting up colors, and defining scripts for that user only.

5. What is the difference between .bashrc and .bash_profile in terms of when they are executed?
   .bashrc is run every time a bash session starts, while .bash_profile is only run at the first interactive login shell. .bashrc is used for general configurations, while .bash_profile is a relic of the past and typically should just source .bashrc to ensure consistent behavior.

6. When you modify an environment variable directly in the shell using the syntax VARIABLE=value , how long does that change persist?
   For the current session only

7. What does the export keyword do when setting a variable in bash?
   It makes the variable available to the general environment

8. What is the recommended difference between .bashrc and .bash_profile?
   .bash_profile should source .bashrc to ensure consistency

Reflection: Use the `printenv` command to view all environment variables in bash shell. You can reference a environment variable with the `$` command. Modifying an environment directly in the shell it persist for that session only. To set environment variable that needs to be used by all users the `/etc/environment` command is the command to use (use `sudo /etc/environemnt` if not root user). To do some customization like setting environemnt variables, changing the prompts, setting up colors and scripts for that user only that is the purpose of the .bashrc file (`~/.bashrc`). It's a script tha runs at the beginning of every bash session for a specific user located in it's home directory. The .bash_profile should source the .bashrc file to ensure consistency. I use the script:
if [ -f ~/.bashrc ]; then
source ~/.bashrc
fi
This script makes sure to source the .bashrc file everytime when using assigned environment variables.

## [2026-7-1] Session: Processes

**Topics:**
**Key Takeaways:**

- `ps` command withoug arguments displays only the processes currently running by the current user. The `aux` flag with `ps` allows you to see all processes on the system.
- PID stads for Process ID, its a uniqe identifier assinged to each running process.
- To pause the currently running process in the forground and return control to the interactive shell use the command `ctrl + z`.
- The command `bg 1` sends active process to the background, command `fg 1` sends process in the background to the foreground.
- Command `sleep [secs] &` runs a sleep process in the bakground the ampersand (`&`) symbol sends processess to the background.

## Reference Data:

### Lesson Review (Proccesses):

1. What does the ps command without any arguments display?
   The ps command withough arguments displays only the processes currently running by the current user. This typically includes the bash shell and the ps command itself.

2. What is the purpose of the aux flags when used with the ps command?
   The aux flags with the ps command display all processes running on the system by all users, not just the current user's processess. This provides a comprehensive view of everything running on the system.

3. What does the PID stand for and what is its purpose?
   PID stands for Process ID. It is a unique identifier assigned to each running process that allows you to refer to and manage specific processes, such as when using the kill command.

4. What happens when you press Ctrl+Z while a process is running in the foreground?
   Pressing Ctrl+Z stops the currently running foreground process and returns control to the interactive shell. The process is paused (not terminated) and can be resumed later in the background or foreground.

5. What is the difference between the bg and fg commands when managing jobs?
   The bg command resumes a stopped process in the background, allowing you to continue using the shell interactively. The fg command brings a background process to the foreground, displaying its output and blocking the shell until it completes or is stopped.

6. What does the kill -9 command do to a process?
   Terminates the process (`kill -SIGKILL [PID]` / `kill -9 [PID]`)

7. What does adding an ampersand (&) at the end of a command do?
   Send the command to the background

Reflection: In process `Ctrl+Z` command pauses the current process running in the foregroun. The `ps` command alone with no arguements shows the current running processes running by the current user `ps aux` shows all running processes on the system by all users. `fg` (foreground) command runs the process in the foreground (`fg 1`) `bg` command runs the process in the background (`bg 1`), also the `&` (amperand) runs the command in the background. You can use `kill -9 [PID]` or `kill -SIGKILL [PID]` command to terminate the current running process.

## [2026-7-2] Session Exit Codes & Process Operators:

**Topics:** echo $?, 0, non-zero, &&, ||
**Key Takeaways:**

- The exit code for a successful process will return 0 in bash and one not successful will return non-zero and will return 130 if you use Ctrl+C command.
- Command `echo $?` will display the exit code for the most recent executed command.
- The `&&` operator runs the second command if the first command completes successfully. (first command fails the second wont run).
  `&&` Example: `touch status.txt && date >> status.txt && uptime >> status.txt`
- The `||` operator runs the second command only if the first command fails.

## Reference Data:

### Lesson Review (Exit Codes & Process Operators):

1. What exit code does a successfully completed process return in bash?
   A successfully completed process returns an exit code of 0. Any exit code other than 0 indicates that the process did not finish successfully.
2. How can you check the exit codes of the last executed command in bash?
   Use the command `echo $?` to display the exit code of the most recently executed command.
3. What does an exit code of 1 typically indicate in bash?
   Exit code 1 typically indicates that there was an error of some variety and the program did not finish successfully.
4. What does the && operator do when chaining bash commands?
   The `&&` operator runs the second command only if the first command completes successfully (returns exit code 0). If the first command fails, the second command will not execute.
5. What is the difference between using `&&` and `||` operators in bash?
   `false && echo "first"` (won't print)
   `false || echo "second"` (will print)
   The `&&` operator runs the next command only if the previous command succeeds (returns 0). The `||` operator runs the next command only if the previous command fails (returns non-zero). In the example, "first" wont print but "second" will print.
6. What does the exit code 130 typically indicate?
   The user terminated the process with `Ctrl+c`.

Reflection: For exit codes and process operators a successfull exit code returns 0 and otherwise non-zero for a non-successful one. Checking the last executed command exit code you use `echo $?`. The `&&` operater returns the second command only if the first is true and the `||` operator returns the second command only if the first is false. Lastly, `Ctrl+C` command terminates the current running process.

## [2026-7-2] Session Subcommands:

**Topics:**
**Key Takeaways:**

- Use the $(command) to execute a subcommand ex; echo my name is $(whoami) will output the current user in place of whoami subcommnd.
- The `echo $(date +%x) - $(uptime) >> log.txt` command appends the date and uptime output into a file, in this case the log.txt one.
- The `.bashrc` file is always ready when you log into a new bash session.

## Reference Data:

### Lesson Review (Subcommands):

1. What is the syntax for executing a subcommand in bash?
   Use the dollar sign followed by parentheses: $(command). For example, echo "Current user is $(whoami)" will execute the whoami command and include its output in the echo statement.
2. How does a subcommand work in bash?
   A subcommand executes a separate command and returns whatever that command ouputs to standard out. The returned value is then inserted into the parent command at that position.
3. What is the older syntax for subcommands in bash, and why should it be avoided?
   Backticks (`) are the older syntax for subcommands. The dollar sign parentheses syntax $(command) should be preferred becausse it allows nesting multiple subcommands, is less ambiguous, easier to read, and provides more options.
4. How can you append output to a file using the echo command with subcommands? For example, to log both date and uptime
   Use the >> operator with subcommands. For example:
   `echo $(date +%x) - $(uptime) >> log.txt`
   This will execute both date and uptime commands and append their output to log.txt.
5. In the ps aux command output, what information do the CPU and %MEM colums provide?
   The CPU column shows the percentage of CPU usage for each process, and %MEM shows the percent of memory usage. These columns can be sorted to identify processes that ar consuming excessive resources.
6. What configuration file is always ready when you log into a new bash session?
   `.bashrc`

Reflection:

## [2026-7-5] Session SSH & Secondary Machine:

**Topic:** Building a Multi-Node Vurtualized Lab (UTM/Linux):
**Key Takeaways:**

- SSH stands for secure shell it allows you to connect from one computer to another with the ability to run commands remotely.
- The `-s` flag sets the default shell for the new user when `useradd` instead of dash.
- The `-m` flag creates a home folder automatically so you don't have to do it manually.

## Reference Data:

### Lesson Review (SSH & Secondary Machine):

1. What does SSH stand for and what is it's primary purpose?
   SSH stands for Secure Shell. It allows you to connect from one computer to another computer and remotely execute commands on a different computer.
2. What version control system uses SSH underneath the hood?
   Git uses SSH underneath the hood for connections.
3. What command is used to create a new virtual machine named 'secondary' using mulitpass?
   The command is `multipass launch --name secondary`. This creates a second VM on your computer.
4. What is the purpose of the `-s` flag when using the `useradd` command?
   The `-s` flag specifies the default shell for the new user. for example, `-s /bin/bash` sets bash as the user's shell instead of the default dash shell.
5. When creating a user with `useradd`, what does the `-m` flag do?
   The `-m` flag creates a home folder for the user automatically, so you don't have to create it manually.

Reflection:

1. The Challenge:
   **Goal:** Create a two-node Linux environment for an "SSH & Secondary Machine" lsesson.
   **Roadblock:** Multipass daemon failures required a pivot to UTM VMs.
   **Network Obstacle:** VMs were "air-gapped" (Connection Failed error), preventing internal communication and SSH access.
2. Troubleshooting Process:
   **Network Diagnosis:**

- Initial attempt at "Shared" network mode failed to provide an IPV4 address.
- Switched to "Bridged" mode to allow the VM to request an IP directly from the physical router.
- Encountered an IP collision (MAC address conflict) when cloning the second VM.
  **Resolution Steps:**
  1.  **MAC Address:** Generated unique MAC addresses from each VM in UTM Network Settings to stop IP conflicts.
  2.  **Network Reset:** Used `nmcli networking off` and `nmcli networking on` to force the VM to request a fresh IP via DHCP.
  3.  **Verification:** Confirmed unique IP addresses using `ip addr`.
  4.  **Service Setup:** Installed and enabled `openssh-server` on both nodes.

3. Key Concepts Learned
   **Infrastructure as Code (Mental Model):** Realized that virtualization platforms (like Multipass) are "magic", but learning to manually configure networking (DHCP, `nmcli`, `ip addr`) is essential for real-world server administration.
   **SSH Fingerprints:** Learned that SSH host key warnings are security features to prevent man-in-the-middle attacks.
   **Standardization:** Implemented hostnaming convetions (node1, node2) to ensure safety and clarity. Using `hostnamectl` and updating `/etc/hosts` (i.e. `sudo nano /etc/hosts` add this line to file `127.0.0.1 node2`), ensures that the OS correctly identifies itself, reducing the risk of accidental commands being run on the wrong server.

4. Technical Commands Mastered

- `ip addr`: View network interface status and IP assignment.
- `nmcli networking [on/off]`: Manage network connectivity status.
- `hostnamectl set-hostname <name>`: Define unique server identities.
- `nano /etc/hosts` or `vi /etc/hosts`: Add the inet & name `127.0.0.1 [hostname]`
- `sudo apt install openssh-server`: Configure the "doorman" for remote access.
- `ssh user@<IP>`: Establish secure, encrypted remote shell access.

5. Takeaways for Future Modules

- Always verify network connectivity _before_ attempting SSH.
- Standardize naming conventions early to prevent confusion.
- "Command not found" is not a wall; it's a hint-use the shell's output to find the missing package.

## [2026-7-5] Session Linking two Machines with SSH:

**Topics:** ssh, private & public keys, authorized_keys, IP address
**Key Takeaways:**

- `ssh-keygen -t rsa` is the command to generate both a priveate and public SSH key for SSH authentication.
- Private keys should never be shared also, should remain on originating machine and public keys can be shared with others and is placed on systems.
- The Public SSH key should be stored in the authorized_keys file within the .ssh directory in the users home directory (`~/.ssh/authorized_keys`).
- Recommended file permissions are `700` for .ssh directory and `600` for authorized_keys file.
- `ip addr` displays key network interface information including IP addresses, netmasks and broadcast addresses for all newtwork interfaces on a system.
- IP address `127.0.0.1` represents the local loopback address.

### Lesson Review (Linking two Machines with SSH):

1. What is the command to generate an SSH key pair using RSA encryption?
   `ssh-keygen -t rsa`. This command generates both a private key and public key for SSH authentication.
2. What is the difference between a private SSH key and a public SSH key, and how should each be handled?
   The private key is a secret that should never be revealed to anyone and remains on the originating machine. The public key can be shared with others and is placed on systems you want to connect to. Together, they allow cryptographic verification during SSH handshake without revealing the private key.
3. Where should the public SSH key be placed on a remote server to enable SSH authentication, and what is the filename?
   The public SSH key should be placed ina file called authorized_keys within the .ssh directory in the usere's home directory (`~/.ssh/authorized_keys`). This file can contain multiple public keys, one per line, allowing different users or machines to authenticate.
4. What are the recommended file permissions for the .ssh directory and the authorized_keys file, and how do you set them?
   The .ssh directory should have permissions 700 (read, write, execute for owner only), and the authorized_keys file should have permissions 600 (read and write for owner only). Set them using: `chmod 700 ~/.ssh` and `chmod 600 ~./ssh/authorized_keys`.
5. What command can be used to display network information including IP addresses on a Linux system?
   `ip addr` which is a replacement for the legacy `ifconfig` command. This command displays network interface information including IP addresses, netmasks, and broadcast addresses for all network interfaces on the system.
6. What does the SSH key consist of?
   A private key and a public key.
7. Where should the private SSH key be stored?
   On the machine that initiates the connection.
8. What does the IP address 127.0.0.1 represent?
   The local loopback address.

Reflection:

## [2026-7-7] Session SFTP:

**Topics:**
**Key Takeaways:**

### Reference Data:

### Lesson Review (SFTP):

1. What is SFTP and how does it relate to FTP?
   SFTP stands for Secure File Trasfer Protocol. It is a variation of FTP (File Trasfer Protocol) that provides secure file transfers between computers. Ulike traditional FTP, SFTP uses the SSH protocol for security, making it more secure than plain FTP.
2. What is the main advantage of SFTP over traditional FTP in terms of setup?
   When you set up SSH, you automatically set up SFTP at the same time because they use the same protocol and ports. Traditional FTP requires separate setup, works on a different protocol, and requires different keys. SFTP is also more secure because all communication goes through SSH.
3. How do you initiate an SFTP connection to a remote server if you already have SSH configured?
   You use the command `sftp` followd by the connection details, similar to how you would use SSH. Since SFTP uses the same protocol as SSH, if SSH is already configured, SFTP will work immediately without additional setup.
4. In SFTP, what is the difference between `pwd` and `lpwd` commands?
   `pwd` shows the remote working directory (the directory on the remote server you're connected to), while `lpwd` shows the local working directory (the directory on your local computer). The 'l' prefix stands for 'local'.
5. What commands would you use to upload a file to a remote server and download a file from a remote server using SFTP?
   To upload a file, use the `put` command followed by the filename (e.g., `put filename.txt`). To download a file, use the `get` command followed by the filename (e.g., `get filename.txt`). You can also optionally specify a new name for the file as a second argument.
6. How do you execute a command on your local machine while connected via SFTP?
   Use the exclamation point (!) prefix before the command.
7. What command is used to upload a file from local to remote server in SFTP?
   `put`
8. Why is SFTP considered more secure than plain FTP?
   SFTP uses the SSH secure communication protocol

## [2026-7-7] Session Wget:

**Topics:**

**Key Takeaways:**

### Reference Data:

### Lesson Review (Wget):

1. What is the primary difference between Wget and cURL in terms of how they handle data?
   Wget is mor like CP for the Internet - it downloads files directly to disk. cURL connects into pipes and uses standard in and standard out, allowing you to pipe data from the Internet into other programs.
2. What unique capability doe Wget hav that cURL does not?
   Wget can do recursive downloads. It can read through a website, find other URLs (like CSS and JavaScript files that link to other files), and download thos URLs as well, effectively downloading entire websites recursively.
3. After downloading a .sh file using Wget, what additional step is typically needed before you can execute it?
   You need to give it executable permissions using chmod. You can use either `chmod +x filename.sh` or `chmod 700 filename.sh` to make the file executable.
4. What does the green color indicate when viewing files with the `ls` command in a typicall shell configuration?
   Gree color indicates that the file has executable permissions.
5. How can you run a shell script file without making it executable first?
   You can pipe it directly into bash, for example: `bash scriptname.sh`.

## [2026-7-7] Session curl Basics:

**Topics:**

**Key Takeaways:**

### Reference Data:

### Lesson Review (curl Basics):

1. What is the default behavior of cURL when fetching a URL without any additional options?
   cURL prints the fetched content directly to standard output (stdout) rather than saving it to a file.
2. How do you redirect cURL output to a file using shell redirection? For example, to save content to `game.sh`:
   Use the angle bracket operator to redirect output:
   `curl [URL] > game.sh`
   This follows the standard Linux patter for redirecting output to a file.
3. What is a primary use case for cURL in API development?
   cURL is commonly used to hit API endpoints and test if they're reponsidng correctly. It serves as a command-line alternative to tolls like Postman or Insomnia for API testing and development.
4. What command starts a Python 3 HTTP server on port 8000 that binds to all network interfaces?
   `python3 -m http.server 8000 --bind 0.0.0.0`
   This starts a static web server that serves files from the current directory.
5. What does a GET request log entry typically show when running a Python HTTP server?
   It shsows the requesting IP address, timestap, request method (GET), the requested path, the HTTP protocol version (e.g., HTTP 1.1), and the response status code (e.g., 200).
6. What happens when you run curl with a URL without any additional parameters?
   It prints the content to standard out.

## [2026-7-7] Session curl & HTTP Verbs:

**Topics:**

**Key Takeaways:**

### Reference Data:

### Lesson Review (curl & HTTP Verbs):

1. What curl command option is used to change the HTTP ver (like POST, PUST, DELETE)?
   The -X option is used to change the HTTP verb. For example: `curl -X POST http://example.com` or `curl -X DELETE http://example.com`.
2. When using curl with the -d option to send data, what HTTP verb is used by defult?
   `POST` is used by default when using the `-d` option, because `GET` requests don't have bodies. Only `POST` request have bodies, so curl implicitly makes it a `POST` request when a body is provided.
3. How can you send cookies witha curl request?
   Use the `-b` option followed by the cookie data. for example: `curl -b "name=brian" http://example.com`. For multple cookies stored in a file (cookie jare), use the -c option with a file path.
4. How can you make curl follow HTTP redirects?
   Use the `-L` option. By default, curl won't follow redirects, so you must explicitly tell it to do so with the `-L` flag.
5. How can you copy a network request froma browser's DevTools as a curl command?
   In Firefox, Chrome, or Edge, open DevTools, go to the Network tab, right-click on any network request, and select 'Copy as a cURL'. this copies a fully-formed curl request with all headers, verbs, and request body that can be replayed from the command line.
6. Which curl flag is used to send custom hearders with a request?
   `-H`
7. What security risk exists when piping curl output directly to bash?
   The server could execute malicious code on your system without your knowledge or verification.

### This to look for while studying Package Management:

**APT Basics:**

- Focus on why we have to run sudo apt update before sudo apt install. (Hint: It’s not just updating your software—it’s updating your map of where the software lives!)

  **APT Q&A:**

- Pay attention to dependencies. When you install one tool, why does the package manager often ask to install 10 other things?

  **Snaps:**

- Notice the difference in "containerization." How is a snap package fundamentally different from a traditional apt package in terms of where it stores its files and how it stays updated?

## [2026-8-7] Session Package Management & APT Basics:

**Topics:** APT, apt-get

**Key Takeaways:**

-

### Reference Data:

### Lesson Review (Package Management & APT Basics):

1. What is the difference between `apt-get` and `apt` in Ubuntu?
   `apt-get` is the older command-line tool, while `apt` is the newer one. `apt` is designed to be simpler and easier to use for 99% of use cases. `apt-get` still works and will likely work forever for backwards compatibility, and it has some more advanced behaviors. for most purposes, `apt` should be used.
2. Why should you run `sudo apt update` before installing a new package?
   APT works by downloading a list of all available packages to your computer. Running `apt update` fetches the latest version of this list to ensure you're getting the most current version of packages when you install them. this is especially important if your system has been running for a while without updates.
3. What is the purpose of the `sudo apt autoremove` command?
   This command cleans up packages that are no longer needed on the system. It automatically removes packages that were installed as dependencies but are no longer required by any installed software.
4. How can you view all packages that are available to be upgraded on your Ubuntu system?
   Use the command `apt list --upgradeable`. This will display all packages that have newer versions available for installation.
5. What is the difference between `sudo apt upgrade` and `sudo apt full-upgrade`?
   `sudo apt upgrade` updates all installed packages to their latest versions. `sudo apt full-upgrade` performs both the upgrade and auto-remove operations thogether, updating all packages and removing any packages that ar no longer needed.
6. What is the command to install a package using APT in Ubuntu?
   `sudo apt install [package-name]`
7. What does the lolcat program do when used with text files?
   Displays output in rainbow colors
8. What does the command `sudo apt upgdate` do?
   It Downloads the latest package list.

## [2026-8-7] Session APT Q&A:

**Topics:**

**Key Takeaways:**

### Reference Data:

### Lesson Review (APT & Q&A):

1. What is the relationship between APT and tools like apt-get, apt-remove, and apt-update?
   APT is the higher-level tool built on top of lower-level tools like apt-get, apt-search, and apt-cache. Under the hood, APT uses these various tools, combining them into a more user-friendly interface.
2. What is the difference between `apt upgrade` and `apt update`?
   `apt upgrade` actually upgrades a specific package to a newer version. `apt update` refreshes the package registry list, getting information about the latest available versions of packages without actually upgrading any installed packages. You should run update before upgrade.
3. What is Homebrew and what operating system is it designed for?
   Homebrew is a community-developed package manager for Mac (available at brew.sh) Unlike APT which is officially made by Canonical for Ubuntu, Homebrew is a commmunity project rather than an official package manager.
4. Wht ia the name of Microsoft's package manager for Windows?
   Microsoft launced a package manager called winget (or winget). Before this, chocolatey was a existing alternative package manager for Windows.
5. Why might you want to avoid installing Node.js through APT?
   APT repositories tend to be conservative with package upgrades and may contain deprecated or older versions of packages. For Node.js, it's recommended to install directly from Node or NodeSource to get more currendt versions.
6. What does the `sudo apt update` command do?
   Updates the list of available packages from the registry

## [2026-8-7] Session Snaps:

**Topics:**

**Key Takeaways:**

-

### Reference Data:

### Lesson Review (Snaps):

1. What is the main security advantage of snaps over traditional APT packages?
   Snaps use sandboxing to create a totally enclosed package that cannot break out of its container. this means that even if malicious code is installed, it won't be able to access the rest of the system or steal data, making them inherently more secure than APT packages.
2. What is a key portability benefit of snaps compared to APT packages?
   Snaps can run on any Linux distribution because they include all neccessary dependencies in one package. APT packages are compiled specifically for Ubuntu and cannot be easily used on other distributions like Red Hat without rebuilding from source.
3. How do snaps handle updates differently from APT packages?
   Snaps update automatically without user control and can ship deltas (only the code that chanded). APT packages require manual updates and must download and reinstall the entire package even if only one line of code changed.
4. What is the purpose of snapd in Linux systems?
   `snapd` is a daemon (background process) that executes and manages snaps. It must be installed on a system before snaps can be run, particularly on distributions like Mint or Red Hat that don't include it by default.
5. What does the `--classic` flag do when installing a snap, and what security implication does it have?
   The `--classic` flag allows a sap to break out of its sandbox, meaning it's not fully sanboxed. While this makes it less secure than a standard snap installation, it's still more secure than APT install. Users should verify they trust the publisher before using this flag.
6. What is the primary security advantage of snaps over traditional package managers like APT?
   They use sandboxing to prevent code from breaking out.
7. How do snaps handle updates compared to APT packages?
   Snaps can ship deltas with only chaned code, while APT requires downloading entire packages for each update.

Reflection:

## [2026-8-7] Session

**Topics:**

**Key Takeaways:**

-

### Reference Data:

### Lesson Review

1.

Reflection:

## [] Session

**Topics:**

**Key Takeaways:**

-

### Reference Data:

### Lesson Review

1.

Reflection:

## [] Session

**Topics:**

**Key Takeaways:**

-

### Reference Data:

### Lesson Review

1.

Reflection:

## [] Session

**Topics:**

**Key Takeaways:**

-

### Reference Data:

### Lesson Review

1.

Reflection:

## 1. The "Triage & Rescue" Lab (Simulation)

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

### Answer:

- marvinbutleriii@marvinbutleriii:~$ chmod 000 sensitive_data.txt
  marvinbutleriii@marvinbutleriii:~$ ls -lsah sensitive_data.txt
  0 ---------- 1 marvinbutleriii marvinbutleriii 0 Jun 28 12:30 sensitive_data.txt
  marvinbutleriii@marvinbutleriii:~$ cat sensitive_data.txt
  cat: sensitive_data.txt: Permission denied
  marvinbutleriii@marvinbutleriii:~$ sudo su
  root@marvinbutleriii:/home/marvinbutleriii# chmod 666 sensitive_data.txt
  root@marvinbutleriii:/home/marvinbutleriii# ls -lsah sensitive_data.txt
  0 -rw-rw-rw- 1 marvinbutleriii marvinbutleriii 0 Jun 28 12:30 sensitive_data.txt
  root@marvinbutleriii:/home/marvinbutleriii# exit
  exit
  marvinbutleriii@marvinbutleriii:~$ sudo chown marvinbutleriii:marvinbutleriii sensitive_data.txt
  marvinbutleriii@marvinbutleriii:~$ ls -lsah sensitive_data.txt
  0 -rw-rw-rw- 1 marvinbutleriii marvinbutleriii 0 Jun 28 12:30 sensitive_data.txt
  marvinbutleriii@marvinbutleriii:~$ chmod 000 sensitive_data.txt
  marvinbutleriii@marvinbutleriii:~$ ls -lsah sensitive_data.txt
  0 ---------- 1 marvinbutleriii marvinbutleriii 0 Jun 28 12:30 sensitive_data.txt
  marvinbutleriii@marvinbutleriii:~$ chmod 666 sensitive_data.txt
  marvinbutleriii@marvinbutleriii:~$ ls -lsah sensitive_data.txt
  0 -rw-rw-rw- 1 marvinbutleriii marvinbutleriii 0 Jun 28 12:30 sensitive_data.txt

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

### 4. Configure Your Environment:

- **Task:** Instead of just practicing export, use your .bashrc or .bash_profile file to create a permanent alias or environment variable that helps you in your daily work.

- **Why this works:** It gives me the practice I need to use .bashrc for creating environment variable needed to use frequently and the use of .bash_profile to set a script to assign the .bashrc environment variables as the go to source perminently.

### Answer:

PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"

TEST_THING="blah blah"

SUPPORT="answer"

STAFF="newtech"

$ STAFF=newtech
$ echo Welcome $STAFF
Welcome newtech
$ cat /etc/environment
PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"

TEST_THING="blah blah"

SUPPORT="answer"

$ sudo vi /etc/environment
$ echo today we have training for the $STAFF
today we have training for the newtech

$ exit
marvinbutleriii@marvinbutleriii:/home$ cd ~
marvinbutleriii@marvinbutleriii:~$ sudo vi ~/.bashrc
marvinbutleriii@marvinbutleriii:~$ sudo vi ~/.bash_profile
marvinbutleriii@marvinbutleriii:~$ exit
exit
$ whoami
marv
$ exit
marvinbutleriii@marvinbutleriii:/home$ exit
exit
marvinbutleriii@marvinbutleriii:/home$ su marv
Password:
$ whoami
marv
$ sudo vi ~/.bashrc
[sudo] password for marv:
`$` sudo vi ~/.bash_profile

- I used this command above to run a a script to assign .bash_profile to use .bashrc as the go to environment reference for my new environment variables I created.
- The script:
  if [ -f ~/.bashrc ]; then
  source ~/.bashrc
  fi

### 5. Practice System Administration:

- **Task:** Create a "mock" environment where you have to set up multiple users, assign them specific permissions, and ensure they can only access the files they need.

- **Why this works:** It ensures I know how to navigate the environment and modify permissions.

### Answer:

marvinbutleriii@marvinbutleriii:/home$ sudo useradd newtech
marvinbutleriii@marvinbutleriii:/home$ sudo passwrd newtech
marvinbutleriii@marvinbutleriii:/home$ sudo usermod -aG sudo newtech
marvinbutleriii@marvinbutleriii:/home$ ls
another-file.txt cool.txt marv marvinbutleriii marv.txt
marvinbutleriii@marvinbutleriii:/home$ su newtech
Password:
$ whoami
newtech
$ sudo touch hire.txt
[sudo] password for newtech:
$ ls
another-file.txt cool.txt hire.txt marv marvinbutleriii marv.txt
$ ls -lsah
total 20K
4.0K drwxr-xr-x 4 root root 4.0K Jul 2 10:44 .
4.0K drwxr-xr-x 23 root root 4.0K Dec 20 2025 ..
0 -rw-r--r-- 1 root root 0 Jun 29 12:21 another-file.txt
0 -rw-rw-rw- 1 marv marv 0 Jun 29 12:13 cool.txt
0 -rw-r--r-- 1 root root 0 Jul 2 10:44 hire.txt
4.0K drwxr--r-- 2 marv marv 4.0K Jul 2 01:57 marv
4.0K drwxr-x--- 21 marvinbutleriii marvinbutleriii 4.0K Jul 2 01:54 marvinbutleriii
4.0K -rw-rw-rw- 1 marv marv 28 Jul 1 11:55 marv.txt
$ sudo chmod 666 hire.txt
$ ls -lsah
total 20K
4.0K drwxr-xr-x 4 root root 4.0K Jul 2 10:44 .
4.0K drwxr-xr-x 23 root root 4.0K Dec 20 2025 ..
0 -rw-r--r-- 1 root root 0 Jun 29 12:21 another-file.txt
0 -rw-rw-rw- 1 marv marv 0 Jun 29 12:13 cool.txt
0 -rw-rw-rw- 1 root root 0 Jul 2 10:44 hire.txt
4.0K drwxr--r-- 2 marv marv 4.0K Jul 2 01:57 marv
4.0K drwxr-x--- 21 marvinbutleriii marvinbutleriii 4.0K Jul 2 01:54 marvinbutleriii
4.0K -rw-rw-rw- 1 marv marv 28 Jul 1 11:55 marv.txt

### 6. Environment and Pemissions Challenge:

- **Task:** Create a script called sys_check.sh that prints the current user (whoami) and the date.

Use chmod to make it executable (+x).

Try to run it.

Move it to a directory that is not in your $PATH.

Try to run it by just typing sys_check.sh. It will fail.

The Lab: Use the export command to add the script's directory to your $PATH. Now try to run it from anywhere.

### Answer:

marvinbutleriii@marvinbutleriii:/home$ sudo touch sys_check.sh
[sudo] password for marvinbutleriii:
marvinbutleriii@marvinbutleriii:/home$ ls -lsah
total 20K
4.0K drwxr-xr-x 4 root root 4.0K Jul 2 13:05 .
4.0K drwxr-xr-x 23 root root 4.0K Dec 20 2025 ..
0 -rw-r--r-- 1 root root 0 Jun 29 12:21 another-file.txt
0 -rw-rw-rw- 1 marv marv 0 Jun 29 12:13 cool.txt
0 -rw-rw-rw- 1 root root 0 Jul 2 10:44 hire.txt
4.0K drwxr--r-- 2 marv marv 4.0K Jul 2 11:37 marv
4.0K drwxr-x--- 21 marvinbutleriii marvinbutleriii 4.0K Jul 2 13:01 marvinbutleriii
4.0K -rw-rw-rw- 1 marv marv 28 Jul 1 11:55 marv.txt
0 -rw-r--r-- 1 root root 0 Jul 2 13:05 sys_check.sh
marvinbutleriii@marvinbutleriii:/home$ sudo vi sys_check.sh
marvinbutleriii@marvinbutleriii:/home$ cat sys_check.sh
#!/bin/bash
echo "Current user is: $(whoami)"
echo "Current date is: $(date)"
marvinbutleriii@marvinbutleriii:/home$ ./sys_check.sh
bash: ./sys_check.sh: Permission denied
marvinbutleriii@marvinbutleriii:/home$ ls -lsah sys_check.sh
4.0K -rw-r--r-- 1 root root 78 Jul 2 13:07 sys_check.sh
marvinbutleriii@marvinbutleriii:/home$ sudo chmod +x sys_check.sh
marvinbutleriii@marvinbutleriii:/home$ ls -lsah sys_check.sh
4.0K -rwxr-xr-x 1 root root 78 Jul 2 13:07 sys_check.sh
marvinbutleriii@marvinbutleriii:/home$ ./sys_check.sh
Current user is: marvinbutleriii
Current date is: Thu Jul 2 01:08:38 PM UTC 2026
marvinbutleriii@marvinbutleriii:/home$ ls
another-file.txt cool.txt hire.txt marv marvinbutleriii marv.txt sys_check.sh
marvinbutleriii@marvinbutleriii:/home$ pwd
/home
marvinbutleriii@marvinbutleriii:/home$ mv sys_check.sh ~
mv: cannot move 'sys_check.sh' to '/home/marvinbutleriii/sys_check.sh': Permission denied
marvinbutleriii@marvinbutleriii:/home$ sudo mv sys_check.sh ~
marvinbutleriii@marvinbutleriii:/home$ ls
another-file.txt cool.txt hire.txt marv marvinbutleriii marv.txt
marvinbutleriii@marvinbutleriii:/home$ cd ~
marvinbutleriii@marvinbutleriii:~$ ls
code_arm64.deb Documents Intro Music Public snap Templates
Desktop Downloads log_simulation Pictures sensitive_data.txt sys_check.sh Videos
marvinbutleriii@marvinbutleriii:~$ cd /home
marvinbutleriii@marvinbutleriii:/home$ sys_check.sh
sys_check.sh: command not found
marvinbutleriii@marvinbutleriii:/home$ cd ~
marvinbutleriii@marvinbutleriii:~$ pwd
/home/marvinbutleriii
marvinbutleriii@marvinbutleriii:~$ cd /home
marvinbutleriii@marvinbutleriii:/home$ export PATH=$PATH:/home/marvinbutleriii
marvinbutleriii@marvinbutleriii:/home$ system_check.sh
system_check.sh: command not found
marvinbutleriii@marvinbutleriii:/home$ ls
another-file.txt cool.txt hire.txt marv marvinbutleriii marv.txt
marvinbutleriii@marvinbutleriii:/home$ sudo export PATH=$PATH:/home/marvinbutleriii
sudo: export: command not found
marvinbutleriii@marvinbutleriii:/home$ cd ~
marvinbutleriii@marvinbutleriii:~$ ls
code_arm64.deb Documents Intro Music Public snap Templates
Desktop Downloads log_simulation Pictures sensitive_data.txt sys_check.sh Videos
marvinbutleriii@marvinbutleriii:~$ ls -lsah
total 101M
4.0K drwxr-x--- 21 marvinbutleriii marvinbutleriii 4.0K Jul 2 13:12 .
4.0K drwxr-xr-x 4 root root 4.0K Jul 2 13:12 ..
8.0K -rw------- 1 marvinbutleriii marvinbutleriii 7.7K Jul 2 13:02 .bash_history
4.0K -rw-r--r-- 1 marvinbutleriii marvinbutleriii 220 Mar 31 2024 .bash_logout
4.0K -rw-rw-r-- 1 marvinbutleriii marvinbutleriii 1 Jul 2 01:54 .bash_profile
4.0K -rw-r--r-- 1 marvinbutleriii marvinbutleriii 3.8K Jul 2 12:11 .bashrc
4.0K drwx------ 16 marvinbutleriii marvinbutleriii 4.0K Jun 28 02:40 .cache
100M -rw-rw-r-- 1 marvinbutleriii marvinbutleriii 100M Dec 17 2025 code_arm64.deb
4.0K drwx------ 17 marvinbutleriii marvinbutleriii 4.0K Jun 29 12:14 .config
4.0K drwxr-xr-x 2 marvinbutleriii marvinbutleriii 4.0K Jun 28 11:29 Desktop
4.0K drwxr-xr-x 3 marvinbutleriii marvinbutleriii 4.0K Dec 20 2025 Documents
4.0K drwxrwxr-x 3 marvinbutleriii marvinbutleriii 4.0K Dec 20 2025 .dotnet
4.0K drwxr-xr-x 3 marvinbutleriii marvinbutleriii 4.0K Jun 28 00:22 Downloads
4.0K drwx------ 2 marvinbutleriii marvinbutleriii 4.0K Jun 28 03:12 .gnupg
4.0K -rw-rw-r-- 1 marvinbutleriii marvinbutleriii 13 Jun 28 11:26 Intro
4.0K -rw------- 1 marvinbutleriii marvinbutleriii 20 Jul 2 01:07 .lesshst
4.0K drwx------ 4 marvinbutleriii marvinbutleriii 4.0K Dec 20 2025 .local
4.0K drwxrwxr-x 2 marvinbutleriii marvinbutleriii 4.0K Jun 28 13:45 log_simulation
4.0K drwxr-xr-x 2 marvinbutleriii marvinbutleriii 4.0K Dec 20 2025 Music
4.0K drwxr-xr-x 2 marvinbutleriii marvinbutleriii 4.0K Jun 28 11:28 Pictures
4.0K drwx------ 3 marvinbutleriii marvinbutleriii 4.0K Dec 20 2025 .pki
4.0K -rw-r--r-- 1 marvinbutleriii marvinbutleriii 807 Mar 31 2024 .profile
4.0K drwxr-xr-x 2 marvinbutleriii marvinbutleriii 4.0K Dec 20 2025 Public
0 -rw-rw-rw- 1 marvinbutleriii marvinbutleriii 0 Jun 28 12:30 sensitive_data.txt
4.0K drwx------ 4 marvinbutleriii marvinbutleriii 4.0K Jun 28 00:22 snap
4.0K drwx------ 2 marvinbutleriii marvinbutleriii 4.0K Jun 28 11:29 .ssh
0 -rw-r--r-- 1 marvinbutleriii marvinbutleriii 0 Dec 20 2025 .sudo_as_admin_successful
4.0K -rwxr-xr-x 1 root root 78 Jul 2 13:07 sys_check.sh
4.0K drwxr-xr-x 2 marvinbutleriii marvinbutleriii 4.0K Dec 20 2025 Templates
4.0K drwxr-xr-x 2 marvinbutleriii marvinbutleriii 4.0K Dec 20 2025 Videos
4.0K drwxr-xr-x 2 marvinbutleriii marvinbutleriii 4.0K Jun 28 11:29 .vim
12K -rw------- 1 marvinbutleriii marvinbutleriii 8.2K Jul 2 13:01 .viminfo
4.0K drwxrwxr-x 4 marvinbutleriii marvinbutleriii 4.0K Dec 20 2025 .vscode
4.0K -rw-rw-r-- 1 marvinbutleriii marvinbutleriii 214 Dec 20 2025 .wget-hsts
marvinbutleriii@marvinbutleriii:~$ sudo chown marv:marv sys_check.sh
marvinbutleriii@marvinbutleriii:~$ ls -lsah sys_check.sh
4.0K -rwxr-xr-x 1 marv marv 78 Jul 2 13:07 sys_check.sh
marvinbutleriii@marvinbutleriii:~$ export PATH=$PATH:/home/marvinbutleriii
marvinbutleriii@marvinbutleriii:~$ sys_check.sh
Current user is: marvinbutleriii
Current date is: Thu Jul 2 01:19:05 PM UTC 2026
marvinbutleriii@marvinbutleriii:~$ vi ~/.bashrc

- Inside that ~/.bashrc file add the command `export PATH=$PATH:/home/marvinbutleriii` at the bottom that way everytime I open a new terminal, the system automatically adds my folder into the path for me.

### Scripts Section:

1. Purpose: What does the script solve?

- I used the sys_check.sh script to tell me 'Current user is: $(whoami)', and 'Current date is: $(date)'.

2. Logic: What commands are inside?

- `#!/bin/bash`
- `echo Current user is: $(whoami)`
- `echo Current date is: $(date)`

3. Permissions: Did you remember to chmod +x?

- I did use `chmod +x` command to add execution permissions to the user.

4. Refactor: How did you make it better the second time?

- I had to use the `chown` command to change ownership from the root (superuser) to marvinbutleriii because I noticed sudo export didn't work. That is because export is a shell built-in command-it modifies the environment of the current terminal session. Since sudo opens a new process, the export command only affects the temporary root shell, not your actural working environment.
- I also ran `system_check.sh` and got a "command not found" error, then realized the file was named `sys_check.sh`. This is a classic real-world debugging case (always look at the filename exactly as it is typed on the disk).

### Emergency Recovery: Broken PATH

- **The Rescue Solution:** If you find yourself in the situation, here is exactly how to fix it:

1. Use the Absolute Path: Since your PATH variable is broken, the shell can't find vi. You need to tell it exactly where the program is instead of vi, run:

- `/usr/bin/vi ~/.bashrc` (this bypass the need for the PATH variable entirely).

2. Fix the typeo: Once vi opens the file, find the typo, correct $PAH to $PATH, and save (:wq).
3. Reload: You don't need to reboot. Just run:

- `source ~/.bashrc` This forces the shell to re-read the file immediately, fixing your environment variables on the fly.

**The Emergency Backup (If even /usr/bin/vi fails):** If you somehow broke your shell so badly that even absolute paths are acting weird, you have one final "Emergency Key": The Absolute Hardcoded Export.

you can manually set a temporary, working path just for that session by running:

- `export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin` This manually overwrites your broken path with a standard, safe one. Once you run that, your `ls` and `vi` commands will magically start working agian, and you can calmly go into your .bashrc and fix the typo.

### Default Configuration Files (etc/skel "skeleton"):

The Hidden Secret: /etc/skel

when use `useradd`, the system doesn't just create an empty folder. It looks at a special directory called /etc/skel (short for "skeleton"). This directory contains all the default configuration files (like `.bashrc`, `.profile`, `.bash_logout`) that a new user should have.

- Why it's missing for `newtech`: When you ran `sudo useradd newtech` without the -m flag, you prevented the system from copying those skeleton files into the new user's home folder. That is why `newtech` doesn't have a `.bashrc` file yet-it was never "born" with the defult set.
- The "Manual" Fix: Because you created the directory manually with `mkdir`, you now have a "blank slate." To give `newtech` the same environment you have, you can copy the defaults over:
- `sudo cp /etc/skel/.bashrc /home/newtech/`
- `sudo cp /etc/skel/.profile /home/newtech/`
- `sudo chown newtech:newtech /home/newtech/.bashrc /home/newtech/.profile`

## The System Admin Lab: Package Lifecycle Management:

**Objective:** Demonstrate mastery of the software lifecycle—from discovery and installation to maintenance and cleanup—without using "magic" commands you don't understand.

**Task 1:** The "Freshness" Audit
Before installing anything, an engineer always ensures the local repository cache is current.

**Action:** Update your package lists.

**Command:** sudo apt update

**The "Why":** If you don't do this, you might be trying to install an outdated version of a package that has known security vulnerabilities.

**Task 2:** Discovery
Imagine you need a tool to monitor real-time system performance (CPU, Memory, etc.). You know a popular one exists, but you need to verify its exact package name.

**Action:** Search for the htop package.

**Command:** apt search htop

**The Goal:** Look at the output. Can you identify the package name? (It should be htop).

**Task 3:** Execution (The Install)
Action: Install htop.

**Command:** sudo apt install htop -y

**Verification:** Once installed, simply type htop in your terminal to launch it. Press q to exit.

**Pro-Tip:** Check where the binary is installed by running which htop.

**Task 4:** The "Cleanup" (Dependency Management)
Sometimes we install packages to test them, then remove them. But removing the package often leaves "orphaned" dependencies behind, which bloat the system.

**Action:** Remove htop and clean up its unused dependencies.

**Command:**

sudo apt remove htop

sudo apt autoremove

**The "Why":** autoremove is what separates a "user" from an "administrator." It keeps your system lean and reduces the "attack surface" by removing unnecessary libraries.

### Your Deliverable

- Don't just run the commands. In your Architect's Journal, document the following for this lab:

- The "Success" Check: How do you know htop is actually gone after you run the remove command? (Hint: Try typing htop again).

- The "Dependency" Observation: When you ran sudo apt install htop, did it install other things too? Why does apt do that?

- The "Road Warrior" Thought: If you were managing 100 servers in a data center, would you want to run these commands one by one, or would you look for a way to script this? (Keep this in mind as you start your 7-module shell scripting sprint).

### Architect's Journal for (Sytem Admin Lab: Package Lifecycle Management):

### Answer:

marvinbutleriii@node1:~$ sudo apt update

[sudo] password for marvinbutleriii:

Get:1 https://packages.microsoft.com/repos/code stable InRelease [3,590 B]

Get:2 https://packages.microsoft.com/repos/code stable/main arm64 Packages [26.6 kB]

Hit:3 http://ports.ubuntu.com/ubuntu-ports noble InRelease

Hit:4 http://ports.ubuntu.com/ubuntu-ports noble-updates InRelease

Hit:5 http://ports.ubuntu.com/ubuntu-ports noble-backports InRelease

Hit:6 http://ports.ubuntu.com/ubuntu-ports noble-security InRelease

Fetched 30.2 kB in 2s (14.2 kB/s)

Reading package lists... Done

Building dependency tree... Done

Reading state information... Done

24 packages can be upgraded. Run 'apt list --upgradable' to see them.

marvinbutleriii@node1:~$ search htop

Command 'search' not found, did you mean:

command 'esearch' from deb ncbi-entrez-direct (19.2.20230331+dfsg-3ubuntu0.24.04.3)

command 'setarch' from deb util-linux (2.39.3-9ubuntu6.5)

command 'csearch' from deb codesearch (0.0~hg20120502-3ubuntu0.24.04.3)

command 'vsearch' from deb vsearch (2.26.1-1)

command 'starch' from deb coop-computing-tools (9.9-4ubuntu1)

command 'searchd' from deb sphinxsearch (2.2.11-8build1)

Try: sudo apt install <deb name>

marvinbutleriii@node1:~$ apt search htop

Sorting... Done

Full Text Search... Done

aha/noble 0.5.1-3build1 arm64

ANSI color to HTML converter

bashtop/noble 0.9.25-1 all

Resource monitor that shows usage and stats

bpytop/noble 1.0.68-2 all

Resource monitor that shows usage and stats

btm/noble 0.9.6-4 arm64

customizable graphical process/system monitor for the terminal

btop/noble 1.3.0-1 arm64

Modern and colorful command line resource monitor that shows usage and stats

htop/noble,now 3.3.0-4build1 arm64 [installed,automatic]

interactive processes viewer

libauthen-oath-perl/noble 2.0.1-2 all

Perl module for OATH One Time Passwords

marvinbutleriii@node1:~$ sudo apt install htop -y

Reading package lists... Done

Building dependency tree... Done

Reading state information... Done

htop is already the newest version (3.3.0-4build1).

htop set to manually installed.

0 upgraded, 0 newly installed, 0 to remove and 24 not upgraded.

marvinbutleriii@node1:~$ htop

marvinbutleriii@node1:~$ sudo apt remove htop

Reading package lists... Done

Building dependency tree... Done

Reading state information... Done

The following packages will be REMOVED:

htop ubuntu-server

0 upgraded, 0 newly installed, 2 to remove and 24 not upgraded.

After this operation, 472 kB disk space will be freed.

Do you want to continue? [Y/n] Y

(Reading database ... 228676 files and directories currently installed.)

Removing ubuntu-server (1.539.2) ...

Removing htop (3.3.0-4build1) ...

Processing triggers for hicolor-icon-theme (0.17-2) ...

Processing triggers for gnome-menus (3.36.0-1.1ubuntu3) ...

Processing triggers for man-db (2.12.0-4build2) ...

Processing triggers for desktop-file-utils (0.27-2build1) ...

marvinbutleriii@node1:~$ sudo apt autoremove htop

Reading package lists... Done

Building dependency tree... Done

Reading state information... Done

Package 'htop' is not installed, so not removed

0 upgraded, 0 newly installed, 0 to remove and 24 not upgraded.

marvinbutleriii@node1:~$ apt search htop

Sorting... Done

Full Text Search... Done

aha/noble 0.5.1-3build1 arm64

ANSI color to HTML converter

bashtop/noble 0.9.25-1 all

Resource monitor that shows usage and stats

bpytop/noble 1.0.68-2 all

Resource monitor that shows usage and stats

btm/noble 0.9.6-4 arm64

customizable graphical process/system monitor for the terminal

btop/noble 1.3.0-1 arm64

Modern and colorful command line resource monitor that shows usage and stats

htop/noble 3.3.0-4build1 arm64

interactive processes viewer

libauthen-oath-perl/noble 2.0.1-2 all

Perl module for OATH One Time Passwords

marvinbutleriii@node1:~$ htop

bash: /usr/bin/htop: No such file or directory

**WILL be REMOVED Mistake & Recovery:**

### Answer:

marvinbutleriii@node1:~$ apt search ubuntu-server

Sorting... Done

Full Text Search... Done

fortunes-ubuntu-server/noble 0.5 all

Ubuntu server tips for fortune

ubuntu-server/noble-updates 1.539.2 arm64

Ubuntu Server system

ubuntu-server-minimal/noble-updates,now 1.539.2 arm64 [installed]

Ubuntu Server minimal system

ubuntu-server-raspi/noble-updates 1.539.2 arm64

Ubuntu Server system for Raspberry Pi

marvinbutleriii@node1:~$ sudo apt install ubuntu-server

Reading package lists... Done

Building dependency tree... Done

Reading state information... Done

The following NEW packages will be installed:

ubuntu-server

0 upgraded, 1 newly installed, 0 to remove and 25 not upgraded.

Need to get 11.0 kB of archives.

After this operation, 17.4 kB of additional disk space will be used.

Get:1 http://ports.ubuntu.com/ubuntu-ports noble-updates/main arm64 ubuntu-server arm64 1.539.2 [11.0 kB]

Fetched 11.0 kB in 1s (15.7 kB/s)

Selecting previously unselected package ubuntu-server.

(Reading database ... 228673 files and directories currently installed.)

Preparing to unpack .../ubuntu-server_1.539.2_arm64.deb ...

Unpacking ubuntu-server (1.539.2) ...

Setting up ubuntu-server (1.539.2) ...

Scanning processes...

Scanning candidates...

Scanning linux images...

Running kernel seems to be up-to-date.

Restarting services...

Service restarts being deferred:

/etc/needrestart/restart.d/dbus.service

systemctl restart gdm.service

systemctl restart unattended-upgrades.service

No containers need to be restarted.

User sessions running outdated binaries:

marvinbutleriii @ session #2: gdm-session-wor[1688]

marvinbutleriii @ user manager service: at-spi-bus-laun[1883], bash[26422], gnome-shell[1897], systemd[1702]

No VM guests are running outdated hypervisor (qemu) binaries on this host.

marvinbutleriii@node1:~$ apt search ubuntu-server

Sorting... Done

Full Text Search... Done

fortunes-ubuntu-server/noble 0.5 all

Ubuntu server tips for fortune

ubuntu-server/noble-updates,now 1.539.2 arm64 [installed]

Ubuntu Server system

ubuntu-server-minimal/noble-updates,now 1.539.2 arm64 [installed]

Ubuntu Server minimal system

ubuntu-server-raspi/noble-updates 1.539.2 arm64

Ubuntu Server system for Raspberry Pi

1. _Read the "WILL be REMOVED" list carefully:_ Always look for surprise packages in that list. If you see something core (like `ubuntu-server`, `opennssh-server`, or `kernel` files) in that list, stop. Hit `n` and investigate why.
2. _`autoremove` vs `remove`:_ When I ran `sudo apt autoremove htop`, the system told me it wasn't installed. That's because `autoremove` is intended to clean up orphaned dependencies (packages that were installed as requirements for other things but are no longer needed). Since you had already successfully uninstalled `htop` and its parent meta-package, `autoremove` had nothing left to do.
3. Since I effectively removed `ubuntu-server` (the meta-package), I reinstalled to ensure my system is back to its intended status: `sudo apt install ubuntu-server`.
4. _Investigate:_ When you see a "core" package being pulled in, it's usually because of a "Metapackage" dependency. You can investigate why it's heppening by runnign `apt-cache rdepends [package-name]` to see what else relies on it, or simply `apt-cache show [package-name] to read its description.

- Noticed `ubuntu-server-minimal` is still [installed]. this was actually a good sign!
- `ubuntu-server-minimal` : Provides the absolute bare essentials to boot, network, and manage packages.
- `ubuntu-server` (the one I accidentally removed): Is a "convenience" metapackage. It pulls in a bunch of "nice-to-have" server utilities (like `htop`, `landscape-common`, etc.) that make a server "comfortable" to use.

- **The "Is it worth it?" Test:** In this specific case, `htop` is a tiny utility. If `apt` gells you that removing a tiny utility also removes a core meta-package like `ubuntu-server`, the anser is almost always: "It is not worth the risk".
- **The "I absolutely need it gone" approach (The Professional way):** If I had to remove `htop` and the system was insisting on taking `ubuntu-server` with it, I would use these steps:
- Step A: Check the "why" (The most important part) Run `apt-cache depends ubuntu-server` or `apt-rdepends ubuntu-server`. This shows the dependency tree. You might discover that `ubuntu-server` isn't actually "broken" without `htop`, but rather it's just configured to include it.
- Step B: The "Making" Strategy; I can tell `apt` that `htop` is no longer "automatically installed".
- `sudo apt-mark manual htop`
- this stops the system from treating it as a dependency for the meta-package. Sometimes, just changing the "install type" prevents the system from wanting to rip it out.
- Step C: The Force (Use with extreme Caution); Don't use fo now it's very risky!
- `dpkg --force-all` command is the "nuclear option"-it will break my package database and make future updates a nightmare.

### Architect's Decision Log:

- **Date:** 2026-06-25 7:20pm
- **Task:** Triage & Rescue
- **Outcome:** Successfully identified "ERRORS" with time and line number when `grep -ni "error" system_*` was applied. Resolved by updating vim with those said errors, files they were in, time and line numbers.
- **Reflection:** This confirmed how system folders containing errors in their files can fail.

- **Date:** 2026-06-25
- **Task:** Permission Lockdown Lab
- **Outcome:** Successfully identified "Permission denied" error when `chmod 000` was applied. Resolved by restoring read permissions.
- **Reflection:** This confirmed how system services might fail if they lack access to critical configuration files.

- **Date:** 2026-7-2
- **Task:** Environment Configuration
- **Outcome:** I successfully created and assigned a permanent environment variable to use frequently. Navigated .bashrc and used .bash_profile to write a script and to source .bashrc.
- **Reflection:**

- **Date:** 2026-7-2
- **Task:** System Administration
- **Outcome:** I successfully added a new user with `sudo useradd newtech`, setup user and assigned permissions "rw" with `chmod` command to a new file I added with the new user using `sudo touch hire.txt` command.

- **Date:** 2026-7-2
- **Task:** I completed the full cycle: Create -> Permissions -> Move -> Pathing -> Execution.
- **Outcome:** The $PATH realization: I saw the shell looks through a list of directories in order. By using `export PATH=$PATH:/home/marvinbutleriii`, I told the system, "check all the original folders, but if you don't find the command there, also check my home directory".

- Decision:
- Context:
- Consequence:

- **Date:** 2026-7-2
- **Task:** Fixing Missing Shell onfigurations"
- **Outcome:** I now understand the "User Creation Lifecycle":

1. Account Registration: Updating `/etc/passwd`.
2. Environment Providioning: Creating the directory (`mkdir`).
3. Skeleton Copying: Populating the directory with defaults from `/etc/skel`.
4. Ownership/Permission Audit: Setting `chown` and `chmod`.

- Decision:
- Context:
- Consequence:

- **Date:** 2026-7-9
- **Task:** The System Admin Lab: Package Lifecycle Management
- **Outcome:** I completed a packages lifestyle, managed it and recoverd a deleted server.

- Decision:
  Updated, installed, deleted, recovered delted mestakes, and confirmed package and dependencies were removed.
- Context:
  As a good safety and time saving measure I checked for updates before moving foward to install `htop`. From there checked if it was installed and where. Next, I ran it and then deleted it and it's dependencies with `remove` and `autoremove` commands.
- Consequence:
  I did delete the `ubuntu-server` by mistake and reinstalled it learning a huge lesson there, "always read carefully what you're deleting before typing the `Y` command and sometimes deleting a certain package isn't worth it and better ignored. Lastly, I learned ways around deleting the package (i.e., changing the package from a dependency of the meta-package by changing it's install type).

- **Date:**
- **Task:**
- **Outcome:**

- Decision:
- Context:
- Consequence:

- **Date:**
- **Task:**
- **Outcome:**

- Decision:
- Context:
- Consequence:
