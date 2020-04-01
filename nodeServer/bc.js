
const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index, message, sender, previousHash = ''){
        this.index = index;
        this.message = message;
        this.sender = sender;
        this.previousHash = previousHash;
        this.hash = this.calculateHash;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
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

    getLatestBlocks(numberOfBlocks){
        console.log("ok");
        let bc = new BlockChain();

        bc.addBlock(new Block(1, "10/20/4444", "test1"));
        bc.addBlock(new Block(2, "12/45/7845", "test2"));

        console.log(JSON.stringify(bc, null, 4));

        let blocks = new Set();
        for( i = 0; i < numberOfBlocks; i++){
            let block = this.chain[this.chain.length - i - 1];
            if(block){
                blocks.add(block);
            }
        }

        return blocks;
    }
}




module.exports(getLatestBlocks);