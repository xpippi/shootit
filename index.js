const path = require('path');
const captureWebsite = require('capture-website');
const core = require('@actions/core');
const artifact = require('@actions/artifact');
const loadInputs = require('./lib/load-inputs');
const whichChrome = require('./lib/which-chrome');

async function run() {
  try {
    // Get inputs: source, destination, and anything else
    const { source, destination: destFile, ...inputs } = loadInputs();
    core.debug(`source is ${source}`);
    core.debug(`destination is ${destFile}`);
    core.debug(`other inputs are ${JSON.stringify(inputs, null, 4)}`);

    // Get destination
    const destFolder = process.env.RUNNER_TEMP;
    const dest = path.join(destFolder, destFile);

    // Locate Google Chrome executable
    const executablePath = await whichChrome();
    core.debug(`executablePath is ${executablePath}`);

    // Options for capture
    const options = {
      launchOptions: {
        executablePath
      },
      ...inputs
    };

    // Capture and write to dest
    await captureWebsite.file(source, dest, options);

    // Create an artifact
    const artifactClient = artifact.create();
    const artifactName = destFile.substr(0, destFile.lastIndexOf('.'));
    const uploadResult = await artifactClient.uploadArtifact(artifactName, [dest], destFolder);

    // Expose the path to the proof as an output
    core.setOutput('path', dest);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
