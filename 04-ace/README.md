# 4 · Build an App Connect integration

Generate, build, and call a real weather API.

Choose this lab or the [ODM lab](../04-odm-mode/README.md) for Step 4.

## What are we building?

The weather MCP gave **Bob** tools. This integration gives **other applications** an HTTP endpoint they can call without Bob. It validates coordinates, calls Open-Meteo, and returns weather data or a useful error.

- A **message flow** connects processing steps; **ESQL** supplies logic for validation and handling data.
- A **BAR file** packages the integration for deployment. The **integration server** runs it; the **Toolkit** lets you view and edit it visually. [ACE deployment concepts](https://www.ibm.com/docs/en/app-connect/13.0.x?topic=software-deploying-integration-solutions).
- The **ACE Developer mode** includes the original mode's seven rule files, with separate [workshop adjustments](.bob/rules-ace-developer/8_workshop-adjustments.md). The bundled **skills** supply instructions and examples for ACE project files, flows, and ESQL. They do not replace the ACE runtime.

## Without ACE installed: prepare and review

- Open this folder in Bob and select **ACE Developer**. Ask:

  > Prepare the integration in LAB.md, including project files and tests. ACE is not installed, so don't build or deploy. Use the bundled skills, review the files, and list what you checked and what remains unverified.

- Ask Bob to explain the request flow and show where invalid coordinates and upstream failures are handled.

**Done when:** the source files are prepared and reviewed, with build and runtime checks explicitly marked unverified. No ACE download is needed for this path.

## With ACE installed: build and run

Use this path if **IBM App Connect Enterprise 13**, including its build tools and runtime, is already installed. Evaluation Edition is sufficient; a Java installation alone is not. No cloud runtime is needed.

- On **Windows**, open **IBM App Connect Enterprise Console** from the Start menu. Run `mqsiversion` to check the command environment. Bob's terminal also needs the ACE environment; ask Bob to locate the installed `mqsiprofile.cmd` and run ACE commands through it in the same Command Prompt process. [IBM command-environment guide](https://www.ibm.com/docs/en/app-connect/13.0.x?topic=tasks-setting-up-command-environment).
- In that console, create and start a local server. Replace the example path with your checkout's location and keep the console running:

  ```text
  mqsicreateworkdir "C:\work\bob-a-thon\04-ace\.workdir"
  IntegrationServer --work-dir "C:\work\bob-a-thon\04-ace\.workdir" --name weather-lab
  ```

- Open this folder in Bob. Select **ACE Developer**; the mode and focused ACE skills are included. Ask:

  > Create an ACE 13 weather integration using LAB.md. Build it, deploy it to my local integration server, and test it. First verify that the ACE commands are available; tell me if installation or environment setup is still missing.

- Optionally import the generated project into ACE Toolkit with **File → Open Projects from File System** to see the flow visually. Bob can build, deploy, and test through the installed ACE command-line tools.
- Run `node test-api.mjs`. Then ask for one improvement, rebuild, and test again.

**Done when:** the BAR builds, the deployed endpoint returns live weather, and invalid input returns a clear error.

The lab materials are prepared; the ACE build/deployment needs rehearsal on your installed ACE version. Generated files alone do not count as a successful run.

For a facilitator rehearsing on macOS: use **Open Integration Console** in the Toolkit and replace the Windows work-directory path with your local absolute path.

[Next: Spec-driven development](../05-spec-driven-development/README.md) · [Workshop guide](../README.md) · [Other Step 4 choice: ODM](../04-odm-mode/README.md)
