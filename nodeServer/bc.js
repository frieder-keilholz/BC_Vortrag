
const SHA256 = require("crypto-js").SHA256;
class Block{
    constructor(index, timestamp, message, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.message = message;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.absender = "Max Mustersender";
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + this.message).toString();
        //return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenisisBlock()];
    }

    createGenisisBlock(){
        return new Block(0, "01/01/1970", "Genisis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}


let bc = new BlockChain();

bc.addBlock(new Block(1, "10/20/2019", "test1"));
bc.addBlock(new Block(2, "12/45/2019", "test2"));
bc.addBlock(new Block(3, "1/1/2020", "test3"));
bc.addBlock(new Block(4, "2/2/2020", "test4"));
bc.addBlock(new Block(5, "2/12/2020", "test5"));
bc.addBlock(new Block(6, "2/20/2020", "test6"));
bc.addBlock(new Block(7, "3/3/2020", "test7"));

module.exports = {
    getBlockchainJSON: function () {
        return bc;
        //return JSON.stringify(bc, null, 4);
    }
};
//console.log(JSON.stringify(bc, null, 4));