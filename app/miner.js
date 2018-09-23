const Wallet = require('../wallet/index');
const Transaction = require('../wallet/transaction');

class Miner {
    constructor(blockchain, transactionPool , wallet , p2pServer) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }


    mine() {
        const validTransactions = this.transactionPool.validTransactions();
        validTransaction.push(Transaction.rewardTransaction(this.wallet , Wallet.blockchainWallet())

    );

    }
}

module.exports = Miner;