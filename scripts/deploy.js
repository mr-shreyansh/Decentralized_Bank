const hre = require("hardhat");


async function main() {

  const bank = await hre.ethers.getContractFactory("Dbank");
  const contract = await bank.deploy(10);

  await contract.deployed();
  console.log("Bank deployed to:", contract.address);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
