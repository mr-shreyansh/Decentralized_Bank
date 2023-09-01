// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Dbank {
    // Represents a user's account
    struct Account {
        uint256 balance;
        uint256 money;
        uint256 borrowedAmount;
    }

    // Mapping of addresses to user accounts
    mapping(address => Account) public accounts;

    uint256 public interestRate; // Static interest rate

    uint256 public pool;

    event CollateralDeposited(address indexed user, uint256 amount);
    event LoanBorrowed(address indexed user, uint256 amount);
    event LoanRepaid(address indexed user, uint256 amount);
    event MoneyLended(address indexed lender, uint256 amount);
    event BalanceWithdrawn(address indexed user, uint256 amount);

    constructor(uint256 _interestRate) {
        interestRate = _interestRate;
    }

    // Borrowers can deposit collateral in their account
    function deposit() external payable {
        accounts[msg.sender].balance += msg.value;
        emit CollateralDeposited(msg.sender, msg.value);
    }

      function getAccountDetails() external view returns(Account memory) {
        return accounts[msg.sender];
    }

    // Borrowers can request a loan
    function borrow(uint256 amount) external {
        require(amount > 0, "Borrow amount must be greater than 0");

        Account storage borrowerAccount = accounts[msg.sender];
        require(borrowerAccount.borrowedAmount == 0, "Repay existing loan first");
        require(amount <= borrowerAccount.balance, "Not enough collateral");

        require(pool >= amount, "Not enough money to lend you cash");

        pool-=amount;

        borrowerAccount.borrowedAmount = amount;
        borrowerAccount.balance -= amount;

        emit LoanBorrowed(msg.sender, amount);
    }

    // Borrowers can repay their loan
    function repayLoan(uint256 amount) external {
        require(amount > 0, "Repay amount must be greater than 0");

        Account storage borrowerAccount = accounts[msg.sender];
        uint256 refund = (amount * 100) / (100 + interestRate);
        pool += amount;
        require(borrowerAccount.borrowedAmount >= refund, "Exceeds borrowed amount");

        borrowerAccount.borrowedAmount -= refund;
        payable(msg.sender).transfer(refund);

        emit LoanRepaid(msg.sender, refund);
    }

    // Lenders can lend money
    function lendMoney(uint256 money) external {
        pool += money;
        accounts[msg.sender].money+=money;
        emit MoneyLended(msg.sender, money);
    }

    // Lenders can withdraw their remaining balance
    function withdrawBalance() external returns (uint256) {
        Account storage account = accounts[msg.sender];
        require(account.money > 0, "No balance to withdraw");
        require(
            account.money + (account.money * interestRate) / 100 <= pool,
            "Not enough balance to withdraw"
        );
        uint256 withdraw = account.money + (account.money * interestRate) / 100;
        pool-=withdraw;
        account.money = 0;
        emit BalanceWithdrawn(msg.sender, withdraw);
        return withdraw;
    }

    function repayAmount() public view returns (uint256) {
        Account storage borrowerAccount = accounts[msg.sender];
        uint256 interest = (borrowerAccount.borrowedAmount * interestRate) / 100;
        uint256 totalRepayment = borrowerAccount.borrowedAmount + interest;
        return totalRepayment;
    }
}
