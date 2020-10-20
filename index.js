var inquirer = require('inquirer')
var fs = require("fs")
const util = require('util')
const Choices = require("inquirer/lib/objects/choices")



function prompt(){
    return inquirer.prompt([
        {
            type:"input",
            name:"Title",
            message:"What is the title of your project?"
        },
        {
            type:"input",
            name:"Description",
            message:"What is the title of your project?"
        },
        {
            type:"input",
            name:"contribution",
            message:"What are your contribution guidelines?"
        },
        {
            type:"input",
            name:"test",
            message:"What are the test instructions your project?"
        },
    
    ])
}