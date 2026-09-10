# 1 · Build an app

Finish with an app you made your own.

## Before you start

Bob can work on project files and run commands, not just suggest code in chat. Use **Agent** mode to build; **Ask** is for explanations and **Plan** for thinking through a solution. [About Bob's modes](https://bob.ibm.com/docs/ide/features/modes).

The useful habit here is simple: describe an outcome, try the result, then give feedback. You don't need a perfect first prompt. When something fails, tell Bob what you expected and what actually happened; include the error if there is one. Review requested commands and changes before approving them.

## Plan together

- Open this folder in Bob and select **Plan** mode.
- Start with this prompt:

  > Help me plan a to-do app. Before writing code, ask me a few questions about the features and design I want. Suggest a simple technology approach, explain the trade-offs briefly, and keep additional installations to a minimum. Let's agree on a small first version.

- Discuss what matters to you: features, appearance, and how tasks should be saved. Ask why Bob recommends its technology choices; you don't need to know the technologies already.
- Agree on a short plan. A useful starting point is adding, completing, and deleting tasks, with tasks kept after refreshing. Keep extra ideas for later.

## Build and try it

- Switch to **Agent** mode in the **same conversation**, then ask:

  > Build the version we agreed on. Run it, tell me how to open it, and help me test it.

- Open the app and check the agreed features. Add a task, complete it, and refresh the page to check that it stays saved.
- Ask Bob to create and run a few automated tests for the agreed features. Have it explain what they check; rerun them after your next change.
- Make it yours: ask for categories, search, a new look, or a feature you would actually use.
- If something breaks, describe what happened and let Bob fix it.

**Done when:** your app matches the agreed plan, works after a refresh, and includes one change you requested.

[Next: Data to dashboard](../02-contoso-dashboard/README.md) · [Workshop guide](../README.md)
