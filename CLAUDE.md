# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

This is a collection of self-contained retro arcade games. Each game is a single `.html` file with no dependencies, build step, or package manager. Open any file directly in a browser to play.

## Architecture

Each game is fully self-contained in one HTML file: markup, styles, and game logic all in a single `<script>` tag. There is no shared code between games.

- `spaceshooter.html` — Space Invaders clone using HTML5 Canvas with pixel-perfect rendering (`image-rendering: pixelated`). Game loop uses `requestAnimationFrame`. Logical resolution is 480×640, scaled up via CSS.
- `tictactoe.html` — Two-player Tic-Tac-Toe with pure CSS/DOM rendering (no canvas).

## Adding a New Game

Create a new `.html` file. Follow the existing pattern: fully self-contained, no external scripts or stylesheets, retro dark aesthetic. Add an entry to `README.md`.

## Git

The `.gitignore` excludes `.claude/`, `*.exe`, and `*.bat` — these are local tooling and should not be committed.

Commit and push to GitHub regularly as work progresses — after each meaningful change, not just at the end. Use clean, descriptive commit messages. This ensures no work is ever lost and progress is always visible on the remote.
