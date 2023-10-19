// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Collection.sol";

contract Main {
  int private count;
  mapping(int => Collection) private collections;

  constructor() {
    count = 0;
  }

  function createCollection(string calldata name, uint cardCount) external {
    collections[count++] = new Collection(name, cardCount);
  }
}
