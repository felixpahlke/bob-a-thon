# Functional spec

Starter, not an approved specification. Fill this in with Bob before implementation; keep it brief.

## Goal and scope

- What is the game's theme, and what is the player's goal?
- What is deliberately out of scope?

## Game rules

Agree controls and screen boundaries, collectible points, enemy movement, lives, and protection after a collision. Describe game over and what restart resets. Decide what happens when the player switches to another tab.

## Acceptance criteria

Agree 3–5 criteria with stable IDs (`AC-01`, `AC-02`, …). Describe an action or condition and an observable result. Cover movement, scoring, collision/life loss, and game over/restart.

Example to adapt: **AC-01** — After touching an enemy, the player loses exactly one life and cannot lose another during the next second, even if the sprites remain in contact.

## Open questions and changes

Resolve blocking questions before coding. For later changes, note the affected criterion and why it changed.
