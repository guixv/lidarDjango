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
    pointCloudMaker(points,'indexContainer1','indexContainer2',800,900,
        parseInt(document.getElementById('previewBackground').value),parseInt(document.getElementById('previewColor').value),1,0)
}

