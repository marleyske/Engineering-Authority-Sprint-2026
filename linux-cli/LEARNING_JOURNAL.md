### 1. The "Triage & Rescue" Lab (Simulation)

This lab simulates the exact work of an autonomous vehicle support specialist: finding a specific error in a large file and documenting it.

* **The Setup:** Create a folder called `log_simulation`. Inside it, create 5 dummy log files (e.g., `system_1.log`, `system_2.log`, etc.).
* **The Task:** Use `cat` or `grep` to search through those files to find a specific string (e.g., "ERROR: Connection Lost").
* **The Documentation:** Once you find the error, use `nano` or `vim` to create a new file named `incident_report.txt`. In that file, log the filename where the error was found, the time (you can make this up), and a brief description of how you found it.
* **Why this works:** It forces you to use `grep`, file navigation, and documentation—the three pillars of the role you applied for.

### 2. The "Permissions Lockdown" Lab

Support specialists often have to troubleshoot why a system service cannot access a file.

* **The Setup:** Create a file called `sensitive_data.txt`. Use `chmod` to remove all read/write permissions from it (`chmod 000 sensitive_data.txt`).
* **The Task:** Try to read the file using `cat`. It should fail with a "Permission denied" error.
* **The Fix:** Use `chmod` to add read permissions back so you can read it again.
* **The Pro-Move:** Try to change the owner of a file using `chown` (you may need `sudo` for this). Understanding how ownership (`user:group`) and permissions (`rwx`) work together is a fundamental skill for any technical support role.

### 3. Mastering the "Pipe" (`|`)

You are currently studying pipes, which is the ultimate tool for a Support Specialist.

* **The Task:** Combine commands to become more efficient.
* Instead of just listing files with `ls`, try `ls -l | grep "log"`. This command lists all files and *filters* the output to only show files with "log" in the name.
* Use `history | grep "ssh"` to find every time you have used the SSH command in your bash history.




* **Why this works:** This is exactly how you will "triage" data in a real-world environment. You will be filtering massive amounts of system output to find the *one* piece of information that matters.

### 4. Professionalizing your "Architect's Decision Log"

Since you are already keeping this log, use it to track these labs!

* Every time you complete one of these mini-labs, add an entry to your `LEARNING_JOURNAL.md`.
* **Format:**
* **Date:** 2026-06-25
* **Task:** Permission Lockdown Lab
* **Outcome:** Successfully identified "Permission denied" error when `chmod 000` was applied. Resolved by restoring read permissions.
* **Reflection:** This confirmed how system services might fail if they lack access to critical configuration files.



**My suggestion for your flow:** Spend 30 minutes a day on one of these "labs" rather than just watching more video content. If you can explain *why* a command worked (or why it failed) in your journal, you will walk into an interview with the confidence of someone who has actually been "in the trenches."

**Does this "Lab" approach feel like a good way to get those reps in without feeling like you're just staring at a screen?**
