#!/usr/bin/env bash

# This script is based on the original pretty-format-check script by Jared Christensen, 
# which can be found at: https://jareddesign.medium.com/making-nx-format-check-prettier-dc34924d214d

set -eu

SEPARATOR="----------------------------------------"

# Detect if stdout is a TTY (for color support)
if [ -t 1 ]; then
  RED='\033[0;31m'
  GREEN='\033[0;32m'
  CYAN='\033[0;36m'
  NC='\033[0m'
else
  RED=''
  GREEN=''
  CYAN=''
  NC=''
fi

# Run Nx format check with all forwarded arguments
# Temporarily disable exit-on-error so we can capture output + exit code
set +e
output=$(pnpm nx format:check "$@" 2>&1)
result=$?
set -e

# Check if the command failed
if [ $result -ne 0 ]; then
  printf "%b\n" "${RED}${SEPARATOR}"
  printf "%b\n" "Error: Formatting check failed"
  printf "%b\n" "${SEPARATOR}${NC}"
  printf "\n%b\n\n" "Files with formatting issues:"
  printf "%s\n\n" "$output"
  printf "%b\n" "${CYAN}Please run 'pnpm nx format:write $*' to fix formatting issues.${NC}"
  exit $result
fi
echo -e "${GREEN}Formatting check passed successfully.${NC}"
