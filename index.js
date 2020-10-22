var inquirer = require('inquirer')
var fs = require("fs")
const util = require('util')
const Choices = require("inquirer/lib/objects/choices")

const writefileAsync = util.promisify(fs.writeFile);

function prompt(){
    return inquirer.prompt([
        {
            type:"input",
            name:"title",
            message:"What is the title of your project?"
        },
        {
            type:"input",
            name:"description",
            message:"Provide a brief description of the project?"
        },
        {
            type:"input",
            name:"installation",
            message:"What are the installation instructions?"
        },
        {
            type:"input",
            name:"usage",
            message:"What is the projects usage?"
        },
        {
            type:"input",
            name:"contribution",
            message:"Who are the contributing parties?"
        },
        {
            type:"input",
            name:"test",
            message:"What are the test instructions your project?"
        },
        {
            type:"list",
            name:"license",
            message:"What is the license for your project?",
            choices:[
                "MIT",
                "Apache",
                "GPL"
            ]
        },
    
    ])
}

function generateReadMe(answers){
    let badge 

    if (answers.license == "MIT") {
        badge = "![GitHub license](https://badgen.net/github/license/micromatch/micromatch)"
    }
    else if (answers.license == "Apache") {
        badge = "![GitHub license](https://badgen.net/gitlab/license/gitlab-org/omnibus-gitlab)"
    } else if (answers.license == "GPL") {
        badge = "![GitHub license](https://badgen.net/scoop/extras/license/deluge)"
    } 


return `
# ${answers.title}

## Description

${answers.description}

## Table of contents

- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Licence](#Licence)
- [Contributors](#Contributors)
- [Test](#Test)
- [Repository Link](#Repository)
- [GitHub Info](#GitHub) 

## Installation

${answers.installation}

## Usage

${answers.usage}

## Licence

${badge}

## Contributors

${answers.contributors}

## Test

## Repository Link

## GitHub Info

    `
    } 


async function init(){
    try{

       const answers = await prompt()

       console.log(answers)

       const readme = generateReadMe(answers)

       await writefileAsync("README.md", readme)

       console.log("read me is ready")

    }
    catch(err){
        console.log(err)
    }

} 

// prompt()


init()