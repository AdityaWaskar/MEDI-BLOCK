import Web3 from "web3";

const connectToInfura = async () => {
  const infuraUrl =
    "https://goerli.infura.io/v3/6e5b42ef506040dbad31e2b8de73e014";
  const provider = new Web3.providers.HttpProvider(infuraUrl);
  const web3 = new Web3(provider);
  return web3;
};

export default connectToInfura;
