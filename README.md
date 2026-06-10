# manual-mint

Scripts to manually mint ERC-20 tokens and ERC-721 NFTs on EVM-compatible chains (Ethereum, BNB Chain, Polygon, and similar networks).

The project pairs two example Solidity contracts with small Node.js scripts that call their `mint()` function using [ethers.js](https://docs.ethers.org/v5/) v5.

## Requirements

- Node.js 20.9.0 or later (see [.nvmrc](.nvmrc))
- An RPC endpoint for the target network
- A funded wallet private key
- The address of a deployed mint contract

## Project structure

| File | Description |
| --- | --- |
| [mint.js](mint.js) | Shared minting logic used by both entry scripts. |
| [mintToken.js](mintToken.js) | Entry script that mints from an ERC-20 contract. |
| [mintNFT.js](mintNFT.js) | Entry script that mints from an ERC-721 contract. |
| [config.js](config.js) | Loads configuration from environment variables. |
| [TestToken.sol](TestToken.sol) | Example ERC-20 contract for reference and testing. |
| [TestNFT.sol](TestNFT.sol) | Example ERC-721 contract for reference and testing. |
| [.env.example](.env.example) | Template for the required environment variables. |

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file from the template:

   ```bash
   cp .env.example .env
   ```

3. Fill in the values in `.env`:

   ```
   RPC_PROVIDER=https://your-rpc-endpoint
   PRIVATE_KEY=0xyour-wallet-private-key
   MINT_CONTRACT_ADDRESS=0xdeployed-contract-address
   ```

## Usage

Mint from an ERC-20 token contract:

```bash
npm run mint:token
```

Mint from an ERC-721 NFT contract:

```bash
npm run mint:nft
```

Each command sends a transaction that calls the contract's `mint()` function and waits for it to be confirmed. On success it logs a confirmation message; on failure it logs the error.

## Configuration

All configuration is read from environment variables through [config.js](config.js):

| Variable | Description |
| --- | --- |
| `RPC_PROVIDER` | RPC URL for the target network. |
| `PRIVATE_KEY` | Private key of the wallet that pays for and receives the mint. |
| `MINT_CONTRACT_ADDRESS` | Address of the deployed mint contract. |

If any of these are missing, the scripts exit early with a clear message instead of failing with a low-level error.

## Notes

- The mint value is fixed at `0.1` ETH in [mint.js](mint.js), which matches the price of the example contracts (`0.001` per unit times 100 units). Adjust this value if your contract uses a different price, otherwise the transaction may revert.
- The example contracts import OpenZeppelin libraries. This repository does not include compilation tooling such as Hardhat or Foundry, so the `.sol` files are provided as reference. Compile and deploy them with the toolchain of your choice.

## Security

Never commit your `.env` file or expose your private key. The `.gitignore` already excludes `.env` and related files.
