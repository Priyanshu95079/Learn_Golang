#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
#  Publish this folder to GitHub Pages.
#
#    ./publish.sh                          # asks for what it needs
#    ./publish.sh <username> [repo-name]   # non-interactive
#
#  If the GitHub CLI (gh) is installed and logged in, this does EVERYTHING:
#  creates the repo, pushes, turns on Pages, and prints the live URL.
#  Otherwise it falls back to plain git and tells you the two clicks to finish.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO="${2:-go-roadmap}"
BRANCH="main"

say()  { printf '\n\033[1;36m%s\033[0m\n' "$*"; }
ok()   { printf '\033[0;32m✓\033[0m %s\n' "$*"; }
warn() { printf '\033[0;33m!\033[0m %s\n' "$*"; }
die()  { printf '\033[0;31m✗\033[0m %s\n' "$*" >&2; exit 1; }

command -v git >/dev/null || die "git is not installed. https://git-scm.com/downloads"
[ -f index.html ] || die "Run this from inside the go-roadmap-site folder (index.html not found)."

# ── commit locally ──────────────────────────────────────────────────────────
say "Preparing the commit"
[ -d .git ] || { git init -q; ok "initialised a repository"; }
git add -A
if git diff --cached --quiet 2>/dev/null; then
  ok "nothing new to commit"
else
  git -c user.email="${GIT_AUTHOR_EMAIL:-$(git config user.email 2>/dev/null || echo you@example.com)}" \
      -c user.name="${GIT_AUTHOR_NAME:-$(git config user.name 2>/dev/null || echo 'Roadmap')}" \
      commit -qm "feat: Golang learning roadmap site"
  ok "committed"
fi
git branch -M "$BRANCH"

# ── path A: gh CLI ──────────────────────────────────────────────────────────
if command -v gh >/dev/null && gh auth status >/dev/null 2>&1; then
  OWNER="$(gh api user --jq .login)"
  ok "GitHub CLI authenticated as $OWNER"

  say "Creating $OWNER/$REPO and pushing"
  if gh repo view "$OWNER/$REPO" >/dev/null 2>&1; then
    warn "$OWNER/$REPO already exists — pushing to it"
    git remote remove origin 2>/dev/null || true
    git remote add origin "https://github.com/$OWNER/$REPO.git"
    git push -u origin "$BRANCH" --force-with-lease
  else
    gh repo create "$REPO" --public --source=. --remote=origin --push \
      --description "Golang learning roadmap — 32 units, Get Set GO syllabus"
  fi
  ok "pushed"

  say "Turning on GitHub Pages"
  if gh api --method POST "repos/$OWNER/$REPO/pages" \
       -f 'source[branch]=main' -f 'source[path]=/' >/dev/null 2>&1; then
    ok "Pages enabled"
  else
    warn "Pages may already be on (or needs a moment) — continuing"
  fi

  URL="$(gh api "repos/$OWNER/$REPO/pages" --jq .html_url 2>/dev/null || echo "https://$OWNER.github.io/$REPO/")"
  cat <<EOF

──────────────────────────────────────────────────────────────
  Repository : https://github.com/$OWNER/$REPO
  Live site  : $URL
──────────────────────────────────────────────────────────────
  First build takes about a minute. If you get a 404, wait and refresh.
EOF
  exit 0
fi

# ── path B: plain git ───────────────────────────────────────────────────────
warn "GitHub CLI not found or not logged in — using plain git."
warn "Tip: 'gh auth login' after installing https://cli.github.com makes this fully automatic."

USER="${1:-}"
if [ -z "$USER" ]; then read -rp $'\nYour GitHub username: ' USER; fi
[ -n "$USER" ] || die "A username is required."

say "Create an EMPTY repository named '$REPO'"
echo "  → https://github.com/new"
echo "  → Do NOT tick 'Add a README' — an existing file will reject the push."
read -rp $'\nPress Enter once the empty repo exists… '

git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$USER/$REPO.git"
git push -u origin "$BRANCH"
ok "pushed"

cat <<EOF

──────────────────────────────────────────────────────────────
  Repository : https://github.com/$USER/$REPO
──────────────────────────────────────────────────────────────

  One click left — switch on Pages:

    Settings → Pages
      Source : Deploy from a branch
      Branch : main   /   (root)
      Save

  Your site, about a minute later:
    https://$USER.github.io/$REPO/
EOF
