function falseInput(porImg) {
    alert('请选择csv文件~');
    porImg.val("");
    initIndex();
}

function initIndex(){
    document.getElementById("name").innerHTML = " ";
    document.getElementById("frameTip").innerHTML = " ";
    document.getElementById("frame").innerHTML = " ";
    document.getElementById('result').innerHTML = " ";
    document.getElementById('Nevtech').innerHTML = "<img id=\"viewImg\">";
    document.getElementById("container1").innerHTML = "";
    document.getElementById("container2").innerHTML = "";

}

function myRefresh(){

    window.location.reload();
}