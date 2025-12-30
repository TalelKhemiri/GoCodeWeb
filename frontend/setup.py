import os
import sys
import subprocess
import shutil

# Colors for terminal output
GREEN = '\033[92m'
YELLOW = '\033[93m'
RED = '\033[91m'
RESET = '\033[0m'

REQUIRED_NPM_PACKAGES = [
    "axios",
    "react-router-dom",
    "lucide-react",
    "framer-motion",
    "react-toastify" # Good for notifications
]

def print_step(message):
    print(f"\n{GREEN}========================================{RESET}")
    print(f"{GREEN}>>> {message}{RESET}")
    print(f"{GREEN}========================================{RESET}")

def run_command(command, ignore_errors=False):
    try:
        # Use shell=True for npm commands on Windows/Linux compatibility
        subprocess.check_call(command, shell=True)
    except subprocess.CalledProcessError:
        if not ignore_errors:
            print(f"{RED}Error running: {command}{RESET}")
            sys.exit(1)
        else:
            print(f"{YELLOW}Warning: Command failed but continuing...{RESET}")

def check_node():
    print_step("Checking for Node.js...")
    try:
        subprocess.check_call(["node", "-v"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"{GREEN}Node.js is installed.{RESET}")
    except (OSError, subprocess.CalledProcessError):
        print(f"{RED}ERROR: Node.js is not installed!{RESET}")
        print(f"{YELLOW}Please download it from: https://nodejs.org/ (LTS version){RESET}")
        sys.exit(1)

def install_dependencies():
    print_step("Installing Basic Dependencies (npm install)...")
    
    # 1. Standard Install (reads package.json)
    run_command("npm install")

    # 2. Install specific libraries we need for your code
    print_step("Installing Required Libraries...")
    packages = " ".join(REQUIRED_NPM_PACKAGES)
    run_command(f"npm install {packages}")

def start_server():
    print_step("Starting Frontend Server...")
    print(f"{YELLOW}Frontend will be available at: http://localhost:5173{RESET}")
    run_command("npm run dev")

def main():
    if not os.path.exists("package.json"):
        print(f"{RED}Error: package.json not found.{RESET}")
        print(f"{YELLOW}Make sure you are running this script inside the 'frontend' folder.{RESET}")
        return

    check_node()
    
    # Ask mode
    print(f"\n{YELLOW}Select Mode:{RESET}")
    print("1. First Time Setup (Install Everything)")
    print("2. Just Run (Start Server)")
    choice = input("Enter 1 or 2: ").strip()

    if choice == '1':
        install_dependencies()
    
    start_server()

if __name__ == "__main__":
    main()
