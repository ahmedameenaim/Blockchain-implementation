const Transaction = require('./transaction')
class TransactionPool {
    constructor(){
        this.transactions = [];
    }

    updateOrAddTransaction(transaction) {
        let transactionWithId = this.transactions.find(t => t.id === transaction.id);

        if(transactionWithId){
            this.transactions[this.transactions.indexOf(this.transactionWithId)] = transaction;
        } else {
            this.transactions.push(transaction);
        }
    }

    existingTranscation(address) {
        return this.transactions.find(t => t.input.address === address);
    }

    validTransactions() {
        return this.transactions.filter(transaction => {
            const outputTotal = transaction.outputs.reduce((total , output) => {
                return total + output.amout;
            }, 0)
            if(transaction.input.amount !== outputTotal) {
                console.log(`Invaild transaction from address ${transaction.input.address}`);
                return;
            }
            if(!Transaction.verifyTransaction(transaction)){
                console.log(`Transaction: signature not valid ${transaction.input.address}`);
                return;
            }
            return transaction;
        });
        
    }
}

module.exports = TransactionPool;