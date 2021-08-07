const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const PRIVATE_KEY = process.env["PRIVATE_KEY"];

module.exports = {
  networks: {
    //local dev net
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    //ropsten testnet
    testnet: {
      provider: () => new HDWalletProvider(
        PRIVATE_KEY,
        `https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`
      ),
      network_id: 3,
      confirmations: 1,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      //https://forum.openzeppelin.com/t/how-to-deploy-uniswapv2-on-ganache/3885
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
    },
  }
}
