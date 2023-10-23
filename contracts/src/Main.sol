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

    function createCollection(string calldata name, uint cardCount) external returns (Collection) {
      Collection newCollection = new Collection(name, cardCount);
      collections[collectionCount++] = newCollection;
      return newCollection;
    }

     function mintCards(int collectionId, address to, string[] memory cardURIs) external{
        require(collectionId < collectionCount, "Invalid collection ID");
        Collection collection = collections[collectionId];
        for (uint i = 0; i < cardURIs.length; i++) {
            collection.safeMint(to, cardURIs[i]);
        }
    }

    function possessNFT(int _collectionId, address _owner) external view returns (int) {
        require(_collectionId < collectionCount, "Invalid collection ID");
        Collection c = collections[_collectionId];
        return int(c.balanceOf(_owner));
    }

    function getNFT(int _collectionId, address _owner) external view returns (string[] memory) {
        require(_collectionId < collectionCount, "Invalid collection ID");
        Collection c = collections[_collectionId];
        return c.getNFTOwner(_owner);
    }

    function assignCard(int collectionId, address to, uint tokenId) external onlyOwner {
        require(collectionId < collectionCount, "Invalid collection ID");
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

}
