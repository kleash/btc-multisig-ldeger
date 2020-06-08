const config = require('./config');
const addressGen = require('./scripts/addressGenerator');
const ledgerHandler = require('./scripts/ledger');
const bitcoin = require("bitcoinjs-lib");

async function getAddress() {
    let publicKeys = [];
    for (const value of config.wallet) {
        {
            let ledger;
            if (value.module_type === 'ledger_nano') {
                if (!ledger) {
                    ledger = await ledgerHandler.init();
                }
                let publicKey = await ledgerHandler.getCompressedLedgerKey(ledger, value.pubkey_path);
                console.log('pubKey for : ', value.config_id, ' is: ', publicKey.toString('hex'));
                publicKeys.push(publicKey);
            } else if (value.module_type === 'filesystem') {
                let publicKey;
                if (value.pubkey) {
                    let ecPair = bitcoin.ECPair.fromPublicKey(Buffer.from(value.pubkey, 'hex'), {compressed: true});
                    publicKey = ecPair.publicKey;
                } else if (value.wif) {
                    let ecPair = bitcoin.ECPair.fromWIF(value.wif);
                    publicKey = ecPair.publicKey;
                } else {
                    console.error("unable to find public key for config ", value.config_id);
                    return;
                }
                console.log('pubKey for : ', value.config_id, ' is: ', publicKey.toString('hex'));
                publicKeys.push(publicKey);
            }
        }
    }
    return addressGen.getP2SHAddressAndRedeemScript(publicKeys);
}


if (require.main === module) {
    getAddress().then(v => console.log(`P2SH ADDRESS: ${v.address}\nReedeem Script: ${v.redeemScript.toString('hex')}`)).catch(console.error)
}


module.exports.getAddress = getAddress