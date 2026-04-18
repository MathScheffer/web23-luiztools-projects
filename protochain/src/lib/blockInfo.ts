
/**
 * index: 
 */
export default interface BlockInfo {
    index: number,
    previousHash: string,
    difficult:number,
    maxDifficult: number,
    feePerTx: number,
    data: string
}