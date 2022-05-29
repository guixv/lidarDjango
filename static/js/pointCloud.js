let scene, camera, renderer;
let stats;
let orbitControls, clock, delta;

function pointCloudMaker(points,container11,container22,height=400,width=400,background,color,size = 0.3,control = 0) {
    // console.log(pointing);
    console.log("pointCloud" + points[0].xx);
    let container1 = document.getElementById(container11);
    let container2 = document.getElementById(container22);
    main(container1,container2,points,height,width,background,color,size,control);
    render();
}


function initScene(background) {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(background);
}

function initCamera() {
    // camera = new THREE.OrthographicCamera(50, 5, 20, 5);
    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, -50, 200);
    camera.lookAt(new THREE.Vector3());
}

function initRenderer(container,height,width) {
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xffffff, 1.0));
    // let width = getClass(document.getElementById('container1'),"width");
    // let height = getClass(document.getElementById('container1'),"height");
    renderer.setSize(width,height);
    container.appendChild(renderer.domElement);
}

function initControl(control){
    //添加轨道控制器
    //新建一个轨道控制器
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.target = new THREE.Vector3(0, 0, 0);//控制焦点
    if (control===0)
    orbitControls.autoRotate = false;//将自动旋转关闭
    else if(control===1){
        orbitControls.autoRotate = true;
    }
    clock = new THREE.Clock();//用于更新轨道控制器
}

function main(container1,container2,points,height,width,background,color,size,control) {
    stats = initStats(container2);
    initScene(background);
    initCamera();
    initRenderer(container1,height,width);
    initControl(control);

    createParticles(points,color,size);
}


function render() {
        stats.update();
        delta = clock.getDelta();
        orbitControls.update(delta);
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    var T = clock.getDelta();

    // console.log('两帧渲染时间间隔',T*1000+'毫秒');
    // console.log('查看每秒渲染频率',1/T);

}

function initStats(container) {
    let stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    // 放在左上角
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    container.appendChild(stats.domElement);

    return stats;
}


function createParticles(points,color,size) {

    let x,y,z,intensity,ring;

    const geom = new THREE.Geometry();
    if (color===0){
        geom.colors.push(new THREE.Color(0x000000));
    } else if (color===1){
        geom.colors.push(new THREE.Color(0xFFFFFF));
    }
    let material = new THREE.PointCloudMaterial({size: size, vertexColors: true, color: 0xFFFFFF});
    // if (color===0){
    //     material = new THREE.PointCloudMaterial({size: size, vertexColors: true, color: 0x000000});
    // } else if (color===1){
    //     material = new THREE.PointCloudMaterial({size: size, vertexColors: true, color: 0xFFFFFF});
    // }
    let jslength=0;

    for(let js2 in points){

        jslength++;

    }
    console.log("start load!");
    console.log("data point size ：", jslength);
    for(let i = 0; i < jslength; i++){//写入点云数据
            x = points[i].xx;
            y = points[i].yy;
            z = points[i].zz;
            ring = points[i].ring;
            intensity = points[i].intensity;
            let particle = new THREE.Vector3(x, y, z);
        geom.vertices.push(particle);
        if (color===0){
            geom.colors.push(new THREE.Color(0x000000));
        } else if (color===1){
            geom.colors.push(new THREE.Color(0xFFFFFF));
        } else if (color===3){
            let min = (intensity*25+40) < 255 ? (intensity*25+40) : 255;
            geom.colors.push(new THREE.Color(0,0,1-min/256));
        } else if (color===4){
            let min = (intensity*25+40) < 255 ? (intensity*25+40) : 255;
            geom.colors.push(new THREE.Color(min/256,min/256,min/256));
        } else if (color===5){
            geom.colors.push(new THREE.Color(z*0.15+0.5,z*0.15+ 0.5,z*0.15+0.5));
        } else if (color===6){
            let co = 0xFFFFFF * (z*0.15+0.5)
            geom.colors.push(new THREE.Color(z*0.15+0.5,0.2,1-(z*0.15+0.5)));
        }else {
            geom.colors.push(new THREE.Color(color));
        }
    }
    console.log("load done!");
    // for (let x = -5; x < 5; x++) {
    //     for (let y = -5; y < 5; y++) {
    //         let particle = new THREE.Vector3(Math.random() * 100 - 100, Math.random() * 100 - 50, Math.random() * 100 - 50);
    //         geom.vertices.push(particle);
    //         geom.colors.push(new THREE.Color(Math.random() * 0x00ffff));
    //     }
    // }

    let cloud = new THREE.PointCloud(geom, material);
    scene.add(cloud);
}



