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
        string uri;
        uint number;
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

    function getNFTOwner(address _owner) external view returns (string[] memory,uint[] memory) {
        uint total = balanceOf(_owner);
        string[] memory resp = new string[](total);
        uint[] memory token = new uint[](total);
        uint256 tokenIndex = 0;

        for(uint i = 0 ; i < tokenIdCounter ; i++){
            if (_owner == ownerOf(i)){
                resp[tokenIndex] = tokenURI(i);
                token[tokenIndex] = i;
                tokenIndex++;
            }
        }
        return (resp,token);
    }

    function getName() public view returns (string memory){
        return collectionName;
    }

    function buyNFT(address _owner, uint tokenId) external payable {
        require(tokenIdToSale[tokenId].active, "NFT pas dans la liste des ventes");
        address seller = tokenIdToSale[tokenId].seller;
        _transfer(seller, _owner, tokenId);
        tokenIdToSale[tokenId].active = false;
        nbVentes--;
    }

    function createSale(address _owner, uint tokenId, uint price) external {
        require(ownerOf(tokenId) == _owner, "Pas l'owner du NFT");
        require(!tokenIdToSale[tokenId].active, "NFT deja en ventes");

        tokenIdToSale[tokenId] = Vente({
            seller: _owner,
            price: price,
            active: true,
            uri : tokenURI(tokenId),
            number : tokenId
        });
        nbVentes++;
    }


    function getNFTSales() external view returns (int[] memory, string[] memory, int[] memory){
        int[] memory tokens = new int[](nbVentes);
        string[] memory uris = new string[](nbVentes);
        int[] memory prix = new int[](nbVentes);
        uint count = 0 ;
        for(uint i = 0 ; i < tokenIdCounter ; i++){
            if(tokenIdToSale[i].active){
                tokens[count] = int(tokenIdToSale[i].number);
                uris[count] = tokenIdToSale[i].uri;
                prix[count] = int(tokenIdToSale[i].price);
                count++;
            }
        }

        return (tokens,uris, prix);
    }
    
    
}
