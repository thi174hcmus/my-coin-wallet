const CalculateHash = require("../utils/dataHashing");
const Block = require("./block.model");

// import actions from "../constants";

// import { generateProof, isProofValid } from "../utils/proof";

class Chain {
  constructor() {
    this.blockchain = [this.getGenesisBlock()];
    this.difficulty = 4;
    // this.currentTransactions = [];
    // this.nodes = [];
    // this.io = io;
  }

  getGenesisBlock() {
    const genesisIndex = 0;
    const genesisPreviousHash = "0";
    const genesisTimestamp = new Date();
    const genesisData = "Initial Block in the Chain";
    return new Block(
      genesisIndex,
      genesisPreviousHash,
      genesisTimestamp,
      genesisData
    );
  }

  getLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }

  generateNextBlock(blockData) {
    const previousBlock = this.getLatestBlock();
    const nextIndex = previousBlock.index + 1;
    const previousHash = previousBlock.hash;
    
    const nextTimestamp = new Date().getTime() / 1000;
    return new Block(nextIndex, previousHash, nextTimestamp, blockData);
  }

  isValidNewBlock(newBlock, chain) {
    const previousBlock = chain[chain.length - 1];
    if (previousBlock.index + 1 !== newBlock.index) {
      return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
      return false;
    } else if (CalculateHash.calculateHashBlock(newBlock) !== newBlock.hash) {
      return false;
    }
    return true;
  }

  addNewBLock(newBlock) {
    if (this.isValidNewBlock(newBlock, this.blockchain)) {
      newBlock.proofOfWork(this.difficulty);
      this.blockchain.push(newBlock);
    }
  }

  replaceChain(newBlocks) {
    if (
      this.isValidBlockchain(newBlocks) &&
      newBlocks.lenth > this.blockchain.length
    ) {
      this.blockchain = newBlocks;
      //breoadcast
    }
    // else Received blockchain invalid
  }

  isValidBlockchain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(this.getGenesisBlock())) {
      return false;
    }
    const tempBlockChain = [chain[0]];
    for (let i = 0; i < chain.length; i++) {
      if (this.isValidNewBlock(chain[i], tempBlockChain[i - 1])) {
        tempBlockChain.push(chain[i]);
      } else {
        return false;
      }
    }
    return true;
  }
}

module.exports = Chain;
