const config = require('./config');
const bitcoin = require("bitcoinjs-lib");


//Seed for manual key
function rng() {
    return Buffer.from('hell123hell123hell123hell123hell');
}

const keyPair = bitcoin.ECPair.makeRandom({rng: rng});
console.log('Public Key : ' + keyPair.publicKey.toString('hex'));
console.log('WIF : ' + keyPair.toWIF());