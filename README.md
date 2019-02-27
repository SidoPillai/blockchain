# Creating a CryptoStar Dapp on Ethereum

## Details
- Truffle v5.0.4 - a development framework for Ethereum
- OpenZeppelin 2.1.3
- ERC-721 Token Name - CryptoStar DAPP
- ERC-721 Token Symbol - CSA
- Token Address on the Rinkeby Network - 0xC1a39827235546b3D89A9f923219d458179E6f2c [Etherscan](https://rinkeby.etherscan.io/address/0xc1a39827235546b3d89a9f923219d458179e6f2c)

## Running the project
1. Clone the repository
2. Checkout `CryptoStar-DAPP-Ethereum ` branch
3. Open 2 terminal window from the project one to deploy the contract and other to run the webserver
4. Enter the following command in the first terminal:
   - `truffle develop` (to run a local ethereum network)
   - `compile` (to compile your solidity contract files)
   - `migrate --reset --network rinkeby` (to deploy your contract to the rinkeby ethereum network)
5. Enter the following command in the second terminal:
   - `cd app`
   - `npm run dev` 
