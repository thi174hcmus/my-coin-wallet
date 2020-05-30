const BlockChain = require("./models/chain.model");

function main(req, res, next) {
  var myCoin = new BlockChain();
  const block1 = myCoin.generateNextBlock({
    sender: "Iris Ljesnjanin",
    recipient: "Cosima Mielke",
    quantity: 50,
  });
  console.log('bl',JSON.stringify(block1, null, 4));
  myCoin.addNewBLock(block1);
  console.log(JSON.stringify(myCoin, null, 4));

  const block2 = myCoin.generateNextBlock({
    sender: "Vitaly Friedman",
    recipient: "Ricardo Gimenes",
    quantity: 100,
  });
  myCoin.addNewBLock(block2);

  console.log(JSON.stringify(myCoin, null, 4));
  next();
}
module.exports = main;
