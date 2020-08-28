const crypto = require("crypto");
const EC = require("elliptic");
const ec = new EC.ec("secp256k1");

class Wallet {
  constructor(){
    this.keyPair = this.generateKeyPair()
  }
  generateKeyPair() {
    return ec.genKeyPair();
  }
  getPrivateKey() {
    const privateKey = this.keyPair.getPrivate('hex');
    return privateKey;
  }
  getPublicKey() {
    const publicKey = this.keyPair.getPublic('hex');
    return publicKey;
  }
  getWalletAddress() {
    return this.getPublicKey();
  }
}

module.exports = Wallet;
