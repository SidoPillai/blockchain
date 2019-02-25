# blockchain
Fundamentals of Blockchain and beyond. 

## Exercises
1. Hashing - https://github.com/siddeshpillai/blockchain/tree/hashing-exercise
2. Block - https://github.com/siddeshpillai/blockchain/tree/block-exercise
3. Bitcoin Message - https://github.com/siddeshpillai/blockchain/tree/bitcoin-message
4. Block Explorer - https://github.com/siddeshpillai/blockchain/tree/block-explorer
5. Create Simple Block Chain - https://github.com/siddeshpillai/blockchain/tree/simple-chain
6. Private Blockchain - https://github.com/siddeshpillai/blockchain/tree/private-blockchain
7. Express JS Block Exercise - https://github.com/siddeshpillai/blockchain/tree/express-js-exercise
8. Hapi JS Block Exercise - https://github.com/siddeshpillai/blockchain/tree/hapi-js-exercise
9. Webservices - https://github.com/siddeshpillai/blockchain/tree/blockchain-webservice
10. DAPP Secret Messenger - https://github.com/siddeshpillai/blockchain/tree/dapp-secret-messenger
11. Create and deploy an ERC20 token in local & rinkeby network - https://github.com/siddeshpillai/blockchain/tree/erc20tokens
12. Create ERC20 tokens using Webpack - https://github.com/siddeshpillai/blockchain/tree/ERC20-tokens-webpack

## Good Reads
1. How to timestamp digital document - https://www.anf.es/pdf/Haber_Stornetta.pdf
2. Bitcoin: A peer to peer cash system - https://bitcoin.org/bitcoin.pdf 
3. Genesis Block - https://en.bitcoin.it/wiki/Genesis_block
4. The Complete Satoshi - https://satoshi.nakamotoinstitute.org/

## Workshops
1. https://blockchain.berkeley.edu/
2. https://blockchain.berkeley.edu/workshops/
3. Learn Solidity - https://www.youtube.com/channel/UCaWes1eWQ9TbzA695gl_PtA

## Resources
- Bitcoin Stats - https://bitcoinvisuals.com/stats
- Importing bitcoins via private keys - https://bitcoinelectrum.com/importing-your-private-keys-into-electrum/
- Generate your own address - https://bitaddress.org
- Bitoin Developer Glossary - https://bitcoin.org/en/developer-glossary#a
- Bitcoin Improvement Proposals (BIP) = https://github.com/bitcoin/bips
- Bitcoin book - https://github.com/bitcoinbook/bitcoinbook
- Certifications- https://cryptoconsortium.org/certifications/CBP
- Address - https://www.bitaddress.org
- Hyperledger explorer - https://github.com/hyperledger/blockchain-explorer
- Blockchain demo - https://github.com/anders94/blockchain-demo
- Bitcoin Testnet block explorer - https://live.blockcypher.com/btc-testnet/
- Block Verification - https://bitcoin-message-validation.firebaseapp.com/index.html
- Udacity: Creating unique metadata with solidity - https://medium.com/@alexpanas/udacity-blockchain-nanodegree-creating-unique-metadata-with-solidity-daccded333ef

## Projects
1. Create a Private Blockchain - https://github.com/siddeshpillai/blockchain/tree/private-blockchain
2. Create a Block Chain WebService - https://github.com/siddeshpillai/blockchain/tree/blockchain-webservice
3. Create a Block Chain Notary Service - https://github.com/siddeshpillai/blockchain/tree/blockchain-notary-service

## Future Projects
1. Blockchain Identity
2. Blockchain data
3. WebServices
4. Identify and Notary Service
5. Identify & Smart Contracts (DAPP)
6. Architecture
7. Supply Chain

## Consensus Algorithms

### Proof of Work (PoW)
Bitcoin figured out how to use the Proof of Work algorithm to solve this issue.

The main innovation that Satoshi Nakamoto introduced in Bitcoin’s white paper is using Proof of Work (PoW) to achieve consensus without a central authority and solve the double-spend problem.

How Does It Work?
PoW involves miner nodes, or miners, to solve a math puzzle that requires a lot of computation power. Whichever miner is able to solve the puzzle the fastest is able to add a block of transactions to the blockchain, and in return, they are paid the transaction fees from all the transactions included in the block as well as paid by the network with bitcoins that were newly created upon the “mining” of the block.

Potential Issues
2 Commonly discussed issues with Proof of Work are:

Extremely High-Energy Consumption
A Monopoly of Miners which Leads to a Concern for System Centralizations

### Proof of Stake
In the Proof-of-Stake Consensus Protocol, there are no more miners; instead, there are Validators. These validators, or stakeholders, determine which block makes it onto the blockchain. In order to validate transactions and create blocks, validators put up their own coins as “stake”. Think of it as placing a bet - if they validate a fraudulent transaction, they lose their holdings as well as their rights to participate as a validator in the future. In theory, this check incentivizes the system to validate only truthful transactions.

Potential Issues
We discussed the “Nothing At Stake” problem in which a bad acting Validator places bets on multiple forks so they theoretically always win out in the end.

One issue that can arise is the "nothing-at-stake" problem, wherein block generators have nothing to lose by voting for multiple blockchain histories, thereby preventing consensus from being achieved. Because unlike in proof-of-work systems, there is little cost to working on several chains.

Many have attempted to solve these problems:

1. Peercoin is the first cryptocurrency that applied the concept of PoS. In its early stages, it used centrally broadcast checkpoints signed under the developer's private key. No blockchain reorganization was allowed deeper than the last known checkpoints. Checkpoints are opt-in as of v0.6 and are not enforced now that the network has reached a suitable level of distribution.
2. Ethereum's suggested Slasher protocol allows users to "punish" the cheater who forges on top of more than one blockchain branch. This proposal assumes that one must double-sign to create a fork and that one can be punished for creating a fork while not having stake. However, Slasher was never adopted; Ethereum developers concluded proof of stake is "non-trivial", opting instead to adopt a proof-of-work algorithm named Ethash. It is planned to be replaced by a different PoS protocol called "Casper".
3. Nxt's protocol only allows reorganization of the last 720 blocks. However, this merely rescales the problem: a client may follow a fork of 721 blocks, regardless of whether it is the tallest blockchain, thereby preventing consensus.
4. Hybrid "proof of burn" and proof of stake. Proof-of-burn blocks act as checkpoints, have higher rewards, contain no transactions, are more secure, and anchor both to each other and to the PoS chain but are more expensive.
5. Decred's hybrid proof-of-work and proof-of-stake, in which proof of stake is an extension dependent on the proof-of-work timestamping, based on the "proof of activity" proposal, which aims to solve the nothing-at-stake problem by having proof-of-work miners mining blocks and proof-of-stake acting as a second authentication mechanism.

Proposed Solutions
- Slasher Strategy - which entails penalizing validators if they simultaneously create blocks on multiple chains.
- Punisher Strategy - which simply punishes validators for creating blocks on the wrong chain. In this method, Validators will be motivated to be selective and conscious about the blockchain in which they put their stake.

### Delegated Byzantine Fault Tolerance (dBFT)
dBFT uses a system similar to a democracy where Ordinary Nodes the system vote on representative Delegate Nodes to decide which blocks should be added to the blockchain. When it’s time to add a block, a Speaker is randomly assigned from the group of Delegates to create a new block and propose the new block. 66.66% of delegates need to approve on the block for it to pass.

Potential Issues
Two issues we explored were the case of the Dishonest Speaker and the Dishonest Delegate.

Dishonest Speaker
There is always a chance the Speaker, who is randomly selected from the Delegates, could be dishonest or malfunction. In this situation, the network needs to rely on honest delegates to vote the proposed block down so it doesn’t reach 66% approval. It is up to users of protocol who vote on Delegates, to find out which delegates are not trustworthy and vote on other delegates that are truthful.

Dishonest Delegate
In this case, the chosen Speaker is honest but there are Dishonest Delegates in the system meaning even if they receive a proposal for new block that is faulty, they can say it is valid. If it is a minority of delegates that are dishonest, the block will not make it and new speaker is elected.

### Proof of Existence 
The concept that publicly proving and authenticating any digital asset on the blockchain by verifying its hash.
- Helps you demonstrate data ownership without revealing actual data. This is useful for things like copyrighted material or patents.
- Checks for the integrity of your digital asset. Any proof of existence will recognize your document FOREVER. Even the slightest difference will be recognized allowing you to be sure your asset hasn’t changed.
- Provides document Time stamping. You can use this to prove certain information existed at a certain time.
- Certifies the existence of the document without the need for a central authority.

## Wallets
Blockchain identities are made up of a few important tools like wallets, addresses, and keys. Not only are there a few of these different tools creating our identity, it's also possible to implement them in different ways.

1. Non-deterministic: (random wallets) A wallet where private keys are generated from random numbers.
2. Sequentia deterministic: A wallet where addresses, private keys, and public keys can be traced back to their original seed words.
3. Hierarchical Deterministic Wallet: An advanced type of deterministic wallet that contains keys derived in a tree structure.

## Block
A typical Block is comprised of 2 things:
1. Block Header
2. Body

### Block Header
Block header is composed of the following things:
1. Block Number :
A number to identify where it is located in the chain. 1st block in the chain is also known as genesis block
2. Block Hash :
A hash representation of the data. SHA 256 is used to produce the hash.
3. Number Of Transactions
4. Height :
The number of blocks preceding a particular block on a block chain. For example, the genesis block has a height of zero because zero block preceded it.
5. Timestamp
6. Merkle Root :
Hash that represents every transaction in the block. This is also used in reverse to reconstruct the netire transaction data.
7. Previous Block :
To identify what comes before the current block.
8. Difficulty :
It is defined by number of zeros in the hash value. More zero's means more difficulty.
9. Bits
10. Size (bytes) :
Amount of space the block has to hold the data. Also remember, the size of all the block remains the same for every block in a given blockchain.
11. Nonce :
An arbitrary number that can be used once to find the hash
12. Version 
13. Next Block :
To identify what comes after the current block

### Body
Body is made up of transaction data that comprises of the following:
1. Hash
2. Size
3. Received Time
4. Mined Time	
5. Included in Block
6. LockTime
7. Coinbase
8. Amount send :
Usually the money sent + miner's transaction fee
9. Amount returned back to sender

To see what a block is made up of visit https://blockexplorer.com/ and enter 520607 in the search and see for yourself.

## Bitcoin and Bitcoin core
Main distinctions are Bitcoin as a network and Bitcoin as a software.

- Bitcoin: Network of bitcoin users creating and validating transactions
- Bitcoin Core: Implementation of bitcoin that encompasses all of the software behind bitcoin
- Debug Console: Tool that allows you to interact with data on the bitcoin blockchain

### Bitcoin Core
1. Connect to the Network
2. Validate the blockchain
3. Send and Receive bitcoins

#### Bitcoin Core Networks
1. Bitcoin Mainnet: Primary Network where live transactions take place
2. Bitcoin Testnet: Alternative Bitcoin blockchain that provides a test environment for applications
3. Bitcoin Regnet: Alternative test network for testing bitcoin applications

|   |  Mainnet | Testnet | Regnet |
|---|---|---|---|
| Purpose  | Live  | Testing  | Testing  |
| Coins  | Value  | No Value  | No Value  |
| Peers   | Yes | Yes | Yes |

More focussed comparison

|   | Mainnet | Testnet | Regnet |
|---|:---:|:---:| :-----:|
| Purpose | Production | Testing | Testing |
| Environment | Public | Public | Private |
| Peers  | Entire Network | Testers | None |
| Size  | ~200 GB | ~14 GB  | ~0 GB |
| Block Creation  | 10 minutes | 10 minutes | Instantly |
| Value | Full Value | No Value | No Value |
| Public key prefix  | 1  | m or n | m or n |
| Block difficuly  | Full | Half of mainnet | None |

## Setting up Bitcoin Core
You need to have atleat 200 GB of storage if you want to install the entire bitcoin transaction data. 
Alternatively, you can also configure the bitcoin core as a testnet which requires only 20 GB of storage space. 

If you do this, rather than the software syncing to the mainnet, which can be up to 200GB or more, you’ll sync to the testnet which is approximately 15GB, or the regnet which is 0GB.

### Reduce Storage
It is possible to configure your node to to run in pruned mode in order to reduce storage requirements. This can reduce the disk usage from over 200GB to around 5GB.

To enable block pruning set prune=N on the command line or in bitcoin.conf, where N is the number of MiB to allot for raw block and undo data.

A value of 0 disables pruning. The minimal value above 0 is 550. Your wallet is as secure with high values as it is with low ones. Higher values merely ensure that your node will not shut down upon blockchain reorganizations of more than 2 days - which are unlikely to happen in practice. In future releases, a higher value may also help the network as a whole because stored blocks could be served to other nodes.

As a quick summary here are the steps you’ll go through.

1. create a bitcoin.conf file in your bitcoin installation directory.
2. In this file, write prune=550.

Some useful links
1. https://en.bitcoin.it/wiki/Data_directory
2. https://jlopp.github.io/bitcoin-core-config-generator/
3. Parameters in bitcoin.conf - https://www.youtube.com/watch?v=W54aRszkEOI&t=32s

### Debug Console
This is a powerful tool that helps you explore data within the bitcoin blockchain. 

After setting up the bitcoin core you have 2 ways to navigate and interact via terminal.
1. Via Client : Go to the help in the menu bar and open Debug Console. Enter help
2. Via Cli : Go to terminal and type bitcoin-cli --help

You notice several categories:

- Blockchain
- Control
- Generating
- Mining
- Network
- Rawtransactions
- Util
- Wallet
- Zmq

For a list of available commands and their definitions, you can also go to the bitcoin wiki
https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_calls_list

#### 1. Block Chain Commands
1. getblockchaininfo: Returns various state information about blockchain processing.
2. getblockcount: Returns the number of blocks in the blockchain.
3. verifychain: Verifies blockchain database.

**Key Terms:** <br>
**- Block Chain:** Digital ledger that contains the entire history of transactions made on the network.<br>

#### 2. Hash Commands
1. getblockhash: Returns hash of a block at the block number provided
2. getnetworkhashps: Returns an estimated network hashes per second based on a specified number of recent blocks.
3. getbestblockhash: Returns the hash of the best block.

**Key Terms:** <br>
**- Hash Value:** A digital fingerprint for information <br>
**- Best Block:** Most recent block that you’ve synced to with your local copy of the blockchain. <br>

#### 3. Block Commands
1. getblock: Returns details of block information.
2. getblockheader: Returns information about the block header.
3. generate: Immediately mines the specified number of blocks to an address in the wallet.

**Key Terms:** <br>
**- Block:** A container that holds a list of transactions to be added to the blockchain.

#### 4. Wallet Commands
1. getwalletinfo: Returns an object containing various information about a wallet’s state.
2. listwallets: Returns a list of currently loaded wallets.
3. walletpassphrasechange: Change the wallet passphrase.

**Key Terms:** <br>
**- Wallet:** Software that stores private keys that give access to a bitcoin balance

#### 5. Mempool Commands
1. getmempoolinfo: Returns details on the active state of the transaction memory pool.
2. getrawmempool: Returns all transaction details in the memory pool.
3. getmempoolentry: Returns mempool data for a given transaction.

**Key Terms:** <br>
**- Mempool:** Waiting place for all unconfirmed transactions before they are added to the blockchain.

#### 6. Transaction Commands
1. getchaintxstats: Compute statistics about the total number and rate of transactions in the chain
2. getrawtransaction: Returns raw transaction data
3. listtransactions: Returns a list of transactions for a given account

**Key Terms:** <br>
**- Transaction:** Record of any movement of funds that takes place on the network.

#### 7. Signature Commands
1. signrawtransaction: Sign inputs for a raw transaction.
2. signmessage: Sign message with the private key of an address

**Resources:** <br>
Learn more about the [Raw transaction format](https://bitcoin.org/en/developer-reference#raw-transaction-format)

**Key Terms:** <br>
**- Signature:** Establishes proof of ownership for each transaction on the blockchain.

```
Changes in Bitcoin Core version v0.17.0.1
signrawtransaction is deprecated and will be fully removed in v0.18. 
To use signrawtransaction in v0.17, restart bitcoind with -deprecatedrpc=signrawtransaction.

Projects should transition to using signrawtransactionwithkey and signrawtransactionwithwallet before upgrading to v0.18.

Try those commands using the help command:

help signrawtransactionwithkey
Sign inputs for raw transaction (serialized, hex-encoded). 
The second argument is an array of base58-encoded private keys that will be the only keys used to sign the transaction. 
The third optional argument (may be null) is an array of previous transaction outputs that this transaction depends on but may not yet be in the block chain.

help signrawtransactionwithwallet
Sign inputs for raw transaction (serialized, hex-encoded). 
The second optional argument (may be null) is an array of previous transaction outputs that this transaction depends on but may not yet be in the block chain
```

#### 8. Network Commands
1. getnetworkinfo: Returns information about the state of the peer-to-peer network.
2. getpeerinfo: Returns data about each connection network node.
3. getconnectioncount: Returns the number of connections to other nodes.

**Key Terms:** <br>
**- Peer-to-peer network:** A network of computers that allows information to be shared across users.

#### 9. Mining Commands
1. getmininginfo: Returns an object that contains mining-related information.
2. getblocktemplate: Returns data needed to construct a block.
3. prioritisetransaction: Accepts the transaction into mined blocks at a higher or lower priority.

## Transactions
Transactions encode the transfer of value between participants in the system. In more detail, a transaction is a data structure that encodes a transfer of value from a source of funds called an “input” to a destination called an “output”.

Inputs in one transaction are just the unspent outputs from another transaction. All inputs reference back to an output. Unspent Outputs is sometimes short-handed to UTXO.

## Transaction Data Model
In a blockchain transaction are stored in double hashed form i.e. the initial raw information is put to SHA 256 twice.

For e.g. SHA 256 ( SHA 256 (raw) ) => b138360800cdc72248c3ca8dfd06de85913d1aac7f41b4fa54eb1f5a4a379081

Raw Transaction Data: (hex decimal format)
0100000001f3f6a909f8521adb57d898d2985834e632374e770fd9e2b98656f1bf1fdfd427010000006b48304502203a776322ebf8eb8b58cc6ced4f2574f4c73aa664edce0b0022690f2f6f47c521022100b82353305988cb0ebd443089a173ceec93fe4dbfe98d74419ecc84a6a698e31d012103c5c1bc61f60ce3d6223a63cedbece03b12ef9f0068f2f3c4a7e7f06c523c3664ffffffff0260e31600000000001976a914977ae6e32349b99b72196cb62b5ef37329ed81b488ac063d1000000000001976a914f76bc4190f3d8e2315e5c11c59cfc8be9df747e388ac00000000

Breakdown of Raw Transaction:
1. Version - All transactions include information about the Bitcoin Version number so we know which rules this transaction follows.
2. Input count - Which is how many inputs were used for this transaction
3. Input info - At a high level, it provides where the input is coming from and checks whether inputs can be used
- Previous output hash - All inputs reference back to an output (UTXO). This points back to the transaction containing the UTXO that will be spent in this input. The hash value of this UTXO is saved in a reverse order here.
- Previous output index - The transaction may have more than one UTXO which are referenced by their index number. The first index is 0.
- Unlocking Script Size - This is the size of the Unlocking Script in bytes.
- Unlocking Script - This is the hash of the Unlocking Script that fulfills the conditions of the UTXO Locking Script.
- Sequence Number - This is a deprecated feature of bitcoin, currently set to ffffffff by default.
4. Output count - which tells us how many outputs were produced from this transaction.
5. Output info - At a high level, it provides how many BTC outputted and conditions for future spending.
- Amount - The amount of Bitcoin outputted in Satoshis (the smallest bitcoin unit). 10^8 Satoshis = 1 Bitcoin.
- Locking Script Size - This is the size of the Locking Script in bytes.
- Locking Script - This is the hash of the Locking Script that specifies the conditions that must be met to spend this output.
6. Locktime - The locktime field indicates the earliest time or the earliest block a transaction can be added to the blockchain. If the locktime is non-zero and less than 500 million, it is interpreted as a block height and miners have to wait until that block height is reached before attempting to add it to a block. If the locktime is above 500 million, it is read as a UNIX timestamp which means the number of seconds since the date January 1st 1970. It is usually 0 which means confirm as soon as possible.

## Create a raw transaction
1. View all unspent confirmed UTXO in the wallet <br>
```listunspent - Show all the unspent confirmed outputs in our wallet)```

2. View Details about a Specific UTXO <br>
```gettxout - Get the details of this unspent output above```

3. Create a Raw Transaction <br>
```createrawtransaction - Create a transaction```

4. Decode the Raw Transaction (to double-check it went through correctly) <br>
```decoderawtransaction - View raw hex string that encodes the transaction details we supplied```

5. Sign the Raw Transaction <br>
``` signrawtransactionwithwallet ``` <br>
``` signrawtransaction - older versions than 0.17```

6. Submit the Raw Transaction to the Network <br>
```sendrawtransction - Takes the raw hex string produced by signrawtransaction and returns a transaction hash (txid) as it submits the transaction on the network.```

7. Query the TxID of the Transaction we sent <br>
```gettransaction - Query the TxID and view details. Similar to online block explorer```

## To build a simple blockchain
Some of the core ideas behind building a simple private blockchain are as follows:
1. Block Data Model
2. Create New Blocks
3. Store Blocks
4. Linking Blocks
5. Block Height and Timestamp
6. Level DB to Persist Data

First, lets discuss some key differences between public and private blockchain

|   |  Public Blockchain | Private Blockchain |
|---|---|---|
| Permissions  | Permissionless | Permissioned |
| Scalability  | More Difficult | Simpler |
| Vulnerability   | Less Vulnerable | More Vulnerable |
| Compliance   | More Difficult | Simpler |

Cross Chain Functionality: Allows a series of protocols that work in harmony to deliver decentralized applications

## Do You Really Need A Blockchain?
Some things to consider before deciding on need for having blockchain in your app

### Problem of Value Identification
1. Is there a need to share information, credentials or value with others?
2. Is trust a critical requirement to the process?
3. Do you need to prove to others you are transacting/reporting accurately?
4. Is there potential to monetize the data or digital asset in the value chain?
5. Who owns the problem? Individual or industry wide challenges?

### Stakeholders buy in
1. Is there a network of stakeholders (i.e. more than 2)?
2. Is there a dependency on others for information?
3. Does more than one participant need to update the data?
4. Is there scope to open up the ecosystem to ancillary parties in the future?
5. Are you working with other industry players on any activities?

### Technical considerations
1. Is there any ongoing need or future requirements for high data throughput?
2. Do you rely or use public data sources to make decisions?
3. Do you need to store a particularly rich/complex data structure?
4. Do you need to digitize assets in your value chain?
5. Do you need transaction privacy? Do you need anonymity?


# Ethereum 

### Ethereum Virtual Machine
- A VM that executes code
- A runtime for smart contracts

Refer: http://ethdocs.org/en/latest/introduction/what-is-ethereum.html?highlight=EVM#ethereum-virtual-machine

## Ethereum Acoounts

### Externally owned accounts (EOA)
- Tied to private key
- Doesn't hold code
- Maintains ether balance
- Can send transactions
- Call smart contracts
- Transfer balance between accounts

### Certificate accounts (CA)
- Has code
- Maintains ether balance
- Executes code when triggered by transaction or messages
- Manipulate storage

#### Account State Variables
- Nonce : number of transactions on the account 
EOA - # transanction send to account address
CA - # of smart contracts initiated by an account
- Account balance : Total value of ether in wei 
- Storage hash : Root node of particia tree contains the contents in the account
- Code hash : execute calls made to the account

## Smart Contracts

### Smart Contract Life Cycle
1. Develop - Write the contract and compile.
2. Deploy - Once deployed, the smart contract is un-editable. After deploying on any network (e.g. mainnet, testnet), you get an address specific to where contract was deployed.
3. Invoke - Use the address created after the smart contract is deployed to invoke contract to call functions on it.
4. Destroy - Once a contract has finished its purpose, it is important to destroy it so no one can call functions on it anymore. Remember that smart contracts cannot be edited once deployed. Also, often smart contracts are tied to funds, so keeping it around if it is no longer used puts these funds at risk.

### Tools
1. [Etherscan](https://etherscan.io/) - Etherscan is a Block Explorer and Analytics Platform for Ethereum, a decentralized smart contracts platform.
2. [Metamask](https://metamask.io/) - MetaMask is a bridge that allows you to visit the distributed web of tomorrow in your browser today. It allows you to run Ethereum dApps right in your browser without running a full Ethereum node.
3. [Remix](https://remix.ethereum.org/#optimize=false&version=soljson-v0.5.1+commit.c8a2cb62.js) - A browser based IDE that allows you to write Solidity and deploy solidity contracts.
4. [web3js](https://web3js.readthedocs.io/en/1.0/) - A collection of libraries that allow you to interact with a local or remote Ethereum node.
5. [Infura](https://infura.io/) - Gives you access to the Ethereum network without running your own local node.
6. [Ganache](https://truffleframework.com/ganache) - Application for launching local Ethereum blockchain instances.
7. [Truffle](https://truffleframework.com) - A development environment, testing framework, and asset pipeline meant to make your life easier as an Ethereum developer.
8. [Geth](https://geth.ethereum.org/) - A golang implementation of the Ethereum blockchain used to set up a local full Ethereum node.

## Solidity 
Solidity is an object-oriented, high-level language for implementing smart contracts. Smart contracts are programs which govern the behaviour of accounts within the Ethereum state.
API Reference: https://solidity.readthedocs.io/en/v0.5.4/ 
Use remix to write smart contracts on browser - https://remix.ethereum.org

## Tokens
The idea that Ethereum not only has its own currency (Ether) but also has tokens on top of that which can act as currency themselves.

good read - https://blockgeeks.com/guides/ethereum-token/

### Truffle commands
1. `truffle develop`- to run Truffle Development environment.
2. `compile` - to compile any changes in the Smart Contract.
3. `migrate` or `migrate --reset` - to migrate and create a fresh and clean Smart contract session.
4. `migrate --reset --network rinkeby` - to deploy in rinkeby network
5. `test` - to run the test cases.

### Bullish
1. [Rinkeby](https://faucet.rinkeby.io/) - Send test coins
2. [Rinkeby.io](https://www.rinkeby.io/#stats) - Rinkeby Live Stats
3. [Metamask faucet](https://faucet.metamask.io/) - Metamask test coins

### Community
1. https://forum.ethereum.org/categories/ethereum-js
