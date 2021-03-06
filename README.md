# Description
The EOA interacts with the `Token` via the `Executor` contract, which allows the user to `mint`, `burn` and `lock` tokens.

## Deployed Contracts
### Ropsten Testnet
- Token Address: https://ropsten.etherscan.io/token/0x03863781b626cAB5267647740CD0382a423bE32e
- Timelock Address: https://ropsten.etherscan.io/address/0x758ca7d13901fd36d28c3167edda68a46b411fe8
- Executor Address: https://ropsten.etherscan.io/address/0xfccc810163abc683b714258269ca9ea8ebef3b91

## Running Javascript Tests

1. Clone the repository: `git clone https://github.com/chweeee/pundi_x_take_home_test.git`
2. Use node version 14.17.4: `nvm use 14.17.4`
3. Install project dependencies: `yarn install`
4. Running tests:
	- ganache: `npm run test:dev`
	- ropsten testnet: `npm run test:test`
##
