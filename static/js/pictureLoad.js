function previewImage(file,frame) {
    // let porImg  = $(file);
        let viewImg = $('#viewImg');
    // let file1 = porImg.val();
    // if (!/^\S*\.(?:csv)$/i.test(file1)) {
    //     falseInput(porImg);
    //     return false;
    // }
    if (file["files"] && file["files"][0]) {
        let reader = new FileReader();
        reader.onload = function(e){
            viewImg.attr({src : "img/Navtech_Cartesian/" + frame + ".png" , alt : "没有相应的毫米波雷达图像"});

        };
        reader.readAsDataURL(file.files[0]);
    } else {
        alert("毫米波雷达图像读取出错");
    }
}


