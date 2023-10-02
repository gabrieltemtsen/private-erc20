import { ethers } from "hardhat";

async function main() {
  const perc20 = await ethers.deployContract("PrivateNaira");
  
  await perc20.waitForDeployment();

  console.log(`PrivateNaira was deployed to ${perc20.target}`);
}

//enabling asychronous 
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});