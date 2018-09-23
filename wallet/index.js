const {INITIAL_BALANCE} = require('../config');
const ChainUtil = require('./chain-util');
const Transaction = require('./transaction');

class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex'); // address
      }


    toString() {
        return `Wallet -
          publicKey : ${this.publicKey.toString()}
          balance   : ${this.balance}`
      }

    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recipient , amount , transactionPool){
        if(amount > balance){
            console.log(`Amount: ${amount} exceeds the balance : ${this.balance}`)
            return;
        }

        let transaction = transactionPool.existingTranscation(this.publicKey);

        if(transaction) {
            transaction.update(this, recipient , amount);
        } else {
            transaction = Transaction.newTransaction(this, recipient , amount);
            transactionPool.updateOrAddTransaction(transaction);

        }

        return true;
        
    }

    static blockchainWallet() {
        const blockchainWallet = new this();
        blokchainWallet.address = 'blockchain-wallet';
        return blockchainWallet;
    }
}


module.exports = Wallet