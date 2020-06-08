const regeneratorRuntime = require("regenerator-runtime");
const Transport = require("@ledgerhq/hw-transport-node-hid");
const AppBtc = require("@ledgerhq/hw-app-btc");
const bitcoin = require("bitcoinjs-lib");

async function init() {
    const transport = await Transport.default.create();
    return new AppBtc.default(transport);
}

async function getCompressedLedgerKey(ledger, path) {
    let pubKey = await ledger.getWalletPublicKey(path)
    const {publicKey} = bitcoin.ECPair.fromPublicKey(Buffer.from(pubKey.publicKey, 'hex'));
    return publicKey;
}

module.exports.init = init;
module.exports.getCompressedLedgerKey = getCompressedLedgerKey;