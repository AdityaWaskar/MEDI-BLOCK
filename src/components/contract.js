import { ethers } from "ethers";

// Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
export const initializeProvider = (contractAddress, hospitalABI) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, hospitalABI, signer);
};

// Displays a prompt for the user to select which accounts to connect
export const requestAccount = async () => {
  const account = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const a = account[0];
  return a;
};
