// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalance(address) {
  const balance = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balance);
}

async function LendMoney(money) {
  
}


async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const bank = await hre.ethers.getContractFactory("Dbank");
  const contract = await bank.deploy(10);

  await contract.deployed();
  console.log("Bank deployed to:", contract.address);

  const balance = await getBalance(deployer.address);
  console.log("Balance:", balance);

  await contract.connect(deployer).deposit({value: hre.ethers.utils.parseEther("1.0")});
  console.log("Deposit 1.0 ETH");

  await contract.connect(deployer).lendMoney(100000);
   
  console.log("Lend 100000");

  const x = await contract.pool();
  console.log("Pool:", x);

  let account = await contract.connect(deployer).accounts(deployer.address);
  console.log("Account:", account);

  await contract.connect(deployer).borrow(100000);
  console.log("Borrow 100000");

  account = await contract.connect(deployer).accounts(deployer.address);
  console.log("Account:", account);

  const repay = await contract.connect(deployer).repayAmount();
  console.log("Repay:", repay);

  await contract.connect(deployer).repayLoan(repay);
  console.log("Repay Loan");



  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
