const config = require('../config');
const bitcoin = require("bitcoinjs-lib");

async function getP2SHAddressAndRedeemScript(publicKeys) {

    if (!publicKeys) {
        console.error("No public keys defined to generated P2SH script");
        return;
    }
    console.log('n= ', publicKeys.length)

    let bitcoinP2MS = bitcoin.payments.p2ms({pubkeys: publicKeys, network: config.common.NETWORK, m: config.common.m});
    let bitcoinP2SH = bitcoin.payments.p2sh({redeem: bitcoinP2MS, network: config.common.NETWORK});
    let address = bitcoinP2SH.address;
    let redeemScript = bitcoinP2SH.redeem.output;
    return {
        redeemScript
        , address
    };
}

module.exports.getP2SHAddressAndRedeemScript = getP2SHAddressAndRedeemScript;