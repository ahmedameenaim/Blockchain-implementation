const express = require('express');
const Blockchain = require('../createBlockchain')
const bodyParser = require('body-parser');
const P2PServer = require('./p2pServer');
const Wallet = require('../wallet/index');
const TransactionPool = require('../wallet/transaction-pool');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const wallet = Wallet()
const tp = new TransactionPool();
const p2pServer = new P2PServer(bc,tp);

app.use(bodyParser.json())

app.get('/blocks', (req,res) => {
    res.json(bc.chain);
})

app.get('/transactions', (req,res) => {
    res.json(tp.transactions);
})

app.get('/public-key', (req,res) => {
    res.json({ publicKey: wallet.publicKey})
})

app.post('/transact', (req,res) =>{
    const {recipient , amount} = req.body;
    const transaction = wallet.createTransaction(recipient, amount , tp);
    P2pServer.broadcastTransaction(transaction)
    res.redirect('/transactions');
})

app.post('/mine', (req,res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`a snew block added: ${block.toString()}`);
    P2PServer.syncChains();
    res.redirect('/blocks');
});



app.listen(HTTP_PORT, () => {
    console.log(`listen on port ${HTTP_PORT}`)
})

p2pServer.listen();