# Technical spec

Starter, not an approved specification. Record decisions, not a catalogue of possible technologies.

## Design

- Prefer plain HTML, JavaScript, and Canvas 2D with simple drawn shapes; explain the choice briefly. Keep generated code in `app/`. No backend, API, or game engine is required.
- Separate state updates and game rules from rendering and keyboard events, so tests can call the same logic the game uses.
- Define player/enemy positions, score, lives, collision protection, and playing/game-over states. Specify collision detection and a complete restart without duplicate animation loops or event handlers.
- Use an animation loop with elapsed-time-based movement, not a fixed distance per frame. Define keyboard handling, screen boundaries, and behaviour when focus is lost or a tab resumes after a long gap.

## Verification and running

- Map each functional criterion ID to an automated test or an explicit browser check. Test game logic with controlled positions, randomness, and time: collecting once, collision protection, boundaries, restart, and comparable movement over equal time at different frame rates.
- Separately play the game to check rendering, continuous keyboard input, game over, and restart. Logic tests alone cannot verify those interactions.
- Define how to open/run and test from `app/`, usable on Windows without WSL. Prefer the installed Node.js test runner for logic tests; don't require additional tools or assume scripts exist before creating them.
- Record actual results in `TEST_RESULTS.md`: criterion ID, check/command, expected versus observed result, and passed/failed/not run.

## Open questions and changes

Resolve blocking technical choices before coding. Record any later decision that changes the agreed behavior or test approach.
