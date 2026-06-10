const ethers = require('ethers');
const { RPC_PROVIDER, PRIVATE_KEY, MINT_CONTRACT_ADDRESS } = require('./config');

const MINT_ABI = ['function mint() external payable'];

const MINT_VALUE = '0.1';

async function mint(label) {
    if (!RPC_PROVIDER || !PRIVATE_KEY || !MINT_CONTRACT_ADDRESS) {
        console.error('Missing configuration. Set RPC_PROVIDER, PRIVATE_KEY and MINT_CONTRACT_ADDRESS in your .env file.');
        return;
    }

    const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(MINT_CONTRACT_ADDRESS, MINT_ABI, wallet);

    try {
        const tx = await contract.mint({ value: ethers.utils.parseEther(MINT_VALUE) });
        await tx.wait();

        console.log(`${label} minted successfully!`);
    } catch (error) {
        console.error(`Error minting ${label}:`, error);
    }
}

module.exports = { mint };
