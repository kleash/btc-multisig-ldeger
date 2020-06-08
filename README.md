# Multisig Transactions using usbwallet
This project contains code to generate multi sig transactions on separate systems.
It also supports using hardware wallet ledger.

# Usage

 - Change configuration data in `config.js`
 - run `npm address` to get P2SH address
 - Send a transaction to this address
 - Add this raw transaction in hash format under `psbt.previousTx` in config
 - run `npm unsigned` to generate unsigned raw transaction hex
 - now take this hex to pc with say wallet one. Add the raw hex under `signer.psbtRaw`
 - run `npm signer` to generate partially signed transaction
 - repeat the same step, take this hex to pc with say wallet two. Add the raw hex under `signer.psbtRaw`
 - if m=2 for P2SH, then set `signer.final` to true
 
# Instructions
 - `scripts` folder contains helper functions
 - `root` folder contains executable functions
 - Install node 8+ and do npm install for downloading dependencies
  
# Changelog

It still require lots of work

## v1.0

- ledger support
- p2sh bitcoin transaction support