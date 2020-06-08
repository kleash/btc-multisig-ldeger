const bitcoin = require("bitcoinjs-lib");

let config = {
    common: {
        NETWORK: bitcoin.networks.bitcoin,
        config_id: 'common_config',
        m: 2,
        n: 3
    },
    wallet: [
        {
            config_id: 'first_ledger',
            module_type: 'ledger_nano',
            pubkey_path: "m/44'/0'/0'/3/1"
        },
        {
            config_id: 'second_ledger',
            module_type: 'ledger_nano',
            pubkey_path: "m/44'/0'/0'/4/1"
        },
        {
            config_id: 'local_key',
            module_type: 'filesystem',
            pubkey: '',
            wif: 'KzieGjTHobt9uNmTCvV2kjLRqUjbAXJZuhBF8KxVS52GRqcuUBPu'
        }
    ],
    psbt: {
        outputs: [
            {
                address: '38cjGqAWVitZnhSvPB9sRdbC3oZnbZ926W',
                amount: ''
            }
        ],
        previousTx: '01000000000101502d8c1ca221cae0c17cbdb91a6d53ab64b9e853f801534d39d77e6c7beaa91b000000001716001451b6359fc31601c42d6ceafdb4feb3a51773aff8ffffffff02102700000000000017a9146537919ff269808b86e67af430c669b85a85c44a8738eb00000000000017a914ae7bb394357e2b26764c4be6620c6ccccfe73a5a870247304402206492dd7cfa391e68357c9eba06a139b7389c81d4a7640d8789a984a984f27ed7022067e262d32d0a5c532251141bcb5e304a7ca004bc30bf148366081d3be3f9a01c012103f80c4f835c26dade6082f6ba95ac3a4e4b04cde0277e7f658b8ec0780d2d4b7200000000',
        fee: 100, //used if amount is left empty. It will send all from input - fee
    },
    signer: {
        wallets: [
            'first_ledger',
            'second_ledger',
            'local_key'
        ],
        psbtRaw: '70736274ff0100530100000001d8c16be44675f610cbe480060b67e60d65791f42d82b1535250694d155076e090000000000ffffffff01ac2600000000000017a9144bf95157574120aacb22b21a160461125a6c29458700000000000100f701000000000101502d8c1ca221cae0c17cbdb91a6d53ab64b9e853f801534d39d77e6c7beaa91b000000001716001451b6359fc31601c42d6ceafdb4feb3a51773aff8ffffffff02102700000000000017a9146537919ff269808b86e67af430c669b85a85c44a8738eb00000000000017a914ae7bb394357e2b26764c4be6620c6ccccfe73a5a870247304402206492dd7cfa391e68357c9eba06a139b7389c81d4a7640d8789a984a984f27ed7022067e262d32d0a5c532251141bcb5e304a7ca004bc30bf148366081d3be3f9a01c012103f80c4f835c26dade6082f6ba95ac3a4e4b04cde0277e7f658b8ec0780d2d4b7200000000010469522103acaa4b864eb8e85630d1da1a935ac8634de945c30163df757df6cf861497ae302103e1b35794ec451523daa6bf9d54c61b59f8afd7df06ca669be35cff15c8427bf02103d7f62b9c0dca6419d49f33291ecbe42d305aed9bc3497cc64d514fc798ea27d753ae0000',
        final: true,
        txnIndex: 0
    }
};

module.exports = config;