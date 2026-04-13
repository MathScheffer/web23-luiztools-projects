import Block from "./block";
import Validation from "./validation";

export default class Blockchain {
    blocks: Block[];
    nextIndex: number = 0;
    static readonly DIFFICULT = 5;

    constructor() {
        this.blocks = [new Block(this.nextIndex, "", "Genesis Block")];
        this.nextIndex++;
    }

    getDifficult(): number {
        return Math.ceil( this.blocks.length / Blockchain.DIFFICULT )
    }

    addBlock(block: Block): Validation {
        const lastBlock = this.getLasBlock();
        const currentDifficult = this.getDifficult();

       if (!(block.isValid(lastBlock.getHash(), lastBlock.index, currentDifficult).success)) return block.isValid(lastBlock.getHash(), lastBlock.index, currentDifficult);

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
        // os blocos mais fáceis de serem adulterados são os mais novos, por tanto, começamos a validar pelo fim da blockchain
        for(let i = this.blocks.length - 1; i > 0; i--){
            const currentBlock = this.blocks[i]!;
            const previousBlock = this.blocks[i-1]!;
            
            const validation = currentBlock.isValid(previousBlock.getHash(), previousBlock.index);
            if (!validation.success) return new Validation(false, `Validation failed: ${validation}`);
        }
        
        return new Validation(true);
    }
}