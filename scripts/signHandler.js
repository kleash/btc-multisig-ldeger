const bitcoin = require("bitcoinjs-lib");
const config = require('../config');

function splitTransaction(ledger, tx) {
    return ledger.splitTransaction(tx.toHex(), tx.hasWitnesses());
}

async function signUsingLedger(ledger, utxo, psbt, publicKey, network, ledgerRedeemScript, inputToSign = 0) {
    //Signing with ledger
    let newTx = psbt.__CACHE.__TX;
    const inLedgerTx = splitTransaction(ledger, utxo);
    const outLedgerTx = splitTransaction(ledger, newTx);
    console.log('outLedgerTx after splitTransaction on rwa psbt: ' + inLedgerTx);
    let outputScriptHex = ledger.serializeTransactionOutputs(outLedgerTx).toString('hex');
    console.log('outputScriptHex after serializeTransactionOutputs: ' + outputScriptHex);

    const signer = {
        network: network,
        publicKey: publicKey,
        sign: async ($hash) => {
            console.log('hash for pub1 signing: ' + $hash.toString('hex'))
            const ledgerTxSignatures = await ledger.signP2SHTransaction(
                [[inLedgerTx, inputToSign, ledgerRedeemScript.toString('hex')]],
                [publicKey],
                outputScriptHex
            );

            let ledgerSignature = ledgerTxSignatures[0];
            let finalSignature = Buffer.concat([Buffer.from(ledgerSignature, 'hex'), Buffer.from('01', 'hex')]);
            let scriptSignature = bitcoin.script.signature.decode(finalSignature).signature;
            return scriptSignature;
        },
    }
    await psbt.signInputAsync(0, signer);
    return psbt.toBase64();
}

async function signUsingLocalKeypair(psbt, publicKey, inputToSign = 0) {
    const keyPairSigner = {
        network: config.common.NETWORK,
        publicKey: publicKey,
        sign: async ($hash) => {
            let buffer = keyPair.sign($hash);
            return buffer
        }
    }

    await psbt.signInputAsync(inputToSign, keyPairSigner);
    return psbt.toBase64();
}

module.exports.signUsingLocalKeypair = signUsingLocalKeypair;
module.exports.signUsingLedger = signUsingLedger;