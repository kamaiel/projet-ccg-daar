// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Collection is ERC721URIStorage {
  string public collectionName;
  uint public cardCount;

  struct Card {
    uint cardId;
    string cardImg;
  }

  Card[] cards;

  constructor(string memory _collectionName, uint _cardCount) ERC721("Collection", "POK"){
    collectionName = _collectionName;
    cardCount = _cardCount;
  }

   function safeMint(address to, uint256 tokenId, string memory uri)
        public
    {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }  


  function getName() public view returns (string memory) {
    return collectionName;
  }
  /*
   function mintCard(string memory img) external {
        require(cards.length < cardCount, "Collection is full");
        uint cardNumber = cards.length;
        cards.push(Card(cardNumber, img));
        _mint(msg.sender, cardNumber);
    }*/
}
