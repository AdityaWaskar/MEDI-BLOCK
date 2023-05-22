import dotenv from "dotenv";
dotenv.config();

export const {
  PORT,
  CONTRACT_ADDRESS,
  OWNER_ADDERSS,
  WALLET_PRIVATE_ADDRESS,
  PINATA_API_KEY,
  PINATA_SECRET_API_KEY,
  INFURA_API_KEY,
} = process.env;
