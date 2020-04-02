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
            console.warn("Request failed!")
        }
    }
    request.send();
}
function fillBlockchain(jsonResponse){
    document.getElementById("blockchainview").innerHTML = "";
    //blockchain = JSON.parse('{  "chain":[{"index":1,"hash":"00234F34B34C34","message":"Hallo Welt","absender":"Max Mustermann"},            {                "index":2,                "hash":"002E49F87AA343",                "message":"Hallo Welt",                "absender":"Max Mustermann"            }        ]    }');
    blockchain = JSON.parse(jsonResponse)["chain"];
    console.log(blockchain);
    blockchain.forEach(element => {
        //console.log("Block: "+element.index+ " Hash: "+element.hash);
        createBlock(element);
    });
}

function createBlock(block){
    console.log(block);
    let bcview = document.getElementById("blockchainview");
    let blockDiv = document.createElement("div");
    blockDiv.classList.add("col-3");
    blockDiv.classList.add("block");
    blockDiv.classList.add("p-2")
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