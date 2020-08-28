const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const BlockChain = require("../models/chain.model");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ wallets: [] }).write();

module.exports = db;
