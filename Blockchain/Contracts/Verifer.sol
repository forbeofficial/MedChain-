// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Verifier Contract
/// @notice This contract verifies zk-SNARK proofs. Not now, i dont now how to implement zk-SNARK
contract Verifier {
    /// @notice Verifies the zk-SNARK proof
    /// @param a Part of the zk-SNARK proof
    /// @param b Part of the zk-SNARK proof
    /// @param c Part of the zk-SNARK proof
    /// @param input Public inputs to the zk-SNARK
    /// @return Whether the proof is valid or not
    function verifyProof(
        uint256[2] calldata a,
        uint256[2][2] calldata b,
        uint256[2] calldata c,
        uint256[] calldata input
    ) external pure returns (bool) {
        //KEEPING IT EMPTY FOR NOW
        // Zk-SNARK, implementation padiknm, full arilla
        return true;
    }
}
