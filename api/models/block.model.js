const CalculateHash = require("../utils/dataHashing");

// import Transaction from "./transaction.model";

class Block {
  constructor(index, previousHash, timestamp, data) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return CalculateHash.calculateHashData(
      this.index,
      this.previousHash,
      this.timestamp,
      this.data,
      this.nonce
    );
  }

  proofOfWork(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

module.exports = Block;
