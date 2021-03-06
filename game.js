/*jshint esversion: 6 */ 
// @ts-check

let T = THREE;
// global variables to control which animation loop will run
let welcomeLoop = true;
let gameLoop = false;
let winLoop = false;
let loseLoop = false;

import {onWindowOnload} from "./Libs/helpers.js";
import { SceneControl } from "./scenecontrol.js";
import { LevelTwo } from "./level2.js";
//import { CameraHelper } from "./THREE/threets/index.js";

//
// this is exactly the code from
// https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
//
// with the following modifications:
//    - rather than making the render target fill the screen, it gets put in the
//      right location in the box at an appropriate size. this requires setting
//      the aspect ratio correctly
//    - i added a light source and used a material that responds to do
//    - i re-ordered the statements into a more logical order
function play(scene, camera, renderer, control) {

    renderer.shadowMapEnabled = true;
    //renderer.shadowMapType = T.PCFSoftShadowMap;
    camera = new T.PerspectiveCamera( 50, 1, 0.1, 1000 );
    let up = false;
    let left = false;
    let right = false;
    let down = false;
    let shoot = false;

    let recentMove = "left";
    //  let renderer = new T.WebGLRenderer();
    // renderer.setSize( 700,700 ); // was (window.innerWidth, window.innerHeight );
    // document.getElementById("three2").appendChild( renderer.domElement );

    // // the aspect ratio is set to 1 - since we're making the window 200x2ad00
    // let camera = new T.PerspectiveCamera( 50, 1, 0.1, 1000 );

    // let scene = new T.Scene();

    let geometry = new T.BoxGeometry( 1, 1, 1 );
    // this was "MeshBasicMaterial"
    let material = new T.MeshStandardMaterial( { color: 0x00ff00 } );
    let cube = new T.Mesh( geometry, material );
    cube.position.y = .5;
    cube.castShadow = true;
    scene.add( cube );

    // let groundGeo = new T.PlaneBufferGeometry(30,30);
    // let groundMat = new T.MeshStandardMaterial( {color: "red"});
    // let ground = new T.Mesh(groundGeo, groundMat);
    // ground.receiveShadow = true;
    // ground.rotateX(2*Math.PI - Math.PI / 2);
    // scene.add(ground);


    // we don't see anything if there is no light
    let ambientLight = new T.AmbientLight ( 0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add( ambientLight );
    let pointLight = new T.PointLight( 0xffffff, 1 );
    pointLight.position.set( 25, 50, 25 ); // to put back at original, take off negatives
    pointLight.castShadow = true;
    scene.add( pointLight );

    // camera.position.z = 14;
    // camera.position.y = 12;
    // camera.position.x = 0;

    camera.position.z = 30;
    camera.position.y = 12;
    camera.position.x = 0;

    camera.lookAt(cube.position.x, cube.position.y, cube.position.z);

    //let controls = new T.OrbitControls(camera);

    //let control = new SceneControl(scene);

    document.addEventListener("keydown", keyDown, false);
    function keyDown(event) {
        let code = event.which;

        // W "up" or "foreward"
        if (code == 87) { up = true; recentMove = "up"; }
        // A, "left"
        if (code == 65) { left = true; recentMove = "left";}
        // D, "right"
        if (code == 68) { right = true; recentMove = "right";}

        // D, "down" or "back"
        if (code == 83) { down = true; recentMove = "down";}

        // spacebar, player shoots
        if (code == 32) { shoot = true; }

    }

    document.addEventListener("keyup", keyUp, false);
    function keyUp(event) {
        let code = event.which;

        // W, "up" or "forward"
        if (code == 87) {
            up = false;
        }
        // A, "left"
        if (code == 65) {
            left = false;
        }
        // D, "right"
        if (code == 68) {
            right = false;
        }

        // D, "down" or "back"
        if (code == 83) {
            down = false;
        }
        
        if (code == 32) { shoot = false; }
        }

    function animate() {
        if (gameLoop) { requestAnimationFrame( animate ); }

        let step = 0.08;

        if (!control.abducted) {
            if (up && cube.position.z > -(control.worldSize - .5)) {
                cube.position.z -= step;
                camera.position.z -= step;
                //console.log("yeet\n");
            }
            if (down && cube.position.z < control.worldSize - .5) {
                cube.position.z += step;
                camera.position.z += step;
            }
            if (left && cube.position.x > -(control.worldSize - .5)) { 
                cube.position.x -= step;
                camera.position.x -= step;
            }
            if (right && cube.position.x < control.worldSize - .5) {
                cube.position.x += step;
                camera.position.x += step;
            }
    }


        let state = control.update(cube, shoot, recentMove);
        renderer.render( scene, camera );
        // game is lost
        if (state == 1) {
            gameLoop = false;
            loseLoop = true;
            document.removeEventListener("keyup", keyUp);
            document.removeEventListener("keydown", keyDown);
            lose(scene, camera, renderer, control);
        }
        else if (state == 2) {
            gameLoop = false;
            winLoop = true;
            win(scene, camera, renderer, control);
        }

        
    }

    if (gameLoop) { animate(); }
}

function welcome() {
    let renderer = new T.WebGLRenderer();
    renderer.setSize( 700,700 ); // was (window.innerWidth, window.innerHeight );
    document.getElementById("three2").appendChild( renderer.domElement );

    // the aspect ratio is set to 1 - since we're making the window 200x2ad00
    let camera = new T.PerspectiveCamera( 50, 1, 0.1, 1000 );
    camera.position.z = 25;
    camera.position.y = 0;
    camera.position.x = 0

    let scene = new T.Scene();
    let geo = new T.CubeGeometry(20,20,1);
    let map = new T.TextureLoader().load("./Pictures/welcome.png");
    let mat = new T.MeshStandardMaterial({map: map});
    //let mat = new T.MeshStandardMaterial({color: "red"});
    let mesh = new T.Mesh(geo, mat);
    scene.add(mesh);

    let ambientLight = new T.AmbientLight ( 0xffffff, 0.5);
    scene.add( ambientLight );
    let pointLight = new T.PointLight( 0xffffff, 1 );
    pointLight.position.set( 25, 50, 50 );
    pointLight.castShadow = true;
    scene.add( pointLight );

    //let controls = new T.OrbitControls(camera);

    function an() {
        if (welcomeLoop) { requestAnimationFrame(an); }
        renderer.render(scene, camera);
    }

    an();

    document.addEventListener("keypress", keyPress, false);
    function keyPress(event) {

        let code = event.which;
        //clear welcome screen


        // level 1
        if (code == 49) {
            // clear welcome screen, remove listener
            document.removeEventListener("keypress", keyPress);
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
            let control = new SceneControl(scene);
            welcomeLoop = false;
            gameLoop = true;
            play(scene, camera, renderer, control);
        }

        if (code == 50) {
            // clear welcome screen, remove listener
            document.removeEventListener("keypress", keyPress);
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
            let control = new LevelTwo(scene);
            welcomeLoop = false;
            gameLoop = true;
            play(scene, camera, renderer, control);
        }

    }

}

function lose(scene, camera, renderer, control) {
    while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
    }
    camera.position.z = 25;
    camera.position.y = 0;
    camera.position.x = 0

    camera.lookAt(0,0,0);

    let geo = new T.CubeGeometry(20,20,1);
    let map = new T.TextureLoader().load("./Pictures/lose.png");
    let mat = new T.MeshStandardMaterial({map: map});
    //let mat = new T.MeshStandardMaterial({color: "red"});
    let mesh = new T.Mesh(geo, mat);
    scene.add(mesh);

    let ambientLight = new T.AmbientLight ( 0xffffff, 0.5);
    scene.add( ambientLight );
    let pointLight = new T.PointLight( 0xffffff, 1 );
    pointLight.position.set( 25, 50, 50 );
    pointLight.castShadow = true;
    scene.add( pointLight );

    //let controls = new T.OrbitControls(camera);

    function an() {
        if (loseLoop) { requestAnimationFrame(an); }
        renderer.render(scene, camera);
    }

    an();

    document.addEventListener("keypress", keyPress, false);
    function keyPress(event) {

        
        let code = event.which;
        //clear welcome screen

        // level 1
        if (code == 49) {
            // remove listener, clear scene
            // document.removeEventListener("keypress", keyPress);
            // while(scene.children.length > 0){ 
            //     scene.remove(scene.children[0]); 
            // }
            // let control = new SceneControl(scene);
            // gameLoop = true;
            // loseLoop = false;
            // play(scene, camera, renderer, control);
            location.reload();
        }
        if (code == 50) {
            // clear welcome screen, remove listener
            document.removeEventListener("keypress", keyPress);
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
            let control = new LevelTwo(scene);
            welcomeLoop = false;
            gameLoop = true;
            play(scene, camera, renderer, control);
        }

    }
}

function win(scene, camera, renderer, control) {
    while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
    }
    camera.position.z = 25;
    camera.position.y = 0;
    camera.position.x = 0

    camera.lookAt(0,0,0);

    let geo = new T.CubeGeometry(20,20,1);
    let map = new T.TextureLoader().load("./Pictures/win.png");
    let mat = new T.MeshStandardMaterial({map: map});
    //let mat = new T.MeshStandardMaterial({color: "red"});
    let mesh = new T.Mesh(geo, mat);
    scene.add(mesh);

    let ambientLight = new T.AmbientLight ( 0xffffff, 0.5);
    scene.add( ambientLight );
    let pointLight = new T.PointLight( 0xffffff, 1 );
    pointLight.position.set( 25, 50, 50 );
    pointLight.castShadow = true;
    scene.add( pointLight );

    //let controls = new T.OrbitControls(camera);

    function an() {
        if (winLoop) { requestAnimationFrame(an); }
        renderer.render(scene, camera);
    }

    an();

    document.addEventListener("keypress", keyPress, false);
    function keyPress(event) {

        
        let code = event.which;
        //clear welcome screen

        // level 1
        if (code == 49) {
            // remove listener, clear scene
            document.removeEventListener("keypress", keyPress);
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
            let control = new SceneControl(scene);
            gameLoop = true;
            loseLoop = false;
            play(scene, camera, renderer, control);
        }
        if (code == 50) {
            // clear welcome screen, remove listener
            document.removeEventListener("keypress", keyPress);
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
            let control = new LevelTwo(scene);
            welcomeLoop = false;
            gameLoop = true;
            play(scene, camera, renderer, control);
        }

    }
}


//onWindowOnload(three2);
onWindowOnload(welcome);