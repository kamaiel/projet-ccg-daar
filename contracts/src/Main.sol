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

    function createCollection(string calldata name, uint cardCount) external {
      Collection newCollection = new Collection(name, cardCount);
      collections[collectionCount++] = newCollection;
    }

    function getCollection(uint _collec) public view returns (Collection){
      return collections[int(_collec)];
    }

    function getCollectionCount() public view returns (int) {
      return collectionCount;
    }

}
