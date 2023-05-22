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

    struct patient{
        string phone_no;
        string metadata;
    }

    struct doctor{
    string phone_no;
    string metadata;
    }

    mapping (address => patient) public patients;
    mapping (address => doctor) public doctors;
    uint public patientCount = 0;
    uint public doctorCount = 0;
    mapping (address => uint[]) private patientMedicalHistory;
    mapping(address => address[]) public  doctorToPatientIds;

    address[] public allPatientAddress;
    address[] public allDoctorAddress;


    function compareStrings(string memory a, string memory b) private pure returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
    

    function AddPatient(
        address _patientAddress, 
        string memory _metaData,
        string memory _phoneNo
    ) public {
        patients[_patientAddress] = patient(_phoneNo, _metaData);
        allPatientAddress.push(_patientAddress);
        patientCount++;
    }

    function AddDoctor(
        address _doctorAddress, 
        string memory _metaData,
        string memory _phoneNo
    ) public {
        doctors[_doctorAddress] = doctor(_phoneNo, _metaData);
        allDoctorAddress.push(_doctorAddress);
        doctorCount++;
    }


    function PatientExists(address _patientAddress)
        public
        view
        returns (bool)
    {
        if (bytes(patients[_patientAddress].phone_no).length > 0) {
            return true;
        }
        return false;
    }

    function doctorExists(address _doctorAddress)
        public
        view
        returns (bool)
    {
        if (bytes(doctors[_doctorAddress].phone_no).length > 0) {
            return true;
        }
        return false;
    }

    function GetPatientByAddress(address _patientAddress)
        public
        view
        returns (string memory, string memory)
    {
        return (
            patients[_patientAddress].metadata,
            patients[_patientAddress].phone_no
        );
    }

    // Get Patient By Phone No
    function getPatientByPhoneNo(string memory _phoneNo) public view returns (string memory, string memory) {
        for (uint256 i = 0; i < patientCount; i++) {
            if (compareStrings(patients[allPatientAddress[i]].phone_no, _phoneNo)) {
                return (
                    patients[allPatientAddress[i]].metadata,
                    patients[allPatientAddress[i]].phone_no
                );
            }
        }
        revert("Patient not found.");
    }
    
    function GetDoctorByAddress(address _doctorAddress)
        public
        view
        returns (string memory, string memory)
    {
        return (
            doctors[_doctorAddress].metadata,
            doctors[_doctorAddress].phone_no
        );
    }

    // Get doctor By Phone No
    function getDoctorByPhoneNo(string memory _phoneNo) public view returns (string memory, string memory) {
        for (uint256 i = 0; i < patientCount; i++) {
            if (compareStrings(doctors[allPatientAddress[i]].phone_no, _phoneNo)) {
                return (
                    doctors[allPatientAddress[i]].metadata,
                    doctors[allPatientAddress[i]].phone_no
                );
            }
        }
        revert("Doctor not found.");
    }
    
    // Get All Patient Address

    function getPatientAddresses() public view returns (address[] memory) {
        return allPatientAddress;
    } 

    function getDoctorAddresses() public view returns (address[] memory){
        return allDoctorAddress;
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

    function addpatientsTreatedByDoctor(address _patientId) public {
        address doctorId = msg.sender;
        address[] storage patientIds = doctorToPatientIds[doctorId];

        patientIds.push(_patientId);
// add last 10 patient record with the doctor addresss
        // if (patientIds.length < 10) {
        //     patientIds.push(patientId);
        // } else {
        //     for (uint i = 0; i < patientIds.length - 1; i++) {
        //         patientIds[i] = patientIds[i+1];
        //     }
        //     patientIds[patientIds.length - 1] = patientId;
        // }
    }

    function getpatientsTreatedByDoctor(address _doctorId) public view returns (address[] memory) {
        return doctorToPatientIds[_doctorId];
    }




}

