# Optional · Build an App Connect integration

**45 minutes after setup · Generate, build, and call a real weather API.**

- Install **IBM App Connect Enterprise 13 Evaluation Edition**, including the Toolkit and runtime. [IBM installation guide](https://www.ibm.com/docs/en/app-connect/13.0.x?topic=enterprise-download-ace-developer-edition-get-started). A Java installation alone is not enough. No cloud runtime is needed.
- Open the ACE command console (`Open Integration Console` in the Toolkit on macOS). Run `mqsiversion` to check the command environment. Bob's terminal must have the same ACE environment; ask Bob to check this before building.
- In that console, create and start a local server using an absolute work-directory path:

  ```text
  mqsicreateworkdir "<absolute-path-to-this-folder>/.workdir"
  IntegrationServer --work-dir "<absolute-path-to-this-folder>/.workdir" --name weather-lab
  ```

- Open this folder in Bob. Select **ACE Developer**; the mode and focused ACE skills are included. Ask:

  > Create an ACE 13 weather integration using LAB.md. Build it, deploy it to my local integration server, and test it. First verify that the ACE commands are available; tell me if installation or environment setup is still missing.

- Import the generated project into ACE Toolkit with **File → Open Projects from File System**. Ask Bob to explain the request flow.
- Run `node test-api.mjs`. Then ask for one improvement, rebuild, and test again.

**Done when:** the BAR builds, the deployed endpoint returns live weather, and invalid input returns a clear error.

The lab materials are prepared; the ACE build/deployment needs rehearsal on your installed ACE version. Generated files alone do not count as a successful run.
