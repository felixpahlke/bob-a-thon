# 5 · Build your own arcade game

Build something that moves: steer a character, collect items, and dodge enemies. The challenge is to agree on the game rules before Bob writes code.

**Starting idea: Dodge & Collect.** Move with arrow keys or WASD, collect stars for points, lose lives when you hit an enemy, and restart after game over. Choose your own theme—spaceship, hungry robot, submarine—or propose another small action game.

## What is spec-driven development?

In Lab 1, you planned in a conversation. Here, you keep that agreement in files and use it to guide implementation, tests, and later changes.

- The [functional spec](FUNCTIONAL_SPEC.md) describes player-visible behaviour: **what** the game should do.
- The [technical spec](TECHNICAL_SPEC.md) records **how** it will work: game state, animation, and technical choices.
- **Acceptance criteria** make rules checkable. “Collisions should feel fair” is vague; “After a hit, the player loses one life and is protected from further hits for one second” can be tested.

A spec is an agreement you can revise, not a guarantee that generated code is correct. Keep it short and review Bob's assumptions yourself.

## Agree before building

- Open this folder in Bob and select **Plan** mode. A browser game using plain JavaScript and Canvas 2D is enough; no API, backend, game engine, or downloaded art is required.
- Start with:

  > Help me specify a small browser arcade game. Start with Dodge & Collect: move a character, collect items, and dodge moving enemies. Ask about my theme and unclear game rules first. Use FUNCTIONAL_SPEC.md and TECHNICAL_SPEC.md as starters. Agree a small scope, 3–5 acceptance criteria with IDs, and simple technology choices with me. Prefer plain JavaScript and Canvas 2D with no extra required tools. Do not implement yet.

- Agree how movement, scoring, collisions, and game over work. Can the player leave the screen? How long is protection after a hit? What resets on restart? Keep multiplayer, accounts, and extra levels out of the first version.
- Have Bob save the agreed specs. If Plan mode cannot edit these files, switch to **Agent** and ask it to save only the specs. Read both files and resolve open questions before authorizing code.

## Build and check the agreement

- In **Agent** mode, ask:

  > Implement the two agreed specs in app/. Keep changes inside this lab. Separate game rules from drawing so you can test the actual movement, scoring, collision, and restart logic. Create and run tests linked to the acceptance-criterion IDs, then run the game and tell me how to open it. Ask before changing an agreed rule. Record automated results and browser checks in TEST_RESULTS.md; mark anything not checked as not run.

- Play it: hold a movement key, reach an edge, collect an item, hit an enemy, and restart after game over. Ask Bob to show which code and test implement one rule. A passing logic test does not prove that controls or animation work in the browser.
- Use controlled positions and elapsed time for repeatable tests, not random gameplay. Ask Bob to check that movement speed does not depend on frame rate. The repository's root `npm test` does not test your generated game.

## Change the rules, then the game

- Request one change: a shield, increasing difficulty, or a new enemy type. Ask Bob to propose the spec changes and affected tests **before** editing the implementation.
- Review the new criterion, approve it, then have Bob update the game and rerun tests. Record the reason for the spec change; don't weaken a criterion just to make a failing test pass.

**Done when:** you can play and restart the game, results distinguish passed/failed/not run, and one requested rule change is reflected in the specs, code, and tests.

**Discuss:** What ambiguity did you catch before coding? Where would a quick prompt have been enough, and where did the written agreement help?

Inspired by [Bob-On-Tour Lab 5](https://github.com/d-schreiter/Bob-On-Tour/tree/main/lab5). [Workshop guide](../README.md).
