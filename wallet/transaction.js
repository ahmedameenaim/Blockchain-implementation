const ChainUtil = require('./chain-util')
const { MINING_REWARD } = require('../config');

class Transaction {
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    update(senderWallet, recipient, amount){
        const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);
        if(amount > senderOutput.amount) {
            console.log(`Amount: ${amount} exceeds amount`);
            return;
        }
        senderOutput.amount = senderOutput.amount - amount;
        this.outputs.push({amount , address: recipient});
        Transaction.signTransaction(this,senderWallet);

        return this;

    }

    static transactionWithOutputs(senderWallet,outputs) {
        const transaction = new this;
        transaction.outputs.push(...outputs)
        Transaction.signTransaction(transaction,senderwallet);
        return transaction;
    }

    static newTransaction(senderWallet, recipient, amount){
        if(amout > senderWallet.balance) {
            console.log(`Amount ${this.amount} is exceeds the balance `);
            return;
        }

        return Transaction.transactionWithOutpust(senderWallet, [
            {amount: senderWallet.balance - amount , address: senderWallet.publicKey},
            {amount , recipient}
        ]);

    }

    static rewardTransaction(minerWallet,blockchainWallet){
        return Transaction.transactionWithOutputs(blockchainWallet , [{
            amount: MINING_REWARD , address: minerWallet.publicKey
        }])
    }

    static signTransaction(transaction, senderWallet) {
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
        }
    }
}

module.exports = Transaction;