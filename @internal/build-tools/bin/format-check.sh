#!/usr/bin/env bash

# This script is based on the original pretty-format-check script by Jared Christensen,
# which can be found at: https://jareddesign.medium.com/making-nx-format-check-prettier-dc34924d214d
#
# Checks formatting with oxfmt, but only for files changed between a base and a head
# commit, mirroring how `nx format:check` used to behave. In CI the range comes from
# NX_BASE/NX_HEAD (set by nrwl/nx-set-shas); locally it defaults to the merge base
# with origin/main.
#
# TODO: replace with a plain `oxfmt --check` once the whole repo has been reformatted.

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

if [ -n "${NX_BASE:-}" ]; then
  base="$NX_BASE"
elif ! base=$(git merge-base HEAD origin/main 2>/dev/null); then
  printf "%b\n" "${RED}Error: could not find origin/main. Fetch it, or set NX_BASE to the commit to compare against.${NC}"
  exit 1
fi

# Added, copied, modified or renamed files. With NX_HEAD (CI) compare two commits;
# without it (locally) compare against the working tree and include untracked files.
list_changed_files() {
  if [ -n "${NX_HEAD:-}" ]; then
    git diff -z --name-only --diff-filter=ACMR "$base" "$NX_HEAD"
  else
    git diff -z --name-only --diff-filter=ACMR "$base"
    git ls-files -z --others --exclude-standard
  fi
}

# oxfmt skips file types it doesn't format, and the ignore patterns in .oxfmtrc.json
# still apply to files passed explicitly.
files=()
while IFS= read -r -d '' file; do
  files+=("$file")
done < <(list_changed_files)

if [ ${#files[@]} -eq 0 ]; then
  echo -e "${GREEN}No changed files to check.${NC}"
  exit 0
fi

# Temporarily disable exit-on-error so we can capture output + exit code
set +e
output=$(pnpm exec oxfmt --check --no-error-on-unmatched-pattern -- "${files[@]}" 2>&1)
result=$?
set -e

if [ $result -ne 0 ]; then
  printf "%b\n" "${RED}${SEPARATOR}"
  printf "%b\n" "Error: Formatting check failed"
  printf "%b\n" "${SEPARATOR}${NC}"
  printf "\n%s\n\n" "$output"
  printf "%b\n" "${CYAN}Run 'pnpm format <files>' to fix formatting issues.${NC}"
  exit $result
fi
echo -e "${GREEN}Formatting check passed successfully.${NC}"
