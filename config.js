const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    RPC_PROVIDER: process.env.RPC_PROVIDER,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    MINT_CONTRACT_ADDRESS: process.env.MINT_CONTRACT_ADDRESS
};