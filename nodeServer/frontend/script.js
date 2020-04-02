//import { json } from "body-parser";

var blockchain;

function loadBlockchain(){
    var request = new XMLHttpRequest();
    request.open("GET","/getBC");
    request.onload = () => {
        if(request.status >= 200 && request.status < 300){
            console.log("Request successful!");
            console.log(request.responseText);
            fillBlockchain(request.responseText);
        }else{
            console.warn("Request failed!");
        }
    }
    request.send();
}
function fillBlockchain(jsonResponse){
    console.log(jsonResponse);
    console.log(JSON.parse(jsonResponse));
    document.getElementById("blockchainview").innerHTML = "";
    //blockchain = JSON.parse('{  "chain":[{"index":1,"hash":"00234F34B34C34","message":"Hallo Welt","absender":"Max Mustermann"},            {                "index":2,                "hash":"002E49F87AA343",                "message":"Hallo Welt",                "absender":"Max Mustermann"            }        ]    }');
    blockchain = JSON.parse(jsonResponse)["chain"];
    console.log(blockchain);
    blockchain = limitBlocks(blockchain, 0);
    blockchain.forEach(element => {
        //console.log("Block: "+element.index+ " Hash: "+element.hash);
        createBlock(element);
    });
}

function limitBlocks(blocks, numOfBlocks){
    if(numOfBlocks == 0) return blocks;
    let returnBlocks = [];
    for(let i = blocks.length - numOfBlocks; i < blocks.length;i++){
        returnBlocks.push(blocks[i]);
    }
    return returnBlocks;
}

function createBlock(block){
    console.log(block);
    let bcview = document.getElementById("blockchainview");
    let blockDiv = document.createElement("div");
    blockDiv.classList.add("col-3");
    blockDiv.classList.add("block");
    blockDiv.classList.add("p-3")
    let innerContainer = document.createElement("div");
    innerContainer.classList.add("block_background");
    let blockIndexP = document.createElement("p");
    blockIndexP.innerHTML = "Block #"+block.index;
    let blockHashP = document.createElement("p");
    console.log(block.hash);
    blockHashP.innerHTML = "Hash: "+[block.hash.slice(0, block.hash.length/2), " ", block.hash.slice(block.hash.length/2)].join('');
    let blockMessageP = document.createElement("p");
    blockMessageP.innerHTML = "Nachricht: "+block.message;
    let blockFromP = document.createElement("p");
    blockFromP.innerHTML = "Absender: " + block.absender;
    innerContainer.appendChild(blockIndexP);
    innerContainer.appendChild(blockHashP);
    innerContainer.appendChild(blockMessageP);
    innerContainer.appendChild(blockFromP);
    blockDiv.appendChild(innerContainer);
    bcview.appendChild(blockDiv);
}

function getWork(){
    let request = new XMLHttpRequest();
    request.open("GET", "/getWork");
    request.onload = () => {
        if(request.status >= 200 && request.status < 300){
            console.log("Get Work succesfully");
            console.log(request.responseText);
            if(request.responseText == "false"){
                console.log("No Tasks 4 me")
                return false;
            }
            proofOfWork(JSON.parse(request.responseText));
        } else {
            console.warn("Request failed!")
        }
    }
    request.send();
}

function proofOfWork(jsonResponse){
    console.log(jsonResponse);
    console.log(typeof(jsonResponse));
    
    //blockchain = JSON.parse('{  "chain":[{"index":1,"hash":"00234F34B34C34","message":"Hallo Welt","absender":"Max Mustermann"},            {                "index":2,                "hash":"002E49F87AA343",                "message":"Hallo Welt",                "absender":"Max Mustermann"            }        ]    }');
    let block = jsonResponse.block; //Nicht sicher ob das so geht, Fireder schau mal drüber
    let difficulty = jsonResponse.difficulty;
    let hash = calculateHash(block);

    while(hash.substring(0, difficulty) !== Array(difficulty +1).join("0")){
        block.nonce++;
        hash = calculateHash(block);
    }
    block.hash = hash;
    console.log("Block mined: ");
    console.log(block);    

    sendSolution(block);
}

function calculateHash(block){
    return sha256(block.index + block.previousHash + block.timestamp + block.message + block.absender + block.nonce).toString();
}

function sendSolution(block){
    var request = new XMLHttpRequest();
    request.open("POST","/solution");
    request.setRequestHeader("Content-Type","application/json");
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
        }
    };
    console.log(block);
    request.send(JSON.stringify(block));
}

function sendMessage(msg, from){
    var request = new XMLHttpRequest();
    request.open("POST","/message");
    request.setRequestHeader("Content-Type","application/json");
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
        }
    };
    let transmitMsg = {"message":msg, "absender":from};
    request.send(JSON.stringify(transmitMsg));
}