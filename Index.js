// call the dependencies
const inquirer = require("inquirer");
const fs = require("fs");
const Choices = require('prompt-choices');
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
            message: "Would you like to choose a license?",
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

## Description
## ${answers.Description}

## Table of Contents
## ${answers.TableOfContents}

## Intallation Instructions
## ${answers.Install}

## Usage Information
## ${answers.Usage}

## License Info
## ${answers.License}

## Contributions
## ${answers.Contributions}

## Tests
## ${answers.Tests}

## Questions
## ${answers.Questions}


![${answers.imgName}](${answers.imageURL})

![${answers.RepoName}](${answers.GitHubURL})`
};

promptUser()
    .then(function (answers) {
        const md = generateMd(answers);

        return writeFileAsync("NewREADME.md", md);
    })
    .then(function () {
        console.log("Successfully wrote to md");
    })
    .catch(function (err) {
        console.log(err);
    });