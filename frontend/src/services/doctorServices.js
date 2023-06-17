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
};

export default doctorServices;
