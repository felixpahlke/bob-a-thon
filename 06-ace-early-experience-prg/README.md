# 6 · ACE Toolkit and IBM Bob

Use IBM Bob Shell inside the IBM App Connect Enterprise Toolkit to speed up flow authoring — generate new flows, analyse existing ones, and summarise ESQL transformations with AI assistance.

## What is IBM Bob Shell in ACE?

IBM Bob is an AI-powered development partner designed to assist throughout the Software Development Life Cycle. While Bob is commonly used as a VS Code plugin, this lab uses the **IBM Bob Shell** — a terminal-based interface that slots directly into the ACE Toolkit environment.

- Bob can read and write files, run shell commands, and invoke tools via MCP (Model Context Protocol).
- **Skills** are reusable instruction sets that teach Bob specialised workflows. The [ace-bob skill](https://github.com/ot4i/ace-bob) ensures generated ACE projects include all required Eclipse metadata so they import cleanly into the Toolkit without errors.
- Bob adapts to different situations through purpose-built **modes** that optimise its behaviour.

## Setup

Before working through the exercises you need to install and configure a few things:

- Install **Node.js LTS** and the **IBM Bob Shell** via PowerShell.
- Register for the **IBM Bob free trial** at [bob.ibm.com](https://bob.ibm.com) using your IBMid. Bob usage is metered in Bobcoins — a free trial allocation is provided.
- Add the IBM Bob Shell as a terminal inside the ACE Toolkit (**Window > Preferences > Terminal > Local Terminal**) and point it at your Eclipse workspace.
- Clone the **ace-bob skill** from GitHub into the `.bob` folder inside your Toolkit workspace.

## Exercises

### Exercise 1 · Create a simple HTTP flow

Ask Bob to generate a complete ACE application project containing a message flow that receives HTTP input and echoes it back to the caller. Bob will create all required Eclipse metadata files alongside the flow, and guide you through importing the result into your Toolkit workspace.

### Exercise 2 · Summarise an existing flow

Import the **Transformation using ESQL** tutorial project from the Toolkit's Tutorials Gallery, then ask Bob to analyse and explain the message flow — including a summary of the Compute node's ESQL logic.

### Exercise 3 · Create a file flow and test it end-to-end

Ask Bob to generate a message flow that reads an XML file from a project directory, transforms it to JSON using a Compute node, and writes the result to an output file. Then deploy the application to a local Integration Server and verify that the file is processed correctly.

**Done when:** you have generated an HTTP echo flow, obtained an AI summary of an ESQL transformation, and deployed and tested a file-processing flow end-to-end.

**Explore further:** You will have Bobcoins remaining after the exercises — try your own prompts. Suggestions for improving the ace-bob skill are welcome.

Work through the detailed step-by-step instructions in [26L02-ACEToolkitAndIBMBob.pdf](26L02-ACEToolkitAndIBMBob.pdf).

[IBM Bob](https://bob.ibm.com) · [ace-bob skill on GitHub](https://github.com/ot4i/ace-bob) · [Workshop guide](../README.md).
