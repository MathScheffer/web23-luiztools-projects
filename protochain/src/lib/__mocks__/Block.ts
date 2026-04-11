import Validation from "../validation";

export default class Block {
    index: number;
    timestamp: number;
    hash: string ;
    previousHash: string;
    data: string;

    constructor(index: number, previousHash: string, data: string) {
        this.index = index;
        this.timestamp = Date.now();
        this.previousHash = previousHash;
        this.data = data;
        this.hash = this.getHash();
    }

    getHash(): string {
        return this.hash || "abc"
    }

    isValid(blockchainPreviousHash: string, previousIndex: number): Validation {
        if(!blockchainPreviousHash || previousIndex < 0 || this.index < 0)
            return new Validation(false, "invalid block")
        return new Validation();
    }
}
