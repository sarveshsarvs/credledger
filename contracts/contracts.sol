// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CredentialRegistry {
    struct Credential {
        address issuer;
        address learner;
        uint256 timestamp;
        bool revoked;
    }

    mapping(bytes32 => Credential) public credentials;

    event CredentialIssued(bytes32 indexed hash, address indexed issuer, address indexed learner);
    event CredentialRevoked(bytes32 indexed hash);

    // Issue a new credential
    function issueCredential(address learner, bytes32 hash) public {
        require(credentials[hash].timestamp == 0, "Credential already exists");

        credentials[hash] = Credential({
            issuer: msg.sender,
            learner: learner,
            timestamp: block.timestamp,
            revoked: false
        });

        emit CredentialIssued(hash, msg.sender, learner);
    }

    // Verify if credential exists and is not revoked
    function verifyCredential(bytes32 hash) public view returns (bool) {
        return (credentials[hash].timestamp != 0 && !credentials[hash].revoked);
    }

    // Revoke a credential (only issuer can revoke)
    function revokeCredential(bytes32 hash) public {
        require(credentials[hash].issuer == msg.sender, "Only issuer can revoke");
        credentials[hash].revoked = true;
        emit CredentialRevoked(hash);
    }
}
