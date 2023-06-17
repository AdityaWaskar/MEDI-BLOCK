const patientServices = {
  async fetchData(url) {
    let data = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/patient/${url}`,
      {
        mode: "cors",
      }
    );
    data = await data.json();
    return data;
  },

  async getPatientByPhone(phoneNo) {
    const data = await patientServices.fetchData(`phoneNo=${phoneNo}`);
    const patient_data_by_phone = await patientServices.fetchData(
      `wallet=${data["2"]}`
    );
    patient_data_by_phone["wallet_Address"] = data["2"];
    return patient_data_by_phone;
  },

  async getpatientByWallet(wallet) {
    const patient_data_by_wallet = await patientServices.fetchData(
      `wallet=${wallet}`
    );
    return patient_data_by_wallet;
  },

  async getPatientReports(wallet) {
    const reports = await this.fetchData(`reports/${wallet}`);
    console.log("Reports->", reports);
    return reports;
  },

  async addReport(jsonData) {
    console.log("patientService", jsonData);
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/patient/addReport`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      }
    );

    return response;
  },

  async getparticularReport(token) {
    const response = await this.fetchData(`report/${token}`);
    return response;
  },
};

export default patientServices;
