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
            type:"list",
            message:"Select a license (use up or down arrows",
            choices:["MIT", "Common Licenses", "Creative Commons license", "None"],
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
            message: "Frequently asked questions go here",
            name: "Questions"
        }, {
            type: "input",
            message: "Enter the name for your repository image",
            name: "imgName"
        }, {
            type: "input",
            message: "Enter the URL/or path of the image",
            name: "imageURL"
        }, {
            type: "input",
            message: "Enter the Url of the GitHub Repo",
            name: "GitHubURL"
        }, {
            type: "input",
            message: "Enter the name of the reposity, this will show up as your link",
            name: "RepoName"
        }
    ])
};
  

function generateMd(answers) {
    return `
# ${answers.Title} \n

## Description
## ${answers.Description} \n

## Table of Contents
## ${answers.TableOfContents} \n

## Intallation Instructions
## ${answers.Install} \n

## Usage Information
## ${answers.Usage} \n

## License Info
## ${answers.License} \n

## Contributions
## ${answers.Contributions} \n

## Tests
## ${answers.Tests} \n

## Frequently asked questions
## ${answers.Questions} \n


![${answers.imgName}](${answers.imageURL}) "\n"

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