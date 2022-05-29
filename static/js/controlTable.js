function readFileButton(file1,pro){

    initIndex();

    let porFile = $(file1);
    if (!/^\S*\.(?:csv)$/i.test(porFile.val())) {
        falseInput(porFile);
        return false;
    }

    let points = csvLoader(file1,pro);
    let frame = document.getElementById("frame").innerText;
    // previewImage(file1,frame);
    pointCloudMaker(points,"container1","container2",900,900,
        parseInt(document.getElementById('previewBackground').value),parseInt(document.getElementById('previewColor').value),
        parseInt(document.getElementById('pointSize').value)/100,0);
    // pointCloudMaker();
}

function jump(a) {

    if (a===0){
        window.open("/readme","_blank");
    }
    let locate = {
        '0' : '/index',
        '1' : '/index',
        '2' : '/loader',
        '3' : '/show',
        '4' : '/preview',
    };
    console.log(locate[a]);
    window.location.href=locate[a];
}

function getClass(obj,name)//获取元素样式

{


    if(obj.currentStyle)

    {
        return obj.currentStyle[name];//IE下获取非行间样式



    }

    else

    {
        return getComputedStyle(obj,false)[name];//FF、Chorme下获取费行间样式

    }

}

function py(path,sequence_name){
    $.ajax({
        url:  '/requestUrl/',
        type: "POST",
        data: JSON.stringify({
            path: path,
            sequence_name: sequence_name,
        }),
        dataType:"json",
        success: function (data) {
            console.log("show: "+path.value +sequence_name.value)
            document.getElementById('pathName').innerText="文件路径："+path.value + '/' +sequence_name.value
            document.getElementById('startPY').style.display="block"
        }
    });

}

let frame2time = {
    0 : '0.0000',
}
let count = 0

function imgSolve(path,sequence_name){
    let storage = window.localStorage;
    console.log('1222')
    $.ajax({
        url:  '/imgSolving/',
        type: "POST",
        data:JSON.stringify({
            path: path,
            sequence_name: sequence_name,
        }),
        dataType:"json",
        async: false,
        success: function (data) {
            document.getElementById('solveComplete').style.display="block"
            document.getElementById('img1').src = '../static/saved_images/'+document.getElementById('sequence_name').innerText+'/'+data[1]+'/lidar_vis.png'
            document.getElementById('img2').src = '../static/saved_images/'+document.getElementById('sequence_name').innerText+'/'+data[1]+'/overlay_right_bb.png'
            document.getElementById('img3').src = '../static/saved_images/'+document.getElementById('sequence_name').innerText+'/'+data[1]+'/radar_cart_vis.png'
            document.getElementById('img4').src = '../static/saved_images/'+document.getElementById('sequence_name').innerText+'/'+data[1]+'/right_bb.png'

            frame2time = data
            console.log(frame2time)
            storage.data = data
        },

    });
}

let showTime

function img2movie(){
    let movieButton = document.getElementById('movie')
    if(movieButton.innerText==='开始轮播'){
        showTime = setInterval(moving,1000);
        movieButton.innerText='停止轮播'
    }else {
        clearInterval(showTime)
        movieButton.innerText='开始轮播'
    }
}

function moving(){
    count ++ ;
    //判断count是否大于n
    if(count > 16){
        count = 1;
    }
    //获取img对象
    let img = document.getElementById("movie");
    console.log(frame2time[count])
    document.getElementById('img1').src = '../static/saved_images/'+document.getElementById('sequence_name').innerText+'/'+frame2time[count]+'/lidar_vis.png'
    document.getElementById('img2').src = '../static/saved_images/'+document.getElementById('sequence_name').innerText+'/'+frame2time[count]+'/overlay_right_bb.png'
    document.getElementById('img3').src = '../static/saved_images/'+document.getElementById('sequence_name').innerText+'/'+frame2time[count]+'/radar_cart_vis.png'
    document.getElementById('img4').src = '../static/saved_images/'+document.getElementById('sequence_name').innerText+'/'+frame2time[count]+'/right_bb.png'

}

