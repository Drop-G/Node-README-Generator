// call the dependencies
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// initiate prompt
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Give your repository a unique title",
            name: "Title"
        }, {
            type: "input",
            message: "Decribe you repository, what is the purpose of this project?",
            name: "Description"
        }, {
            type: "input",
            message: "create a table of contents for you Repository",
            name: "TableOfContents"
        }, {
            type: "input",
            message: "Please add installation instructions",
            name: "Install"
        }, {
            type: "input",
            message: "In depth usage information goes here",
            name: "Usage"
        }, {
            type: "input",
            message: "what License would you like to choose?",
            name: "License"
        }, {
            type: "input",
            message: "Who were the contributors to this project?",
            name: "Contributions"
        }, {
            type: "input",
            message: "How many test runs has there been, anything wrong inside the repo?",
            name: "Tests"
        }, {
            type: "input",
            message: "What questions do you have for the world for when they look at this project?",
            name: "Questions"
        }, {
            type: "input",
            message: "Enter the name for your repo image",
            name: "imgName"
        }, {
            type: "input",
            message: "Enter the URL of the image of your applications",
            name: "imageURL"
        }, {
            type: "input",
            message: "Enter Url of your GitHub Repo",
            name: "GitHubURL"
        }, {
            type: "input",
            message: "Enter the name of your Repo that will show up as a hyperlink",
            name: "RepoName"
        }
    ])
};


function generateMd(answers) {
    return `
  # ${answers.Title}
  ## ${answers.Description}
  ## ${answers.TableofContents}
  ## ${answers.Install}
  ## ${answers.Usage}
  ## ${answers.License}
  ## ${answers.Contributions}
  ## ${answers.Tests}
  ## ${answers.questions}
  ![${answers.imgName}](${answers.imageURL})
  <br>
  ![${answers.RepoName}]("${answers.GitHubURL}")
  `
};

promptUser()
    .then(function (answers) {
        const md = generateMd(answers);

        return writeFileAsync("README.md", md);
    })
    .then(function () {
        console.log("Successfully wrote to md");
    })
    .catch(function (err) {
        console.log(err);
    });