import axios from "axios";
import BlockInfo from "../lib/blockInfo";
import Block from "../lib/block";

const BLOCKCHAIN_SERVER = 'http://localhost:3000'
const minerWaller = {
    "privateKey": "1234",
    "publicKey": "scheffer martins public key"
}
var totalMined = 0;

async function mine(){
    console.log('Getting new block info...')
    const {data} = await axios.get(`${BLOCKCHAIN_SERVER}/block/next`);

    const blockInfo = data as BlockInfo;
    
    const newBlock = Block.fromBlockInfo(blockInfo);

    console.log('NEXT BLOCK FROM BLOCKCHAIN:\n')
    console.log(blockInfo)
    //TODO adicionar tx de recompensa
    console.log("Start mining block #", newBlock.index, ":\n")
    console.log(newBlock)
    newBlock.mine(blockInfo.difficult, minerWaller.publicKey)

    console.log("Block mined:\n")
    console.log(newBlock)
    console.log("Sending to blockchain...")

    try{
        await axios.post(`${BLOCKCHAIN_SERVER}/block`, newBlock);
        console.log("Block sent!")

        totalMined++;

        console.log("Total mined",totalMined)
    }catch(err: any){
        console.log(err.response ? err.response.data : err.message)
    }
    
    setTimeout(() => {
        mine()
    }, 1000)
}

mine()