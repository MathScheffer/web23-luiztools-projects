import Blockchain from "../src/lib/blockchain";
import {describe, expect, test} from "@jest/globals";

describe("Blockchain", () => {
    test("Should create blockchain with a genesis block", () => {
        const blockchain = new Blockchain();
        const blocks = blockchain.blocks;
        expect(blocks).toHaveLength(1);
        const block = blocks[0];
        //expect(block.hash).not.toBeNull();
        expect(block.hash).toBeTruthy();
    })
})