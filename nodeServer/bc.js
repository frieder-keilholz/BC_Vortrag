const SHA256 = require("crypto-js").SHA256;
class Block{
    constructor(index, timestamp = Date.now(), message, absender, previousHash = '', nounce = 0){
        this.index = index;
        this.timestamp = timestamp;
        this.message = message;
        this.previousHash = previousHash;
        this.absender = absender;
        this.nonce = nounce;
        this.hash = '';

        //this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + this.message + this.absender + this.message + this.nonce).toString();
        //return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor(){
        this.nextIndex = 1;
        this.chain = [this.createGenisisBlock()];
        this.messages = [{message:"Ursprung", absender: "Genesis"}];
    }

    createGenisisBlock(){
        return new Block(0, "01/01/1970", "Genisis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        //newBlock.previousHash = this.getLatestBlock().hash;
        //newBlock.hash = newBlock.calculateHash();
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

    addMessage(msg){
        this.messages.push(msg);
    }
    getNextMessage(){
        if(this.messages.length == 0){
            return false;
        }
        return this.messages.shift();
    }
}

var bc = new BlockChain();

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
    },
    addMessageTask: function (msg) {
        console.log(typeof(msg));
        bc.addMessage(msg);
        console.log(bc.messages);
    },
    getTask: function () {
        msg = bc.getNextMessage();
        console.log(bc.messages);
        if(!msg){
            return false;
        }else{
            console.log(msg);
            return {block: new Block(bc.nextIndex, Date.now(), msg.message, msg.absender,bc.getLatestBlock().hash,0), difficulty: 3};
        }
    },
    submitSolution: function (block) {
        let recvBlock = new Block(block.index,block.timestamp,block.message,block.absender,block.previousHash,block.nounce);
        if(recvBlock.calculateHash == block.hash){
            console.log("Hash legitness");
            recvBlock.hash = block.hash;
            bc.addBlock(recvBlock);
        }else{
            console.log("Hash not legitness");
        }
    }
};
//console.log(JSON.stringify(bc, null, 4));

//module.exports(getLatestBlocks);
