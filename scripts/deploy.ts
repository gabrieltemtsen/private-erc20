import { ethers } from "hardhat";

async function main() {
  const perc20 = await ethers.deployContract("PrivateNaira");
  await perc20.deployed();

  console.log(`PrivateNaira was deployed to ${perc20.address}`);
}

//enabling asychronous 
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});