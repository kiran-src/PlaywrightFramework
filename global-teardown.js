const { exec } = require('child_process');

// Utility function to wrap exec in a Promise
const execPromise = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
      } else if (stderr) {
        reject(`stderr: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
};

module.exports = async () => {
  console.log("Generating Allure report...");

  try {
    // Generate the report
    await execPromise('allure generate ./allure-results --clean');
    console.log("Allure report generated successfully.");

    // // Open the report
    // await execPromise('npx allure open ./allure-report');
    // console.log("Allure report opened successfully.");
  } catch (error) {
    console.error(error);
  }
};
