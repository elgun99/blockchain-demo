const Crypto = require('crypto');

class Blockchain {
  constructor() {
    this.chain = [];
    this.genesisBlock = {};
    this.currentBlock = {};
    this.genesisBlock = {
      index: 0,
      timestamp: new Date().getTime(),
      data: 'Genesis Data',
      previousHash: '-1',
      nonce: 0
    };
    this.genesisBlock.hash = this.createHash(this.genesisBlock);
    this.fixNonce(this.genesisBlock);
    this.chain.push(this.genesisBlock);
    this.currentBlock = this.genesisBlock;
  }

  fixNonce(block) {
    while(true) {
      block.hash = this.createHash(block);
      if(block.hash.slice(0,3) === "000") {
        return block;
      }
      block.nonce++;
    }
  }

  createHash({timestamp, data, index, previousHash, nonce}) {
    return Crypto.createHash('SHA256').update(timestamp + data + index + previousHash + nonce).digest('hex');
  }

  addToChain(block) {
    if(this.checkNewBlockIsValid(block, this.currentBlock)) {
      this.chain.push(block);
      this.currentBlock = block;
      return true;
    }
    return false;
  }

  createBlock(data) {
    let newBlock = {
      timestamp: new Date().getTime(),
      data: data,
      index: this.currentBlock.index + 1,
      previousHash: this.currentBlock.hash,
      nonce: 0
    }
    newBlock.hash = this.createHash(newBlock);
    this.fixNonce(newBlock);
    return newBlock;
  }

  getChain() {
    return this.chain;
  }

  checkNewBlockIsValid(block, previousBlock) {
    if(previousBlock.index + 1 !== block.index) {
      return false;
    } else if(previousBlock.hash !== block.previousHash) {
      return false;
    } else if(!this.hashIsValid(block)) {
      return false;
    }
    return true;
  }

  hashIsValid(block) {
    return (this.createHash(block) === block.hash);
  }

}

module.exports = {Blockchain};
