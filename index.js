var inquirer = require('inquirer')
var fs = require("fs")
const util = require('util')
const Choices = require("inquirer/lib/objects/choices")
const axios = require('axios')

const writefileAsync = util.promisify(fs.writeFile);
// const axiosAsync = util.promisify(axios)

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
        {
            type:"input",
            name:"git",
            message:"WHat is your github id?",
    
        },
    
    ])
}

function generateReadMe(answers, git){
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

![GitHub license](${git.githubImage})

${git.email}
-[Git Profile](${git.profile})
${git.name}




    `
    } 


function gitHub(answers){

    let quaryURL = `https://api.github.com/users/${answers.git}`

    axios.get(quaryURL).then((res) =>{
        const gitHubInfo ={
            githubImage: res.data.avatar_url,
            email: res.data.email,
            profile: res.data.html_url,
            name: res.data.name
        }


        // console.log(res.data)
        console.log("Axios",gitHubInfo)

        return gitHubInfo

    })
    

}

// const gitAsync = util.promisify(gitHub);
// const readMeAsync = util.promisify(generateReadMe);



async function init(){
    try{

       const answers = await prompt()

    //    console.log(answers)

    //    const git = await gitHub(answers)
    let quaryURL = `https://api.github.com/users/${answers.git}`

    const git = await axios.get(quaryURL).then((res) =>{
        const gitHubInfo ={
            githubImage: res.data.avatar_url,
            email: res.data.email,
            profile: res.data.html_url,
            name: res.data.name
            }
           return gitHubInfo 
        })

        console.log(git)

    const readme = await generateReadMe(answers, git)

       await writefileAsync("README.md", (readme))

       console.log("read me is ready")

    }
    catch(err){
        console.log(err)
    }

} 

// prompt()

init()

// prompt()
//     .then(function(answers){
//         const git = gitHub(answers)
//         // const git = ""
//         // console.log("return",git)
//         return [answers, git]
//     })
//     .then(function(answers, git){
//         return generateReadMe(answers, git)
//     })
//     .then(function(readme){
//         writefileAsync("README.md", (readme))
//     })
//     .catch(function(err){
//         console.log(err)
//     })