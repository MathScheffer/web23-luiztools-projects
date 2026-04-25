import Block from "../src/lib/block";
import {beforeAll, describe, expect, test} from "@jest/globals";
import BlockInfo from "../src/lib/blockInfo";

describe("Block", () => {

    let exampleDificult = 0;
    let genesis: Block;
    let miner = "Luiz"

    beforeAll(() => {
        genesis = new Block(0, "", "Genesis block")
    })
    test("should create valid", () => {
        const block = new Block(1, genesis.hash,"data");
        block.mine(exampleDificult, miner);
        expect(block.isValid(genesis.hash, genesis.index, exampleDificult).success).toBeTruthy();
    })

    test("should not create invalid with -1", () => {
        const block = new Block(-1, genesis.hash,"data");
        expect(block.isValid(genesis.hash, genesis.index, exampleDificult).success).toBeFalsy();
    })
    test("should not create invalid without previous hash", () => {
        const block = new Block(1, "","data");
        expect(block.isValid(genesis.hash, genesis.index, exampleDificult).success).toBeFalsy();
    })
        test("should not create invalid with diff previous hash", () => {
        const block = new Block(1, "previous hash diferente da blockchain","data");
        expect(block.isValid(genesis.hash, genesis.index, exampleDificult).success).toBeFalsy();
    })
    test("should not create invalid with diff previous index - current index = 2", () => {
            // para isto, previsamos colocar o index do bloco diferente do esperado: se for o segundo, não poderá ser 1 para o teste dar certo
        const block = new Block(2, genesis.hash,"data");
        expect(block.isValid(genesis.hash, genesis.index, exampleDificult).success).toBeFalsy();
    })
   test("should not create invalid with diff previous index - current index = 0", () => {
            // para isto, previsamos colocar o index do bloco diferente do esperado: se for o segundo, não poderá ser 1 para o teste dar certo
        const block = new Block(0, genesis.hash,"data");
        expect(block.isValid(genesis.hash, genesis.index, exampleDificult).success).toBeFalsy();
    })
    test("should not create invalid without data", () => {
        const block = new Block(1, genesis.hash,"");
        expect(block.isValid(genesis.hash, genesis.index, exampleDificult).success).toBeFalsy();
    });


    test("should not create invalid - without hash", () => {
        const block = new Block(1, genesis.hash,"data");

        block.mine(1, miner);

        block.hash = "";

        expect(block.isValid(genesis.hash, genesis.index, exampleDificult).success).toBeFalsy();
    });

    test("Block with invalid prefix", () => {
        const block = new Block(1, genesis.hash,"data");
        block.mine(2, "teste");
        console.log("Hash after mined: ", block.hash)
        block.hash = "A" + block.hash.substring(1);

        console.log("Hash after adultered:", block.hash)

        expect(block.isValid(genesis.hash, genesis.index, 2).success).toBeFalsy();
    });

    test("should not create invalid with timestamp -1", () => {
        const block = new Block(1, genesis.hash,"data");
        block.timestamp = -1;
        block.hash = block.getHash();
        expect(block.isValid(genesis.hash, genesis.index, exampleDificult).success).toBeFalsy();
    })

    test("Adultered block should be invalid", () => {
        const block = new Block(1, genesis.hash,"data");
        block.data = "teste ihu";
        expect(block.isValid(genesis.hash, genesis.index, exampleDificult).success).toBeFalsy();
    })

    test("Should return a block entity with fromBlock function", () => {
        const myBlock = Block.fromBlockInfo({    "index": 1,
            previousHash: "abc",
            data: "testung block"} as BlockInfo);

        expect(myBlock).toBeInstanceOf(Block);
        expect(myBlock.previousHash).toBe("abc");
        expect(myBlock.data).toBe("testung block");
        expect(myBlock.index).toBe(1);

    })

});