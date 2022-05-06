let pointData = [];

function csvLoader(file1,pro){
    let reader = new FileReader();
    let storage = window.localStorage;

    reader.onprogress = function (e) {
        pro.value = e.loaded;
    };

    reader.onload = function () {
        let str = reader.result;
        let points = str2JSON(str);

        // console.log(str);
        // console.log(JSON.stringify(points));
        document.getElementById('result').innerHTML = JSON.stringify(points[0]);

        // console.log(rows);
        // document.getElementById('result').innerHTML = "csv内文件示例x,y,z,intensity,ring"+"<br/>"+rows[0];
        storage.string = str;
        // console.log("1"+storage.rows);
    };

    let file = file1.files[0];
        //读取为二进制

    reader.readAsText(file,'utf-8');
        //显示进度
    pro.max = file.size;
    pro.value = 0;

    let fileName = file1.files[0].name;
    let frame = fileName.toString().split(".")[0];
    document.getElementById("name").innerText = "fileName:"+fileName;
    document.getElementById("frameTip").innerText = "frame:";
    document.getElementById("frame").innerText = frame;

    let points = [];
    let pointing = storage.string;
    points = str2JSON(pointing);
    console.log(points[1]);
    console.log(points[1].xx);
    // pointData = points;
    //
    // console.log("send" + pointData[1]);
    // let points = str2JSON(pointing);
    // let pointsNode = points.filter(function (e) { return e.intensity>0; });
    // console.log("2"+points[1]);
    // console.log("3"+pointing);
    return points;
}


function str2JSON(str){
    //由对象转为JSON字符串
    let rows = str.split('\n');
    let points = [];
    for(let i =0; i<rows.length; i++){
        let row =rows[i].split(',') ;
        let point = {
            xx:row[0],
            yy:row[1],
            zz:row[2],
            intensity:row[3],
            ring:row[4],
        };
        points.push(point);
    }
    return points;
}


// function getPointData (){
//     console.log("get"+ pointData[1]);
//     return pointData;
// }
