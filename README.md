# Creating ERC-20 Using OpenZeppelin

## Goal 
1. Create an ERC-20 token using OpenZeppelin
2. Use Truffle to compile and deploy the token contract to a locally running ethereum network
3. Use Infura and Truffle to deploy the token contract to the Rinkeby Public Test Network
4. Once our contract is deployed on Rinkeby, find our deployed token on Etherscan
5. Then, we will use Metamask to import this token
6. Finally, we will send the token to any ethereum address using Metamask!

## Getting Started
Get started with the exercise, remember you will need to have installed the latest version of Truffle (v5)
1. Verify you have the Truffle (v5.0.2) latest installed if not use the command npm install -g truffle
2. Use mkdir SampleToken to create a directory
3. cd SampleToken
4. Run the command: truffle init to initialize a truffle project.
5. Run npm install --save truffle-hdwallet-provider used to set up the provider to connect to the Infura Node
6. Run npm install openzeppelin-solidity
7. Go into your contracts folder, and create your token smart contract file SampleToken.sol

## Code for SampleToke.sol
```
pragma solidity >=0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract SampleToken is ERC20Detailed, ERC20 {

    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint _initialSupply) 
    ERC20Detailed(_name, _symbol, _decimals) public {
        require(_initialSupply > 0, "INITIAL_SUPPLY has to be greater than 0");
        _mint(msg.sender, _initialSupply);
    }
}
```

Note:
ERC20.sol under tokens in node modules
change _balance from private to internal and same goes with _totalSupply

## Steps to run a local ethereum network, and deploy your token contract to this local network
1. Open a Terminal window, and make sure you are inside your project directory
2. Run the command `truffle develop` (to run a local ethereum network)
3. Use the command `compile` (to compile your solidity contract files)
4. Use the command `migrate --reset` (to deploy your contract to the locally running ethereum network)

## Steps to deploy the contract on rinkeby network
Use the command `migrate --reset --network rinkeby`
