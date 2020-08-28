const crypto = require("crypto");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

class Wallet {
  generatePrivateKey() {
    const keyPair = ec.genKeyPair();
    const private = keyPair.getPrivate();
    return private.toString(16);
  }
  getPublicKey() {
    const private = this.generatePrivateKeyFromWallet();
    const privateKey = ec.generatePrivateKey(private, "hex");
    return privateKey.getPublic().encode("hex");
  }
}

module.exports = Wallet;
