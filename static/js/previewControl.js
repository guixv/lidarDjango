function csvToJson(filePath) {
    let result = [];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filePath, false);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          result = str2JSON(xhr.responseText)
        } else {
          console.error(xhr.statusText);
        }
      }
    };
    xhr.send(null);
    return result
}

function startDIY(){
    initPreview();
    let points = csvToJson("../static/radiate/data/radiate/"+document.getElementById('foldSelection').value
        +'/velo_lidar/'+document.getElementById('fileSelection').value+'.csv');
    pointCloudMaker(points,'indexContainer1','indexContainer2',900,900,
        parseInt(document.getElementById('previewBackground').value),parseInt(document.getElementById('previewColor').value),
        parseInt(document.getElementById('pointSize').value)/100,0)
    console.log(document.getElementById('pointSize').value)
}

function startMovieDIY(){
    let count = parseInt(document.getElementById('fileSelection').value)
    if (count === 60){
        count = 0
    }
    count++
    let frame = '000000'
    if (count<10){
        frame = '00000' + count.toString()
    }else {
        frame = '0000'+ count.toString()
    }
    console.log(frame)
    document.getElementById('fileSelection').value = frame
    startDIY()
}

let movieTime

function file2movie(){
    let time1 = parseInt(document.getElementById('movieTime').value)
    let movieButton = document.getElementById('fileMovie')
    if(movieButton.innerText==='在当前文件目录内开始轮播'){
        movieTime = setInterval(startMovieDIY,time1);
        movieButton.innerText='停止在当前文件目录的轮播'
    }else {
        clearInterval(movieTime)
        movieButton.innerText='在当前文件目录内开始轮播'
    }
}