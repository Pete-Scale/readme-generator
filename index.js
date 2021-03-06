const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const generateMarkdown = require('./utils/generateMarkdown');

// array of questions for user
const questions = () => {
    return inquirer.prompt([
        // Title, Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
        {
            type: 'insert',
            message: "What's the title of your project?",
            name: 'title'
        },
        {
            type: 'insert',
            message: "What is a good description of your project?",
            name: 'description'
        },
        {
            type: 'insert',
            message: "How do you install your app?",
            name: 'installation',
        },
        {
            type: 'insert',
            message: "How do you use your app?",
            name: 'usage'
        },
        {
            type: 'list',
            message: "What license did you use?",
            name: 'license',
            choices: [
                "Apache-2.0", 
                "BSD-3-Clause",
                "BSD-2-Clause",
                "CDDL-1.0",
                "EPL-2.0",
                "GPL-2.0",
                "GPL-3.0",
                "LGPL-2.0",
                "LGPL-2.1",
                "LGPL-3.0",
                "MIT",
                "MPL-2.0"
            ]
        },
        {
            type: 'insert',
            message: "Who would you like to include in your credits as a contributor?",
            name: 'credits'
        },
        {
            type: 'insert',
            message: "What tests were written for your app and how do you run them?",
            name: 'tests'
        },
        {
            type: 'insert',
            message: "What is your GitHub username?",
            name: 'github'
        },
        {
            type: 'insert',
            message: "What is your email?",
            name: 'email'
        },
    ]);
}

const writeFileAsync = util.promisify(fs.writeFile);


// function to initialize program
const init = async () => {
    try {
        // prompt README questions
        const answers = await questions();
        const data = generateMarkdown(answers);
        // dynamic file naming
        const fileName = `${answers.title.toLowerCase().replace(/ /g, '-')}_README.md`
        // write README file
        await writeFileAsync(fileName, data);
        console.log("✔️ "+" Successfully wrote your README.md file!")
    } catch (err){
        console.log("❌ "+" Oh no! Something went wrong with your README!")
        console.log(err);
    }
}

// function call to initialize program
init();
