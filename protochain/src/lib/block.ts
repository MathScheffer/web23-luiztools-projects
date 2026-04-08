import sha256 from "crypto-js/sha256";
import Validation from "./validation";

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
        return sha256(this.index + this.data + this.timestamp + this.previousHash).toString()
    }

    isValid(blockchainPreviousHash: string, previousIndex: number): Validation {
        if (this.index < 0) return new Validation(false, "invalid index");
        if (!this.previousHash) return new Validation(false, "none previous hash");
        if (this.previousHash !== blockchainPreviousHash)  return new Validation(false, "invalid previous hash");
        if (previousIndex !== this.index - 1)  return new Validation(false, "invalid previous index");;
        if (!this.data)  return new Validation(false, "invalid data");
        if (this.hash.length === 0) return new Validation(false, "invalid previous hash");
        /*
        Precisamos chamar getHash() novamente e comparar com o hash atual.
        Se for adulterado o bloco, getHash() retornará um hash diferente do atual.
        */
        if(this.hash !== this.getHash())  return new Validation(false, "adulterated block error");
        if(this.timestamp < 1)  return new Validation(false, "invalid timestamp");        
        return new Validation();
    }
}
