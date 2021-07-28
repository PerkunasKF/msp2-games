function colorPatternChange() {
    document.getElementById("button-1").style.backgroundColor = "red";
    setTimeout(function(){
        document.getElementById("button-1").style.backgroundColor = "";
    }, 1000);
}
