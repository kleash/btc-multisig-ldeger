const config = require('./config');
const address = require('./address');
const bitcoin = require("bitcoinjs-lib");
const ledgerHandler = require('./scripts/ledger');
const signHandler = require('./scripts/signHandler');


async function sign() {

    let psbt = bitcoin.Psbt.fromHex(config.signer.psbtRaw);

    for (const walletID of config.signer.wallets) {
        for (const value of config.wallet) {
            if (value.config_id === walletID) {
                switch (value.module_type) {
                    case "filesystem":
                        let publicKey;
                        if (value.pubkey) {
                            let ecPair = bitcoin.ECPair.fromPublicKey(Buffer.from(value.pubkey, 'hex'), {compressed: true});
                            publicKey = ecPair.publicKey;
                        } else if (value.wif) {
                            let ecPair = bitcoin.ECPair.fromWIF(value.wif, config.common.NETWORK);
                            publicKey = ecPair.publicKey;
                        }
                        await signHandler.signUsingLocalKeypair(psbt, publicKey, config.signer.txnIndex);
                        break;
                    case "ledger_nano":
                        let ledger = await ledgerHandler.init();
                        let ledgerPublicKey = await ledgerHandler.getCompressedLedgerKey(ledger, value.pubkey_path);
                        await signHandler.signUsingLocalKeypair(psbt, ledgerPublicKey, config.signer.txnIndex);
                        break;
                    default:
                }

            }
        }
    }
    let sigValid = psbt.validateSignaturesOfAllInputs();

    if (!sigValid) {
        console.error("Error in signing the transaction");
        return;
    }

    if (config.signer.final === true) {
        psbt.finalizeAllInputs();
        console.log("final txn to broadcast : ", psbt.extractTransaction().toHex())
        return psbt.extractTransaction().toHex();
    } else {
        console.log("partial signed txn : ", psbt.toHex());
        return psbt.toHex();
    }

}


if (require.main === module) {
    sign().catch(console.error);
}