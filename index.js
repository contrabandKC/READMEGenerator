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
            message:"What is the title of your project?"
        },
        {
            type:"input",
            name:"installation",
            message:"What are your contribution guidelines?"
        },
        {
            type:"input",
            name:"usage",
            message:"What are the test instructions your project?"
        },
        {
            type:"input",
            name:"contribution",
            message:"What are the test instructions your project?"
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

    ${answers.license}

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

init()