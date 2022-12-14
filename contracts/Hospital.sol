//SPDX-License-Identifier: UNLICENSED
// pragma experimental ABIEncoderV2;
pragma solidity >=0.5.0 <0.9.0;

contract Hospital {
    address public owner = msg.sender;
  string public message;

  // this function runs when the contract is deployed
  constructor() public {
    // set initial message
    message = "Hello World!";
  }

  modifier ownerOnly() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  // function that only contract owner can run, to set a new message
  function setMessage(string memory _message) 
    public 
    ownerOnly 
    returns(string memory) 
  {
    // message must not be empty
    require(bytes(_message).length > 0);

    // set new message
    message = _message;
    return message;
  }
    // event PatientEvent(
    //     address indexed _from,
    //     string _name,
    //     string email,
    //     uint _PhoneNo,
    //     // string _age,
    //     string _address,
    //     string _history
    //     // uint _ids
    // );

    // struct Patients {
    //     uint patientId;
    //     string name;
    //     string email;
    //     string medicalHistory;
    //     string doctor;
    //     string patientAddress;
    //     uint _PhoneNo;
    //     uint patientAge;
    //     string patientGender;
    //     string patientBloodGroup;
    // }

    // mapping(uint => Patients) public patientDetails;
    // uint public patientCount;

    // function addPatientDetails(
       
    //     string memory _name,
    //     string memory _email,
    //     string memory _medicalHistory,
    //     string memory doctor,
    //     string memory _patientAddress,
    //     uint _PhoneNo,
    //     uint _patientAge,
    //     string memory _patientGender,
    //     string memory _patientBloodGroup
    // ) public {
        
    //    patientDetails[patientCount] = Patients(
    //         patientCount,
    //         _name,
    //         _email,
    //         _medicalHistory,
    //         doctor,
    //         _patientAddress,
    //         _PhoneNo,
    //         _patientAge,
    //         _patientGender,
    //         _patientBloodGroup
    //     );

    //     patientCount++;

    //     emit PatientEvent(
    //         msg.sender,
    //         _name,
    //         _email,
    //         _PhoneNo,
    //         // _patientAge,
    //         _patientAddress,
    //         _medicalHistory
    //         // _patientId
    //     );
    // }

    // // function DEgetPatientDetails(uint _patientId) public view returns (uint) {
    // //     return (patientDetails[_patientId].patientId);
    // // }

    // // function GetPatientDetails(uint _patientId)
    // //     public
    // //     view
    // //     returns (Patients memory)
    // // {
    // //     return patientDetails[_patientId];
    // // }

    // function getPatientDetails(uint _patientId)
    //     public
    //     view
    //     returns (
    //         uint,
    //         string memory,
    //         string memory,
    //         string memory,
    //         string memory,
    //         // uint,
    //         uint,
    //         // string memory,
    //         string memory
    //     )
    // {
    //     return (
    //         patientDetails[_patientId].patientId,
    //         patientDetails[_patientId].name,
    //         patientDetails[_patientId].email,
    //         patientDetails[_patientId].medicalHistory,
    //         // patientDetails[_patientId]._nameOfDoctor,
    //         patientDetails[_patientId].patientAddress,
    //         // patientDetails[_patientId]._PhoneNo,
    //         patientDetails[_patientId].patientAge,
    //         // patientDetails[_patientId].patientGender,
    //         patientDetails[_patientId].patientBloodGroup
    //     );
    // }

    // // Search Phone Number in Patient Details

    // function getPatientDetailsByPhoneNo(uint _PhoneNo)
    //     public
    //     view
    //     returns (uint[] memory)
    // {
    //     uint[] memory result = new uint[](patientCount);
    //     uint counter = 0;
    //     for (uint i = 0; i < patientCount; i++) {
    //         if (patientDetails[i]._PhoneNo == _PhoneNo) {
    //             result[counter] = patientDetails[i].patientId;
    //             counter++;
    //         }
    //     }
    //     uint[] memory patientIds = new uint[](counter);
    //     for (uint i = 0; i < counter; i++) {
    //         patientIds[i] = result[i];
    //     }
    //     return patientIds;
    // }
}
