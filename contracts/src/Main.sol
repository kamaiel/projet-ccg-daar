// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Collection.sol";

contract Main {
    address public owner;
    mapping(int => Collection) private collections;
    mapping(string=>int) private collectionNameToId;
    int private collectionCount;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        collectionCount = 0;

    }

    function createCollection(string calldata name, uint cardCount) external onlyOwner returns (Collection) {
      Collection newCollection = new Collection(name, cardCount);
      collectionNameToId[name] = collectionCount;
      collections[collectionCount++] = newCollection;
      return newCollection;
    }

    function mintCards(string memory collectionName, address to, string[] memory cardURIs) external{
        int collectionId = collectionNameToId[collectionName];
        require(collectionId < collectionCount, "Invalid collection ID");
        Collection collection = collections[collectionId];
        for (uint i = 0; i < cardURIs.length; i++) {
            collection.safeMint(to, cardURIs[i]);
        }
    }

     function possessNFT(string memory _collectionName, address _owner) external view returns (int) {
        int collectionId = collectionNameToId[_collectionName];
        require(collectionId < collectionCount, "Invalid collection ID");
        Collection c = collections[collectionId];
        return int(c.balanceOf(_owner));
    }

     function getNFT(string memory _collectionName, address _owner) external view returns (string[] memory) {
        int _collectionId = collectionNameToId[_collectionName];
        require(_collectionId < collectionCount, "Invalid collection ID getNFT");
        Collection c = collections[_collectionId];
        return c.getNFTOwner(_owner);
    }

    function assignCard(int collectionId, address to, uint tokenId) external onlyOwner {
        require(collectionId < collectionCount, "Invalid collection ID assignCard");
        Collection collection = collections[collectionId];
        collection.safeTransferFrom(address(this), to, tokenId);
    }

    // Getters // 

    function getCollection(uint _collec) external view returns (Collection){
      return collections[int(_collec)];
    }

    function getCollectionCount() public view returns (int) {
      return collectionCount;
    }

    function getAllCollectionsName() public view returns (string[] memory) {
      string[] memory names = new string[](uint(collectionCount));
      for (uint i = 0; i < uint(collectionCount); i++) {
        names[i] = collections[int(i)].getName();
      }
      return names;
    }

}
