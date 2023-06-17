import axios from "axios";
import { PINATA_API_KEY, PINATA_SECRET_API_KEY } from "../../config.js";

const ipfsServiceController = {
  // file is uploaded to the IPFS System and get the HASH value
  async sendFileToIPFS(report) {
    if (report) {
      console.log("REPORt", report);
      try {
        const formData = new FormData();
        formData.append("file", report);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        return resFile.data.IpfsHash;
      } catch (error) {
        console.log(`Error sending File to IPFS: ${error}`);
      }
    }
  },
  async sendJsonToIPFS(json_data) {
    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        json_data,
        {
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY,
          },
        }
      );
      console.log("adf" + response.data.IpfsHash);
      return response.data.IpfsHash; // This will log the IPFS hash of the pinned JSON data
    } catch (err) {
      console.error(err);
    }
  },

  async getDataFromIPFS(hash) {
    try {
      const response = await fetch(
        `https://gateway.pinata.cloud/ipfs/${hash}`,
        { mode: "cors" }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("ipfs -> ", error);
    }
  },
};

export default ipfsServiceController;
