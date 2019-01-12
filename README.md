# blockchain
Trying out some blockchain stuff

1. Hashing Exercise - https://github.com/siddeshpillai/blockchain/tree/hashing-exercise
2. Block Exercise - https://github.com/siddeshpillai/blockchain/tree/block-exercise
3. Bitcoin Message - https://github.com/siddeshpillai/blockchain/tree/bitcoin-message
4. Block Explorer - https://github.com/siddeshpillai/blockchain/tree/block-explorer

# Resources
- Bitcoin Stats - https://bitcoinvisuals.com/stats
- Importing bitcoins via private keys - https://bitcoinelectrum.com/importing-your-private-keys-into-electrum/
- Generate your own address - https://bitaddress.org
- Bitoin Developer Glossary - https://bitcoin.org/en/developer-glossary#a

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

## Wallets
Blockchain identities are made up of a few important tools like wallets, addresses, and keys. Not only are there a few of these different tools creating our identity, it's also possible to implement them in different ways.

1. Non-deterministic: (random wallets) A wallet where private keys are generated from random numbers.
2. Sequentia deterministic: A wallet where addresses, private keys, and public keys can be traced back to their original seed words.
3. Hierarchical Deterministic Wallet: An advanced type of deterministic wallet that contains keys derived in a tree structure.

## Block
A typical Block is comprised of 2 things:
1. Block Header
2. Transaction data

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

### Transaction Data
Transaction data is made up of the following:
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
