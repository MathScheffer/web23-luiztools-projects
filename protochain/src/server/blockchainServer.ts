import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import morgan from 'morgan';
import Blockchain from '../lib/blockchain';
import Block from '../lib/block';

const PORT: string = `${process.env.BLOCKCHAIN_PORT || 3000}`;

const app = express();

if(process.argv.includes("--run"))
    app.use(morgan('tiny'));

app.use(express.json());

const blockchain = new Blockchain();

app.get('/status', (req, res, next) => {
    res.json({
        numberOfBlocks: blockchain.blocks.length,
        validation: blockchain.isValid(),
        lastBlock: blockchain.getLasBlock()
    })
})

app.get('/block/next', (req, res, next) => {
    res.json(blockchain.getNextBlockInfo())

});

app.get('/block/:indexOrHash', (req, res, next) => {
    const query = req.params.indexOrHash;
    let block;

    if(/^[0-9]+$/.test(query)){
        block = blockchain.blocks[parseInt(query)]
    } else {
        block = blockchain.getBlock(query);
    }

    if(!block) return res.status(404).json({ error: 'Block not found' });

    res.json(block)
})

app.post('/block', (req,res,next) => {
    const body = req.body;

    if(!body || Object.keys(body).length === 0){
        return res.status(422).json({"message": "corpo da requisição não pode ser vazio"})
    }

    if (typeof body.data != 'string' || typeof body.previousHash != 'string' ) {
        return res.status(422).json({"message": "corpo da requisição está incompleto ou contém campos inválidos"})
    }

    const newBlock = new Block(body.index, body.previousHash, body.data, body.nonce, body.miner);
    newBlock.timestamp = body.timestamp;
    newBlock.hash = body.hash;

    /**
     * Bloco deve ser minerado antes de ser adicionado. 
     * 
     *     newBlock.mine(blockchain.getDifficult(), 'uga gua');
     */


    const addValidation = blockchain.addBlock(newBlock);

    if (!addValidation.success) {
        return res.status(422).json({"erro": "Bloco inválido!", "message": addValidation.message});
    }

    res.status(201).json(blockchain.getLasBlock())
})
    /*c8 ignore start*/

if(process.argv.includes("--run"))

    app.listen(PORT, () => {
        console.log(`Rodando na porta ${PORT}`)
        console.log('genesis:')
        console.log(blockchain.getLasBlock())
    })
    /*c8 ignore end*/

export{
    app
}