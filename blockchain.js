const SHA256 = require('crypto-js/sha256');


class CryptoBlock{
    constructor(index, timestamp, data, precedingHash = ""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;    
        this.hash = this.computeHash();
        this.nonce = 0;
    }

computeHash(){
    return SHA256(
        this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
}

proofWork(diff){
    while(
        this.hash.substring(0,diff) !== Array(diff + 1).join("0")
    ){
        this.nonce++;
        this.hash = this.computeHash();
    }
}
}

 
class CryptoBlockChain{
    constructor(){
        this.blockchain = [this.startGenesisBlock()];
        this.diff = 4;
    }
    startGenesisBlock(){
        return new CryptoBlock(0, "29/08/2024", "Initial Block in the Chanin", "0");
    }
    obtainLatestBlock(){
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock){
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.proofWork(this.diff);
        this.blockchain.push(newBlock);
    }

checkChainValidity(){
    for (let i=1;i<this.blockchain.length;i++){
        const currentBlock = this.blockchain[i];
        const precedingHash = this.blockchain[i-1]; 

        if(currentBlock.hash !== currentBlock.computeHash()){
            return false;
        }
        if(currentBlock.precedingHash !== precedingHash.hash) return false;
    }
    return true;
}
}

let theBlockChainCoder = new CryptoBlockChain();

console.log('the blockchain is started');
theBlockChainCoder.addNewBlock(
    new CryptoBlock(1, '08/08/28',{
        sender:"The Blockchain cooders",
        recipient:" ajmal",
        quantity:100,
    })
);
theBlockChainCoder.addNewBlock(
    new CryptoBlock(1, '08/0/29',{
        sender:"The Blockchain cooders",
        recipient:" rashal",
        quantity:78,
    })
);

console.log(JSON.stringify(theBlockChainCoder,null,4));

