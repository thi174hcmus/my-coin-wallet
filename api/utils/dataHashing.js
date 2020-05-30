const CryptoJS = require("crypto-js");

function calculateHashData(index, previousHash, timestamp, data, nonce) {
  return CryptoJS.SHA256(
    index + previousHash + timestamp + JSON.stringify(data) + nonce
  ).toString();
}

function calculateHashBlock(block) {
  return calculateHashData(
    block.index,
    block.previousHash,
    block.timestamp,
    block.data,
    block.nonce
  );
}

module.exports = {
  calculateHashData,
  calculateHashBlock,
};
