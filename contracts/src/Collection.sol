// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Collection is ERC721URIStorage{
    string private collectionName;
    uint private cardCount;
    uint private tokenIdCounter;

    mapping(uint256 => address) private _tokenURIs;

     struct Vente {
        address seller;
        uint price;
        bool active;
    }

    mapping(uint => Vente) private tokenIdToSale;
    uint nbVentes;



    constructor(string memory _collectionName,uint _cardCount) ERC721("Collection", "POK") {
        collectionName = _collectionName;
        cardCount = _cardCount ;
    }

    function safeMint(address to, string memory cardURI) external {
        uint tokenId = tokenIdCounter;
        tokenIdCounter++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, cardURI);
        _tokenURIs[tokenId] = to;
    }  

    function getNFTOwner(address _owner) external view returns (string[] memory) {
        string[] memory resp = new string[](balanceOf(_owner));
        uint256 tokenIndex = 0;

        for(uint i = 0 ; i < tokenIdCounter ; i++){
            if (_owner == ownerOf(i)){
                resp[tokenIndex++] = tokenURI(i);
            }
        }
        return resp;
    }

    function getName() public view returns (string memory){
        return collectionName;
    }

    function buyNFT(uint tokenId) external payable {
        require(tokenIdToSale[tokenId].active, "NFT pas dans la liste des ventes");
        uint price = tokenIdToSale[tokenId].price;
        require(msg.value >= price, "Argent dans le wallet insuffisant");

        address seller = tokenIdToSale[tokenId].seller;
        payable(seller).transfer(msg.value);

        safeTransferFrom(address(this), msg.sender, tokenId);

        tokenIdToSale[tokenId].active = false;
    }

    function createSale(uint tokenId, uint price) external {
        require(ownerOf(tokenId) == msg.sender, "Pas l'owner du NFT");
        require(!tokenIdToSale[tokenId].active, "NFT deja en ventes");

        tokenIdToSale[tokenId] = Vente({
            seller: msg.sender,
            price: price,
            active: true
        });
        nbVentes++;
    }
    
    
}
