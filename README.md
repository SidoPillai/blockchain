# blockchain
Block
Block holds information and is part of the chain. It is made up of
1. Block Header
  - Previous block hash : to identify what comes before
  - Timestamp : created 
  - Merkle root : a hash that represents every transaction in the block, it is also used to reverse and reconstructed the entire transaction set
  - nonce : arbitrary number that can only be used once -> block data + nonce => hash value
2. Block Difficulty - It is defined by the number of 0's in the hashvalue for e.g. 00000000HASHVALUE more 0's means more difficulty
3. Block Size - amount of space the block has to hold data; size remains the same for all the block in the chain. 
4. Hash value - Data + HashFunction(SHA 256) => #HASH#
5. Block number - to identify where it is located in the chain
1st block is also called the genesis block

  
