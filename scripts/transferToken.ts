

import * as dotenv from "dotenv"
import * as hre  from "hardhat";
dotenv.config();


import { encryptDataField, decryptNodeResponse } from "@swisstronik/swisstronik.js";
import { ethers } from "ethers";

const sendShieldedTransaction = async (signer: ethers.Signer, destination: string, recipient: string, tokenAmount: number) => {
    // Encode the transfer function data
  const tokenContract = new ethers.Contract(destination, ['function transfer(address,uint256)'], signer);
  const transferData = tokenContract.interface.encodeFunctionData('transfer', [recipient, tokenAmount]);

 
    // Get the RPC link from the network configuration
    const rpclink = hre.network.config.url;

  
    // Encrypt transaction data
    const [encryptedData] = await encryptDataField(rpclink, transferData);
    console.log('here')
  
    // Construct and sign transaction with encrypted data
    return await signer.sendTransaction({
      from: signer,
      to: destination,
      data: encryptedData,
    });
  };

  async function main() {
    console.log('Transferring Token please Wait')
    // Address of the deployed contract
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const toAddress = '0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1';
    const tokenAmount = 1; // The amount of tokens to transfer
    
  
    // Get the signer (your account)
    const privateKey = process.env.PRIVATE_KEY

  // Create a wallet instance using the private key
  const wallet = new hre.ethers.Wallet(privateKey || '', hre.ethers.provider);

  const signer = wallet.connect(hre.ethers.provider);

    // Construct a contract instance
    const contractFactory = await hre.ethers.getContractFactory("PrivateNaira");
    const contract = contractFactory.attach(contractAddress);
  
    // Send a shielded transaction to set a message in the contract

    const txHash = await sendShieldedTransaction(signer, contractAddress, toAddress, tokenAmount);

    // Log the transaction hash
    console.log('Transaction Hash:', txHash);

  

  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
