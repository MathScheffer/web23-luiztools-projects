import express from 'express'
import morgan from 'morgan';
import Blockchain from '../lib/blockchain';

const PORT: number = 3000;

const app = express();

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

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`)
})
