function copy(){
    var copyText = `req = new XMLHttpRequest(); req.open('GET', 'https://raw.githubusercontent.com/Marzex05/psych/refs/heads/main/functBlank.js'); req.onload = function() { eval(this.responseText + 'mask();'); }; req.send();`
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
  
    // Alert the copied text
    console.log("Copied the text: " + copyText);
    document.getElementById("copy").innerHTML = "[Copied!]"

    setTimeout(function(){
    document.getElementById("copy").innerHTML = "[Copy Code]"
    }, 1500);


}

