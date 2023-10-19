// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Collection.sol";

contract Main {
    address public owner;
    mapping(int => Collection) private collections;
    int private collectionCount;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        collectionCount = 0;
    }

    function createCollection(string calldata name, uint cardCount) external onlyOwner {
        collections[collectionCount++] = new Collection(name, cardCount);
    }

}
