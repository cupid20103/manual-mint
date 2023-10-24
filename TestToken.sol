// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    address public owner;
    uint256 private _tokenPrice;
    uint256 private _tokenTotalSupply;

    constructor() ERC20("TestToken", "TTT") {
        owner = msg.sender;
        _tokenPrice = 0.001 ether; // Set the token price to 0.001 ETH/BNB/Matic
        _tokenTotalSupply = 10000 * (10 ** uint256(decimals())); // Set the total supply to 10000 tokens
        _mint(owner, _tokenTotalSupply);
    }

    function mint() external payable {
        require(msg.value == 100 * _tokenPrice, "Incorrect ETH/BNB/Matic amount sent");

        _mint(msg.sender, 100 * (10 ** uint256(decimals())));
    }

    function tokenPrice() external view returns (uint256) {
        return _tokenPrice;
    }

    function tokenTotalSupply() external view returns (uint256) {
        return _tokenTotalSupply;
    }
}