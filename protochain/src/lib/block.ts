import sha256 from "crypto-js/sha256";
import Validation from "./validation";

export default class Block {
    index: number;
    timestamp: number;
    hash: string ;
    previousHash: string;
    data: string;
    nonce: number;
//hash do minerador
    miner: string;

    constructor(index: number, previousHash: string, data: string, nonce?: number, miner?: string) {
        this.index = index;
        this.timestamp = Date.now();
        this.previousHash = previousHash;
        this.data = data;
        this.nonce = nonce || 0;
        this.miner = miner || "";
        this.hash = this.getHash();
    }

    getHash(): string {
        return sha256(this.index + this.data + this.timestamp + this.previousHash + this.nonce + this.miner).toString()
    }

    /**
     * Generate a valid hash for the block
     * @param difficult 
     * @param miner 
     */
    mine(difficult: number, miner: string): void{
            this.miner = miner;

            const prefix = new Array(difficult + 1).join("0");

            do {
                this.nonce++;

                this.hash = this.getHash();
            } while(!this.hash.startsWith(prefix))
    }


    isValid(blockchainPreviousHash: string, previousIndex: number, difficult: number): Validation {
        if (this.index < 0) return new Validation(false, "invalid index");
        if (!this.previousHash) return new Validation(false, "none previous hash");
        if (this.previousHash !== blockchainPreviousHash)  return new Validation(false, "invalid previous hash");
        if (previousIndex !== this.index - 1)  return new Validation(false, "invalid previous index");;
        if (!this.data)  return new Validation(false, "invalid data");
        if (this.hash.length === 0) return new Validation(false, "this hash cannot be null");
        /*
        Precisamos chamar getHash() novamente e comparar com o hash atual.
        Se for adulterado o bloco, getHash() retornará um hash diferente do atual.
        */
        if(this.hash !== this.getHash())  return new Validation(false, "adulterated block error");

        //Configura o prefixo, ou seja: quantos zeros À esquerda os hashs da blockchain deverão ter
        const prefix = new Array(difficult + 1).join("0");
        if(!this.hash.startsWith(prefix)) return new Validation(false, "Mined incorrectly or not mined.");

        if(this.timestamp < 1)  return new Validation(false, "invalid timestamp"); 
        
        

        return new Validation();
    }
}
