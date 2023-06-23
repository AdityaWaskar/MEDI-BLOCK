import patientServices from "./patientServices";

const doctorServices = {
  async fetchData(url) {
    let data = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/doctor/${url}`,
      {
        mode: "cors",
      }
    );
    data = await data.json();
    return data;
  },
  async getDoctorBywallet(wallet) {
    const data = await this.fetchData(`wallet=${wallet}`);
    return data;
  },
  async getDoctorByPhone(phoneNo) {
    const data = await this.fetchData(`PhoneNo=${phoneNo}`);
    const doctorData = await this.getDoctorBywallet(data["2"]);
    return doctorData;
  },

  async patientListTreatedByDoctor(walletAddress) {
    const data = await this.fetchData(
      `patientListTreatedByDoctor/${walletAddress}`
    );

    let patientList = [];
    for (let i = 0; i < data.length; i++) {
      const date = data[i][0];
      const patientAddress = data[i][1];

      let data2 = await patientServices.getpatientByWallet(patientAddress);
      const info = {
        name: data2.name,
        date: date,
        phoneNo: data2.phoneNo,
      };
      patientList.push(info);
    }

    return patientList;
  },
};

export default doctorServices;
