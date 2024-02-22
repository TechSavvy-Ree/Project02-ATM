import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from 'chalk-animation';
interface userInput{
    userID: string,
    userPin: number,
    accountType: string,
    TransactionType: string,
    amount: number;
}
const stop=()=>{
    return new Promise((res) => {
        setTimeout(res,1000)
    })}
    async function intro() {
    const animationTitle=chalkAnimation.rainbow("WELCOME");
    await stop();
    animationTitle.stop();
    };
    intro();

async function welcome() {
    const userInput= await inquirer.prompt([
        {
            type: "input",
            name: "userID",
            message: "Enter User ID"
        },
        {
            type: "number",
            name: "userPin",
            message: "Enter User Pin"
        },
        {
            type: "list",
            name: "accountType",
            choices: ["Current","Saving"],
            message: "Select the Account Type"
        },
        {
            type:"list",
            name: "TransactionType",
            message: "Select Transaction",
            choices:["Fast Cash", "Cash Withdraw", "Balance Inquiry"]
        },
        {
            type: "number",
            name: "amount",
            message: "Enter Amount",
            when(userInput){
                return userInput.TransactionType === "Cash Withdraw"
            }
        },
        {
            type: "list",
            name: "amount",
            choices: [1000, 2000, 5000, 10000, 20000,25000],
            message: "Enter Amount",
            when(userInput){
                return userInput.TransactionType === "Fast Cash"
            }
        }
    ]);
    if( userInput.userID && userInput.userPin && userInput.TransactionType === "Balance Inquiry"){
        const userBalance = Math.floor(Math.random()*100000);
        console.log(`User current balance is Rs.${userBalance}\n`)
    } 
    else if (userInput.userID && userInput.userPin){
        const userBalance2= Math.floor(Math.random()*100000);

        if(userBalance2 > userInput.amount){
            console.log(`User account has been debited with Rs. ${userInput.amount} and user remaining balance is Rs.${userBalance2 - userInput.amount}`);
        }else{
            console.log(`Insufficient Balance`);
        }
    }
    
}
setTimeout(() => {
    welcome();
}, 2000);
