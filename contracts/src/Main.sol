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
      int collectionId = collectionCount; 
      collectionCount++; 

      Collection newCollection = new Collection(name, cardCount);
      collections[collectionId] = newCollection; 
      collectionNameToId[name] = collectionId; 

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

    function getNFT(string memory _collectionName, address _owner) external view returns (string[] memory,uint[] memory) {
        int _collectionId = collectionNameToId[_collectionName];
        require(_collectionId <= collectionCount, "Invalid collection ID");
        Collection c = collections[_collectionId];
        return c.getNFTOwner(_owner);
    }
    
    function sellNFT(string memory _collectionName, address _owner, uint tokenId, uint price) external {
      int _collectionId = collectionNameToId[_collectionName];
      require(_collectionId <= collectionCount, "Invalid collection ID");
      Collection c = collections[_collectionId];
      c.createSale(_owner, tokenId, price);
    }

    function buyNFT(address _owner, string memory _collectionName, uint tokenId) external payable {
      int _collectionId = collectionNameToId[_collectionName];
      require(_collectionId <= collectionCount, "Invalid collection ID");
      Collection c = collections[_collectionId];    
      c.buyNFT(_owner, tokenId);
    }


    function getAllNftInSales() external view returns (int[][] memory, string[][] memory, int[][] memory){
        int[][] memory tokens = new int[][](uint(collectionCount));
        string[][] memory uris = new string[][](uint(collectionCount));
        int[][] memory prix = new int[][](uint(collectionCount));

        for(int i = 0 ; i < collectionCount ; i++){
          Collection collection = collections[i];
          (tokens[uint(i)], uris[uint(i)], prix[uint(i)]) = collection.getNFTSales();

        }
        return (tokens,uris, prix);
    }

    // Getters // 
 
    function getAllCollectionsName() public view returns (string[] memory) {
      string[] memory names = new string[](uint(collectionCount));
      for (uint i = 0; i < uint(collectionCount); i++) {
        names[i] = collections[int(i)].getName();
      }
      return names;
    }

}
