import axios from "axios";

const BLOCKCHAIN_SERVER = 'http://localhost:3000'

async function mine(){
    const {data} = await axios.get(`${BLOCKCHAIN_SERVER}/block/next`);

    console.log(data)
}

mine();