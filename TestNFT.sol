// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TestNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant MINT_AMOUNT = 100;
    uint256 public constant PRICE = 0.001 ether;

    constructor() ERC721("TestNFT", "TNT") {}

    function mint() external payable {
        require(_tokenIdCounter.current() + MINT_AMOUNT <= MAX_SUPPLY, "Maximum supply reached");
        require(msg.value >= PRICE * MINT_AMOUNT, "Insufficient funds");

        for (uint256 i = 0; i < MINT_AMOUNT; i++) {
            _safeMint(msg.sender, _tokenIdCounter.current() + 1);
            _tokenIdCounter.increment();
        }
    }
}