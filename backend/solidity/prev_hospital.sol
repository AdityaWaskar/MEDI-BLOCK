//SPDX-License-Identifier: UNLICENSED
pragma experimental ABIEncoderV2;
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Hospital is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 public totalTokens;

    constructor() ERC721("PatientMedicalHistory", "PMH") {
        totalTokens = 0;
    }

    struct Patient {
        uint id;
        address patientAddress;
        string name;
        string email;
        string phoneNo;
        string homeAddress;
    }
    

    struct Doctor {
        uint id;
        address doctorAddress;
        string hospitalName;
        string name;
        string email;
        string qualification;
        string phoneNo;
    }

    struct Reports {
        uint id;
        address patientAddress;
        address doctorAddress;
        string phoneNo;
        string report;
        string doctor;
        string time;
    }

    mapping(uint => Patient) public patients;
    mapping(uint => Doctor) public doctors;
    mapping(uint => Reports) public reports;
    mapping (address => uint[]) private patientMedicalHistory;
    mapping(address => address[]) public  doctorToPatientIds;


    uint public patientCount;
    uint public messagesCount;
    uint public doctorCount;
    uint public reportCount;

    function compareStrings(
        string memory a,
        string memory b
    ) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function AddPatient(
        address _patientAddress,
        string memory name,
        string memory email,
        string memory phoneNo,
        string memory homeAddress
    ) public {
        for (uint i = 0; i < patientCount; i++) {
            require(
                !compareStrings(patients[i].phoneNo, phoneNo),
                "Patient already exists"
            );
        }

        patients[patientCount] = Patient(
            patientCount,
            _patientAddress,
            name,
            email,
            phoneNo,
            homeAddress
        );
        patientCount++;
    }

    // // view all patients

    // function GetAllPatients()
    //     public
    //     view
    //     returns (
    //         uint[] memory,
    //         string[] memory,
    //         string[] memory,
    //         string[] memory,
    //         string[] memory
    //     )
    // {
        
    //     uint[] memory id = new uint[](patientCount);
    //     string[] memory name = new string[](patientCount);
    //     string[] memory email = new string[](patientCount);
    //     string[] memory phoneNo = new string[](patientCount);
    //     string[] memory homeAddress = new string[](patientCount);

    //     for (uint i = 0; i < patientCount; i++) {
    //         id[i] = patients[i].id;
    //         name[i] = patients[i].name;
    //         email[i] = patients[i].email;
    //         phoneNo[i] = patients[i].phoneNo;
    //         homeAddress[i] = patients[i].homeAddress;
    //     }
    //     return (id, name, email, phoneNo, homeAddress);
    // }

     function PatientExists(address _patientAddress)
        public
        view
        returns (bool)
    {
        for (uint i = 0; i < patientCount; i++) {
            if (patients[i].patientAddress == _patientAddress) {
                return true;
            }
        }
        return false;
    }

    function DoctorExists(address _doctorAddress)
        public
        view
        returns (bool)
    {
        for (uint i = 0; i < doctorCount; i++) {
            if (doctors[i].doctorAddress == _doctorAddress) {
                return true;
            }
        }
        return false;
    }

function addDoctor(
        address docAdd,
        string memory _name,
        string memory _phoneNo,
        string memory _qualification,
        string memory _email,
        string memory _hospitalName
    ) public {
        require(docAdd != address(0), "Doctor address cannot be 0");
        // check doctor exist or not
        for (uint i = 0; i < doctorCount; i++) {
            require(
                !compareStrings(doctors[i].phoneNo, _phoneNo),
                "Doctor already exists"
            );
        }
   doctors[doctorCount] = Doctor(
            doctorCount,
            docAdd,
            _hospitalName,
            _name,
            _email,
            _qualification,
            _phoneNo
        );
        doctorCount++;
    }


    function GetDoctor(
        address _doctorAddress
    )
        public
        view
        returns (
            uint,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        // get doctor details by _doctorAddress
        if (_doctorAddress != address(0)) {
            for (uint i = 0; i < doctorCount; i++) {
                if (doctors[i].doctorAddress == _doctorAddress) {
                    return (
                        doctors[i].id,
                        doctors[i].name,
                        doctors[i].phoneNo,
                        doctors[i].qualification,
                        doctors[i].email,
                        doctors[i].hospitalName
                    );
                }
            }
        }
    }

    function GetPatient(
        address _patientAddress
    )
        public
        view
        returns (
            uint,
            address,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        // get patient details by _patientAddress
        if (_patientAddress != address(0)) {
            for (uint i = 0; i < patientCount; i++) {
                if (patients[i].patientAddress == _patientAddress) {
                    return (
                        patients[i].id,
                        patients[i].patientAddress,
                        patients[i].name,
                        patients[i].phoneNo,
                        patients[i].homeAddress,
                        patients[i].email
                    );
                }
            }
        }
    }
  

    // Get All Patient Address

     function getPatientAddress() public view returns (address[] memory) {
        address[] memory result = new address[](patientCount);
        for(uint i = 0; i < patientCount; i++){
            result[i] = patients[i].patientAddress;
        }
        return result;
    } 

    // Get All Doctor Address

     function GetDocAdd() public view returns (address[] memory){

        address[] memory result = new address[](doctorCount);
        for(uint i = 0; i < doctorCount; i++){
            result[i] = doctors[i].doctorAddress;
        }
        return result;

   }


    // Get Patient By Phone No 

    function getPatientByPhoneNo(string memory _phoneNo)
        public
        view
        returns (
            uint,
            address,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        for (uint i = 0; i < patientCount; i++) {
            if (compareStrings(patients[i].phoneNo, _phoneNo)) {
                return (
                    patients[i].id,
                    patients[i].patientAddress,
                    patients[i].name,
                    patients[i].phoneNo,
                    patients[i].homeAddress,
                    patients[i].email
                );
            }
        }
    }

    // Get Doctor By Phone No
    function getDoctorByPhoneNo(string memory _phoneNo)
        public
        view
        returns (
            uint,
            address,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        for (uint i = 0; i < doctorCount; i++) {
            if (compareStrings(doctors[i].phoneNo, _phoneNo)) {
                return (
                    doctors[i].id,
                    doctors[i].doctorAddress,
                    doctors[i].name,
                    doctors[i].phoneNo,
                    doctors[i].qualification,
                    doctors[i].email,
                    doctors[i].hospitalName
                );
            }
        }
    }


// Create Patient Medical token with ERC721 Token
    function getTokenId(address _address, string memory hashValue)
        internal  
        returns (uint256)
    {
        uint256 newPatientBlockId = _tokenIds.current();
        _mint(_address, newPatientBlockId);
        _setTokenURI(newPatientBlockId, hashValue);
        _tokenIds.increment();
        totalTokens++;

        return newPatientBlockId;
    }

    // Add Patient Medical History
    function addMedicalHistory(address _address, string memory hashValue) public {
        uint hash = getTokenId(_address, hashValue);
        patientMedicalHistory[_address].push(hash);
    }

    // Get Patient Medical History by patient address
    function getMedicalInformation(address _address) public view returns (uint[] memory){
        return patientMedicalHistory[_address]; 
    }

    function addLastTenPatient(address patientId) public {
        address doctorId = msg.sender;
        address[] storage patientIds = doctorToPatientIds[doctorId];

        if (patientIds.length < 10) {
            patientIds.push(patientId);
        } else {
            for (uint i = 0; i < patientIds.length - 1; i++) {
                patientIds[i] = patientIds[i+1];
            }
            patientIds[patientIds.length - 1] = patientId;
        }
    }

    function getLastTenPatientIdsForDoctor(address _doctorId) public view returns (address[] memory) {
        return doctorToPatientIds[_doctorId];
}

}

