import Block from "./block";
import Validation from "../validation";
import BlockInfo from "../blockInfo";

export default class Blockchain {
    blocks: Block[];
    nextIndex: number = 0;

    constructor() {
        this.blocks = [new Block(0, "", "Genesis Block")];
        this.nextIndex++;
    }

    addBlock(block: Block): Validation {
        if(block.index < 0) return new Validation(false, "invalid  mock block");

        this.blocks.push(block);
        this.nextIndex++;

        return new Validation(true);
    }

    getBlock(hash: string): Block | undefined{
        return this.blocks.find(b => b.getHash() === hash);
    }

    getLasBlock(): Block{
        const currentBlocksLength: number = this.blocks.length
        return this.blocks[currentBlocksLength - 1]!
    }

    isValid(): Validation{
        return new Validation(true);
    }

        getFeePerTx() : number {
            return 1; // da menor unidade da blockchain. Ex.: 1 satoshi, 1 wuei (etherum)
        }
    
        getNextBlockInfo() : BlockInfo {
    
            return {
                 data: new Date().toString(),
                 difficult: 0,
                 previousHash: this.getLasBlock().hash,
                 index: 1,
                 feePerTx: this.getFeePerTx(),
                 maxDifficult: 62
            } as BlockInfo
        }
};