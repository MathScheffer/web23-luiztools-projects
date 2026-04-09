import Block from "../src/lib/block";
import Blockchain from "../src/lib/blockchain";
import {describe, expect, test} from "@jest/globals";

describe("Blockchain", () => {
    var blockchain: Blockchain;

    beforeEach(() =>{
        blockchain = new Blockchain();
    })

    test("Should create blockchain with a genesis block", () => {
        const blockchain = new Blockchain();
        const blocks = blockchain.blocks;
        const block = blocks[0];
        //expect(block.hash).not.toBeNull();
        expect(block.hash).toBeTruthy();
    })

    test("Should be valid with a genesis block", () => {
        const blockchain = new Blockchain();
        expect(blockchain.isValid().success).toEqual(true);
    })

    test("Should get lastBlock", () => {
        const blockchain = new Blockchain();
        const lastBlock = blockchain.getLasBlock();
        expect(lastBlock).toBeTruthy();
    })

    test("Should add block to a blockchain", () => {
        const secondBlock = new Block(1, blockchain.getLasBlock().hash, "Novo bloco")
        const result =  blockchain.addBlock(secondBlock).success;

        expect(result).toEqual(true)
    })

    test("Should add 2 blocks to a blockchain", () => {
        const secondBlock = new Block(1, blockchain.getLasBlock().hash, "Novo bloco");
        blockchain.addBlock(secondBlock);

        const thirdBlock = new Block(2, blockchain.getLasBlock().hash, "Novo bloco");
        const result = blockchain.addBlock(thirdBlock).success;

        expect(result).toEqual(true)
    })

    test("Should not add block to a blockchain", () => {
        const blockchain = new Blockchain();
        const secondBlock = new Block(-1, blockchain.blocks[0].hash, "Novo bloco")
        const result =  blockchain.addBlock(secondBlock);

        expect(result.success).toEqual(false)
    })

    test("Blockchain should not be valid when genesis block was adultered", () => {
        const blockchain = new Blockchain();
        const secondBlock = new Block(1, blockchain.blocks[0].hash, "Novo bloco")
        blockchain.addBlock(secondBlock);
        blockchain.blocks[0].data = "a transfere 2 para b";
        expect(blockchain.isValid().success).toEqual(false)
    })

    test("Blockchain should not be valid when last block was adultered", () => {
        const blockchain = new Blockchain();
        const secondBlock = new Block(1, blockchain.blocks[0].hash, "Novo bloco")
        blockchain.addBlock(secondBlock);
        blockchain.blocks[1].data = "a transfere 2 para b";
        expect(blockchain.isValid().success).toEqual(false)
    })

    test("Should get block", () => {
        const blockchain = new Blockchain();
        expect(blockchain.getBlock('0')?.index).toBe(1)
    })

})