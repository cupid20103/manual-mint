const ethers = require('ethers');
const { RPC_PROVIDER, PRIVATE_KEY, MINT_CONTRACT_ADDRESS } = require("./config");

// Connect to EVM network
const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER); // Replace with the RPC provider
const wallet = new ethers.Wallet(PRIVATE_KEY, provider); // Replace with the privateKey of the wallet to mint
const contractAddress = MINT_CONTRACT_ADDRESS; // Replace with the mint contract address

// Instantiate the contract
const abi = ['function mint() external payable']; // Replace with the ABI code for mint function
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Call the mint function
async function mintNFT() {
    try {
        const tx = await contract.mint({ value: ethers.utils.parseEther('0.1') });
        await tx.wait();

        console.log('NFT minted successfully!');
    } catch (error) {
        console.error('Error minting NFT:', error);
    }
}

mintNFT();