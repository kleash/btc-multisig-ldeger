const config = require('./config');
const address = require('./address');
const bitcoin = require("bitcoinjs-lib");
const psbtHandler = require('./scripts/psbtHandler');


async function getRawPSBT() {
    let addressGenerated = await address.getAddress();
    console.log("Address : ", addressGenerated);
    let utxo = bitcoin.Transaction.fromHex(config.psbt.previousTx);
    return psbtHandler.generatePSBT(utxo, addressGenerated.redeemScript, config.common.NETWORK, config.psbt.outputs);
}

if (require.main === module) {
    getRawPSBT().then(v => console.log(`Raw PSBT for signers: ${v}`)).catch(console.error);
}