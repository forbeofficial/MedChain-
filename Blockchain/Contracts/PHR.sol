// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IVerifier {
    function verifyProof(
        uint256[2] calldata a,
        uint256[2][2] calldata b,
        uint256[2] calldata c,
        uint256[] calldata input
    ) external view returns (bool);
}

contract PHR is Ownable {
    struct HealthRecord {
        string encryptedDataCID;
        address patient;
        mapping(address => bool) accessList;
    }

    mapping(address => HealthRecord[]) private patientRecords;
    mapping(address => bool) public emergencyAccessProviders;

    IVerifier public verifier;

    // Events
    event RecordAdded(address indexed patient, string cid, uint256 recordId);
    event AccessGranted(address indexed patient, address indexed provider, uint256 recordId);
    event AccessRevoked(address indexed patient, address indexed provider, uint256 recordId);
    event EmergencyAccessGranted(address indexed provider);
    event EmergencyAccessRevoked(address indexed provider);
    event ZkAccessVerified(address indexed verifier, address indexed patient);

    
    constructor(address _verifierAddress) Ownable(msg.sender) {
        verifier = IVerifier(_verifierAddress);
    }

    modifier onlyPatient(uint256 _recordId) {
        require(
            _recordId < patientRecords[msg.sender].length &&
            patientRecords[msg.sender][_recordId].patient == msg.sender,
            "Not the patient or invalid record ID"
        );
        _;
    }

    function addRecord(string memory _encryptedDataCID) external {
        patientRecords[msg.sender].push();
        uint256 index = patientRecords[msg.sender].length - 1;
        HealthRecord storage record = patientRecords[msg.sender][index];
        record.encryptedDataCID = _encryptedDataCID;
        record.patient = msg.sender;
        emit RecordAdded(msg.sender, _encryptedDataCID, index);
    }

    function grantAccess(address _provider, uint256 _recordId) external onlyPatient(_recordId) {
        patientRecords[msg.sender][_recordId].accessList[_provider] = true;
        emit AccessGranted(msg.sender, _provider, _recordId);
    }

    function revokeAccess(address _provider, uint256 _recordId) external onlyPatient(_recordId) {
        patientRecords[msg.sender][_recordId].accessList[_provider] = false;
        emit AccessRevoked(msg.sender, _provider, _recordId);
    }

    function hasAccess(address _patient, address _provider, uint256 _recordId) external view returns (bool) {
        require(_recordId < patientRecords[_patient].length, "Invalid record ID");
        return patientRecords[_patient][_recordId].accessList[_provider];
    }

    function getRecord(address _patient, uint256 _recordId) external view returns (string memory) {
        require(_recordId < patientRecords[_patient].length, "Invalid record ID");
        HealthRecord storage record = patientRecords[_patient][_recordId];
        require(
            record.patient == msg.sender || record.accessList[msg.sender],
            "Access denied"
        );
        return record.encryptedDataCID;
    }

    function getRecordCount(address _patient) external view returns (uint256) {
        return patientRecords[_patient].length;
    }

    function setEmergencyAccessProvider(address _provider, bool _status) external onlyOwner {
        emergencyAccessProviders[_provider] = _status;
        if (_status) {
            emit EmergencyAccessGranted(_provider);
        } else {
            emit EmergencyAccessRevoked(_provider);
        }
    }

    function emergencyGetRecord(address _patient, uint256 _recordId) external view returns (string memory) {
        require(emergencyAccessProviders[msg.sender], "Not authorized for emergency access");
        require(_recordId < patientRecords[_patient].length, "Invalid record ID");
        return patientRecords[_patient][_recordId].encryptedDataCID;
    }

    function verifyAndAccess(
        uint256[2] calldata a,
        uint256[2][2] calldata b,
        uint256[2] calldata c,
        uint256[] calldata input,
        address _patient,
        uint256 _recordId
    ) external returns (string memory) {
        require(verifier.verifyProof(a, b, c, input), "Invalid zk-SNARK proof");
        require(_recordId < patientRecords[_patient].length, "Invalid record ID");

        emit ZkAccessVerified(msg.sender, _patient);

        return patientRecords[_patient][_recordId].encryptedDataCID;
    }
}
