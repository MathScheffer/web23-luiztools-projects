import express from 'express'
import morgan from 'morgan';
import Blockchain from '../lib/blockchain';
import Block from '../lib/block';

const PORT: number = 3000;

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
        return res.status(422).json({"erro": "corpo da requisição não pode ser vazio"})
    }

    if (typeof body.data !== 'string' || typeof body.previous_hash !== 'string') {
        return res.status(422).json({"erro": "corpo da requisição está incompleto ou contém campos inválidos"})
    }

    const newBlock = new Block(body.index ?? blockchain.nextIndex, body.previous_hash, body.data);

    const addValidation = blockchain.addBlock(newBlock);

    if (!addValidation.success) {
        return res.status(422).json({"erro": "Bloco inválido!", "message": addValidation.message});
    }

    res.status(201).json(blockchain.getLasBlock())
})

if(process.argv.includes("--run"))
    app.listen(PORT, () => {
        console.log(`Rodando na porta ${PORT}`)
    })

export{
    app
}