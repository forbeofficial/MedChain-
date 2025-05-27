// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PHR is Ownable {
    struct HealthRecord {
        string encryptedDataCID;
        address patient;
        mapping(address => bool) accessList;
    }


    mapping(address => HealthRecord[]) private patientRecords;

    // Events
    event RecordAdded(address indexed patient, string cid, uint256 recordId);
    event AccessGranted(address indexed patient, address indexed provider, uint256 recordId);
    event AccessRevoked(address indexed patient, address indexed provider, uint256 recordId);

    // Modifier to restrict actions to the patient
    modifier onlyPatient(uint256 _recordId) {
        require(
            _recordId < patientRecords[msg.sender].length &&
            patientRecords[msg.sender][_recordId].patient == msg.sender,
            "Not the patient or invalid record ID"
        );
        _;
    }

    // ADDING   new encrypted health record
    function addRecord(string memory _encryptedDataCID) external {
        // Create an empty slot for the record
        patientRecords[msg.sender].push();
        uint256 index = patientRecords[msg.sender].length - 1;

        // Store record details
        HealthRecord storage record = patientRecords[msg.sender][index];
        record.encryptedDataCID = _encryptedDataCID;
        record.patient = msg.sender;

        emit RecordAdded(msg.sender, _encryptedDataCID, index);
    }

    // Grant access to a healthcare provider
    function grantAccess(address _provider, uint256 _recordId) external onlyPatient(_recordId) {
        patientRecords[msg.sender][_recordId].accessList[_provider] = true;
        emit AccessGranted(msg.sender, _provider, _recordId);
    }

    // Revoke access from a healthcare provider
    function revokeAccess(address _provider, uint256 _recordId) external onlyPatient(_recordId) {
        patientRecords[msg.sender][_recordId].accessList[_provider] = false;
        emit AccessRevoked(msg.sender, _provider, _recordId);
    }

    // HERE WE ARE VERIFYING THE USER ACCESIBILITY AND CREDIBILITY,
    function hasAccess(address _patient, address _provider, uint256 _recordId) external view returns (bool) {
        require(_recordId < patientRecords[_patient].length, "Invalid record ID");
        return patientRecords[_patient][_recordId].accessList[_provider];
    }

    //FOR ENCRYPTED HEALTH RECORD 
    function getRecord(address _patient, uint256 _recordId) external view returns (string memory) {
        require(_recordId < patientRecords[_patient].length, "Invalid record ID");

        HealthRecord storage record = patientRecords[_patient][_recordId];
        require(
            record.patient == msg.sender || record.accessList[msg.sender],
            "Access denied"
        );

        return record.encryptedDataCID;
    }

    //PATIENT RECORD.
    function getRecordCount(address _patient) external view returns (uint256) {
        return patientRecords[_patient].length;
    }
}
