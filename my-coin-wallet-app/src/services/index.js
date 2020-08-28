const axios = require("axios");

async function createWallet() {
  return await axios.post("http://localhost:4000/new-wallet")
}

async function accessWallet(privateKey) {
  return await axios.post("http://localhost:4000/access-wallet", { privateKey })
}

async function getBalance(wallet) {
  return await axios.get("http://localhost:4000/balance", { params: { wallet } })
}

async function send(privateKey, toAddress, amount) {
  return await axios.post("http://localhost:4000/send", { privateKey, toAddress, amount })
}

async function mining(wallet) {
  return await axios.post("http://localhost:4000/mining", { wallet })
}

async function getTransactions(wallet) {
  return await axios.get("http://localhost:4000/transactions", { params: { wallet } })
}

async function getPendingTransactions(wallet) {
  return await axios.get("http://localhost:4000/pending-transactions", { params: { wallet } })
}

export default {
   createWallet, 
   accessWallet,
   getBalance,
   send,
   mining,
   getTransactions,
   getPendingTransactions,
};
