// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PHR is Ownable{
    struct HealthRecord{
        string encryptedDataCID;
        address patient;
        mapping(address => bool) accessList;
    }

    mapping(address =>HealthRecord[]) public patientRecords;

    event RecordAdded(address indexed patient,string cid, uint256 recordId);
    event AccessGranted(address indexed patient,address indexed provider, uint recordId);
    event AccessRevoked(address indexed patient,address indexed provider, uint recordId);

    modifer onlyPatient(uint256 _recordId){
        require(patientRecords[msg.sender][_recordId].patient == msg.sender, "Not the patient");
        _;
    }
    function addRecord(string memory _encryptedDataCID) external{
        HealthRecord storage newRecord=patientRecords[,sg.sender].push();
        newRecord.encryptedDataCID=_encryptedDataCID;
        newRecord.patient=msg.sender;

        uint256 recordId=patientRecords[msg.sender].length-1;
        emit RecordAdded(msg.sender,_encryptedDataCID,recordId);

    }

    function grantAccess(address _provider, uint256 _recordId) external onlyPatient(_recordId) {
        patientRecords[msg.sender][_recordId].accessList[_provider] = true;
        emit AccessGranted(msg.sender, _provider, _recordId);
    }

    function revokeAcesss(address _provider, uint256 _recordId) external onlyPatient(_recordId){
        patientRecords[msg.sender][_recordId].accessList[_provider] = false;
        emit AccessRevoked(msg.sender, _provider, _recordId);

    }

    function hasAccess(address _patient, address _provider, uint256 _recordId) external view returns (bool) {
        return patientRecords[_patient][_recordId].accessList[_provider];
    }

    function getRecord(address _patient, uint256 _recordId) external view returns (string memory) {
        require(
            patientRecords[_patient][_recordId].patient == msg.sender ||
            patientRecords[_patient][_recordId].accessList[msg.sender],
            "Access denied"
        );
        return patientRecords[_patient][_recordId].encryptedDataCID;
    }
}
