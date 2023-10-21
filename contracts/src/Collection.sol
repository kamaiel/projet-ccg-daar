// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract Collection is ERC721URIStorage, Ownable {
    string private collectionName;
    uint private cardCount;
    uint private tokenIdCounter;

    constructor(string memory _collectionName,uint _cardCount) ERC721("Collection", "POK") {
        collectionName = _collectionName;
        cardCount = _cardCount ;
    }

    function safeMint(address to, string memory cardURI) external onlyOwner {
        uint tokenId = tokenIdCounter;
        tokenIdCounter++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, cardURI);
    }
}
