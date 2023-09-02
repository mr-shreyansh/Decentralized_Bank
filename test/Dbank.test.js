
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Dbank", function () {
  let dbank;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const Dbank = await ethers.getContractFactory("Dbank");

    dbank = await Dbank.deploy(10);
    await dbank.deployed();
  });

  it("should allow users to deposit collateral", async function() {
    // User deposits collateral
    const depositAmount = 1000;
    await dbank.connect(owner).deposit({value: depositAmount});

    // Check user's balance in the contract
    const userAccount = await dbank.connect(owner).getAccountDetails();
    expect(userAccount.balance).to.equal(depositAmount);
  })

  it("should allow users to borrow money", async function() {
     
    // adr1 Lends money
    const lendAmount1 = 500;
    await dbank.connect(addr1).lendMoney(lendAmount1);

      // User deposits collateral
      const depositAmount = 1000;
      await dbank.connect(owner).deposit({value: depositAmount});

  
      // User borrows money
      const borrowAmount = 500;
      await dbank.connect(owner).borrow(borrowAmount);

      // Check user's balance in the contract
      const userAccount = await dbank.connect(owner).getAccountDetails();
  
      // Check user's loan in the contract
      expect(userAccount.borrowedAmount).to.equal(borrowAmount);
  });

  it("should allow users to repay loan", async function() {
    // adr1 Lends money
    const lendAmount1 = 500;
    await dbank.connect(addr1).lendMoney(lendAmount1);

    // User deposits collateral
    const depositAmount = 1000;
    await dbank.connect(owner).deposit({value: depositAmount});

    // User borrows money
    const borrowAmount = 500;
    await dbank.connect(owner).borrow(borrowAmount);

    // User repays loan
    await dbank.connect(owner).repayLoan(550);

    // Check user's balance in the contract
    const userAccount = await dbank.connect(owner).getAccountDetails();

    // Check user's loan in the contract
    expect(userAccount.borrowedAmount).to.equal(0);
  });

  it("should allow users to lend money", async function() {

    // User lends money
    const lendAmount = 500;
    await dbank.connect(owner).lendMoney(lendAmount);

    // Check user's balance in the contract
    const userAccount = await dbank.connect(owner).getAccountDetails();

    // Check user's loan in the contract
    expect(userAccount.money).to.equal(lendAmount);
  })

  it("should allow users to withdraw money", async function() {

    // User lends money
    const lendAmount = 500;
    await dbank.connect(owner).lendMoney(lendAmount);

    // adr1 lends money too
    const lendAmount1 = 500;
    await dbank.connect(addr1).lendMoney(lendAmount1);

    // User repays loan
    await dbank.connect(owner).withdrawBalance();

    // Check user's balance in the contract
    const userAccount = await dbank.connect(owner).getAccountDetails();

    // Check user's loan in the contract
    expect(userAccount.money).to.equal(0);
  });

});