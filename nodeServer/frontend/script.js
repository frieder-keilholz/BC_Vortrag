var blockchain;

function loadBlockchain(){
    var request = new XMLHttpRequest();
    request.open("GET","/getBC");
    request.onload = () => {
        if(request.status >= 200 && request.status < 300){
            console.log("Request successful!");
            console.log(request.responseText);
        }else{
            console.warn("Request failed!")
        }
    }
    request.send();
}
function fillBlockchain(jsonResponse){

}