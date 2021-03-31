function loadDoc(httpMethod, url, cFunction) {
    var xhttp
    xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            items = JSON.parse(this.responseText)
            await cFunction(items)
        }
    };
    xhttp.open(httpMethod, url, true)
    xhttp.send()
}

function getOptionsToGet(){
    let optionsGET = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    return optionsGET
}

function getOptionsToPost(data){
    let optionsPOST = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    return optionsPOST
}