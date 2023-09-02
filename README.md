********Decentralised Bank********

This app lets you take out loans on ETHs.you will have to deposit ETHs as collateral first.Then if there is enough money in the liquidity pool, you will be able to borrow any amount smaller than the collateral deposited. 
Now since I have deployed the contract with 10% interest rate. You will have to pay back the amount with a 10% interest rate and you will receive your ETHs back accordingly.
You can only borrow money if you haven't borrowed anything currently.
You can also lend money and you will earn interest on it as well. However you can only withdraw your money if there is enough amount present in the liquidity pool.
To keep things simple I have assumed 1 wei = 1 loaned currency instead of using a stable coin.

!!! You can only borrow or withdraw money If there is enough money in the pool.


* The smart contact has the following functions:

    1) ***deposit***:
    it adds the collateral amount to the sender's account.
    2) ***Borrow***:
    It checks if the pool has enough balance to lend and if the borrower has enough collateral. If these conditions satisfy it will grant the loan of specified amount.
    3) ***lendMoney***:
    It takes input amount and add it to liquidity pool and updates the lends account.
    4) ***RepayLoan***:
    It takes input amount and returns the corresponding ETHs back to the borrower after subtracting the interest.
    5) ***GetAccountDetail***:
    It returns the sender's account details
    6) ***WithdrawBalance***:
    It withdraws the lent amount from contract along with the profit after applying interest.
    7) ***RepayAmount***: 
    It shows the amount to be repaid by sender after applying the interest to the loaned amount.


* How to run this project in your local   environment:
    - Clone the GitHub repository in your local PC.
    - Install the npm package by running npm I command in the root folder as well as the client folder.
    - In the root folder run the command npx run hardhat scripts 
    - run --network localhost scripts/deploy.js   ( to run it on local network, it will be very fast)
    - or 
    - run --network sepolia scripts/deploy.js (to run it on sepolia, can be slow sometimes !)
    - copy the contract address and past it in app.js in client/src.
    - Now copy the abi file from artifacts folder. The file name is Dbank.json.
     paste it in src/contract
    - Add your Sepolia URL and private key to the hardhat.config.json file using .env file ( if you are running it on local net then change the configuration in         hardhat.config.json accordingly)
    - Now in the client folder in terminal run npm start.
    - *****Your Dapp is ready!*****

* How to use this app:
1) First of all a user has to lend money for anyone to borrow it.
2) A borrower will first deposit collateral and the borrow money which should be less than collateral and liquidity pool amount.
3) Now the borrower can check how much amount he needs to pay back and he can pay it back lump sum or in installments.
4) Borrow has to pay complete loan before borrowing again
5) lender can withdraw money only when there is ***enough*** money in liquidity pool. 

*Languages and Frameworks used:
Smart contract is written in solidity.
Hardhat framework is used to deploy the contract
In the frontend react is used.
Along with react ether.js is used for handling web3 functions and tailwindcss is used for styling.


* Link to the Dapp:
 https://mr-shreyansh.github.io/Decentralized_Bank/


   



