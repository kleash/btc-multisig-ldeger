const bitcoin = require("bitcoinjs-lib");

function generatePSBT(utxo, redeemScript, network, outputs, fee = 100, txIndex = 0, version = 1) {
    let psbt = new bitcoin.Psbt({network: network});
    psbt.addInput({
        hash: utxo.getId(),
        index: txIndex,
        nonWitnessUtxo: utxo.toBuffer(),
        redeemScript: redeemScript,
    });
    outputs.forEach(value => {
        let amount;
        if (value.amount) {
            amount = value.amount;
        } else {
            let inputAmount = utxo.outs[txIndex].value;
            amount = inputAmount - fee;
        }
        psbt.addOutput({
            address: value.address,
            value: amount
        });
    });

    psbt.setVersion(version);
    return psbt.toHex();
}

module.exports.generatePSBT = generatePSBT