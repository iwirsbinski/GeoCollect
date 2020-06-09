import { defender } from "./defender.js";

let T = THREE;
let frame = 1;

export class SceneControl {

    // construct the objects of the scene.
    constructor(scene) {
        this.scene = scene;
        this.frame = 1;
        this.bgframe = 0;
        this.scene.background = new T.CubeTextureLoader()
        .load( [
            './Pictures/stars2.png',
            './Pictures/stars2.png',
            './Pictures/stars2.png',
            //'ground_plane.png',
            './Pictures/stars2.png',
            './Pictures/stars2.png',
            './Pictures/stars2.png'
        ] );

        let geo = new T.SphereBufferGeometry(.5, 30, 30);
        let mat = new T.MeshStandardMaterial({color: "blue"});
        
        // let botLeft = [];
        // for (let i = 0; i < 10; i++) {
        //     let mesh = new T.Mesh(geo,mat);
        //     scene.add(mesh);
        // }
        //split objects into 4 quadrants

        // build ground
        let groundGeo = new T.PlaneBufferGeometry(40,40);
        let groundMat = new T.MeshStandardMaterial( {color: "silver"});
        //groundMat.metalness = 1.0;
        //groundMat.roughness = 0.0;
        this.ground = new T.Mesh(groundGeo, groundMat);
        this.ground.receiveShadow = true;
        this.ground.rotateX(2*Math.PI - Math.PI / 2);
        scene.add(this.ground);
        this.worldSize = 20; // TODO make arena larger

        //create surroundings (space)

        let planetGeo = new T.SphereBufferGeometry(100, 32, 32);
        let pmap = new T.TextureLoader().load("./Pictures/mars.png");
        let planetMat = new T.MeshStandardMaterial( {map: pmap});
        this.planet = new T.Mesh(planetGeo, planetMat);
        this.planet.position.z = -700;
        this.planet.position.y = -100;
        this.planet.position.x = 30;
        scene.add(this.planet);

        let moonGeo = new T.SphereBufferGeometry(20, 32, 32);
        let moonMat = new T.MeshStandardMaterial( {color: "white"});
        this.moon = new T.Mesh(moonGeo, moonMat);
        this.moon.position.z = -700;
        this.moon.position.y = -100;
        this.moon.position.x = 170;
        scene.add(this.moon);

        let spotLight = new T.SpotLight( 0xffffff);
        spotLight.position.set( 300, 100, 700 ); // to put back at original, take off negatives
        spotLight.castShadow = true;
        spotLight.target = this.planet;
        spotLight.angle = Math.PI / 2;
        scene.add(spotLight);

        // build objects
        this.objects = [];
        this.frames = [];
        let mesh1 = new T.Mesh(geo, mat);
        mesh1.position.x = 8;
        mesh1.position.y = 1;
        mesh1.position.z = 5;
        mesh1.castShadow = true;
        this.objects.push(mesh1);
        this.frames.push(1);

        let mesh2 = new T.Mesh(geo, mat);
        mesh2.position.x = -5;
        mesh2.position.y = 1;
        mesh2.position.z = 8;
        mesh2.castShadow = true;
        this.objects.push(mesh2);
        this.frames.push(0);

        let mesh3 = new T.Mesh(geo, mat);
        mesh3.position.x = -8;
        mesh3.position.y = 1;
        mesh3.position.z = -8;
        mesh3.castShadow = true;
        this.objects.push(mesh3);
        this.frames.push(2);

        let mesh4 = new T.Mesh(geo, mat);
        mesh4.position.x = 5;
        mesh4.position.y = 1;
        mesh4.position.z = -5;
        mesh4.castShadow = true;
        this.objects.push(mesh4);
        this.frames.push(3);

        //build defenders
        let defGeo = new T.ConeBufferGeometry(1,1,50);
        let defMat = new T.MeshStandardMaterial({color: "yellow"});

        this.def1 = new T.Mesh(defGeo, defMat);
        this.def1.position.x = 4;
        this.def1.position.y = .5;
        this.def1.position.z = 4;
        scene.add(this.def1);

        for (let i = 0; i < this.objects.length; i++) {
            this.scene.add(this.objects[i]);
        }

        this.def_wrapper = new defender(this.scene);

        // this.def2 = new T.Mesh(defGeo, defMat); // the following defender
        // this.def2.position.x = -15;
        // this.def2.position.z = -15;
        // this.def2.position.y = .5;
        // this.scene.add(this.def2);

        // this.def3 = new T.Mesh(defGeo, defMat); // another following defender
        // this.def3.position.x = 15;
        // this.def3.position.z = 15;
        // this.def3.position.y = .5;
        // this.scene.add(this.def3);
        
        this.def1Right = true;

        this.shooting = false; // whether or not there's a bullet flying through the screen rn
        this.shootDirect = "";

        this.score = 0;
        
    }

    // updates the game with respect to the objects.
    // returns true if all obejcts have been collected, else returns false.
    // returns 0 if game is continued, 1 if game is lost, 2 if game is won.
    update(cube, shoot, recentMove) {
        this.updateSurroundings();
        for (let i = 0; i < this.objects.length; i++) {
            if ((Math.abs(cube.position.x - this.objects[i].position.x) < 0.3) &&
                (Math.abs(cube.position.z - this.objects[i].position.z) < 0.3)) {
                    this.scene.remove(this.objects[i]);
                    this.objects.splice(i,1);
                    this.frames.splice(i, 1);
                    this.score++;
                    let text = "score: " + this.score.toString(10);
                    document.getElementById("score").innerHTML = text;
            }
        }

        // animate objects to "float"
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].position.y = .1 * (Math.cos(this.frames[i]) + 10);
            this.frames[i] += .1;
        }

        this.def_wrapper.update(cube, this.worldSize);

        if (this.def1Right == true) {
            this.def1.position.x -= 0.1;
            this.def1.position.z += 0.1;
        }
        if (this.def1Right == false) {
            this.def1.position.x += 0.1;
            this.def1.position.z -= 0.1;
        }
        if (this.def1Right && this.def1.position.z >= 4) {
            this.def1Right = false;
        }
        if (!this.def1Right && this.def1.position.z <= 1) {
            this.def1Right = true;
        }

        //check all defender locations with player's location
        for (let i = 0; i < this.def_wrapper.defenders.length; i++) {
            if (Math.abs(cube.position.x - this.def_wrapper.defenders[i].position.x) < 0.75 &&
                Math.abs(cube.position.z - this.def_wrapper.defenders[i].position.z) < 0.75) {
                this.scene.remove(cube);
                return 1;
            }
        }


        // if (Math.abs(cube.position.x - this.def2.position.x) < 0.75 &&
        // Math.abs(cube.position.z - this.def2.position.z) < 0.75) {
        //     this.scene.remove(cube);
        //     return 1;
        // }

        // if (Math.abs(cube.position.x - this.def3.position.x) < 0.75 &&
        // Math.abs(cube.position.z - this.def3.position.z) < 0.75) {
        //     this.scene.remove(cube);
        //     return 1;
        // }

        //move following defender
        // let x = (cube.position.x - this.def2.position.x);
        // let z = (cube.position.z - this.def2.position.z);
        // let dist = Math.sqrt(Math.pow(x,2) + Math.pow(z,2));
        // x = x / dist;
        // z = z / dist;
        // let step = 0.05;
        // this.def2.position.x += step*x;
        // this.def2.position.z += step*z;

        // // // move second follower

        // x = (cube.position.x - this.def3.position.x);
        // z = (cube.position.z - this.def3.position.z);
        // dist = Math.sqrt(Math.pow(x,2) + Math.pow(z,2));
        // x = x / dist;
        // z = z / dist;
        // //let step = 0.05;
        // this.def3.position.x += step*x;
        // this.def3.position.z += step*z;
        
        // add a new object
        if (this.frame % 300 == 0 && this.objects.length <= 10){
            // add a new object every 100 frames
            let geo = new T.SphereBufferGeometry(.5, 30, 30);
            let mat = new T.MeshStandardMaterial({color: "blue"});
            // random coordinates for the object
            let x = Math.floor(Math.random() * 2*(this.worldSize - 1)) - (this.worldSize - 1);
            let z = Math.floor(Math.random() * 2*(this.worldSize - 1)) - (this.worldSize - 1);
            let obj = new T.Mesh(geo, mat);
            obj.position.x = x;
            obj.position.y = 1;
            obj.position.z = z;
            obj.castShadow = true;
            this.objects.push(obj);
            this.frames.push(1);
            this.scene.add(obj);

        }
        this.frame++;

        // animate the shooting feature
        if (shoot && !this.shooting) {
            this.shooting = true;
            // if (up) { this.shootDirect = "up"; }
            // if (down) { this.shootDirect = "down"; }
            // if (left) { this.shootDirect = "left"; }
            // if (right) {this.shootdirect = "right"; }
            // else { this.shootDirect = "right"; }
            this.shootDirect = recentMove;
            let bulletGeo = new T.SphereBufferGeometry(.3, 32, 32);
            let bulletMesh = new T.MeshStandardMaterial({color: "black"});
            this.bullet = new T.Mesh(bulletGeo, bulletMesh);
            let x = cube.position.x;
            let y = cube.position.y;
            let z = cube.position.z;
            this.bullet.position.x = x;
            this.bullet.position.y = y;
            this.bullet.position.z = z;
            this.scene.add(this.bullet);
        }

        if (this.shooting) {
            if (this.shootDirect.localeCompare("up")) { this.bullet.position.z += 1;}
            if (this.shootDirect.localeCompare("down")) { this.bullet.position.z -= 1; }
            if (this.shootDirect.localeCompare("left")) { this.bullet.position.x += 1; }
            if (this.shootDirect.localeCompare("right")) { this.bullet.position.x -= 1; }

            // if a defender has been hit
            for (let i = 0; i < this.def_wrapper.defenders.length; i++) {
                if (Math.abs(this.bullet.position.x - this.def_wrapper.defenders[i].position.x) < 0.75 &&
                Math.abs(this.bullet.position.z - this.def_wrapper.defenders[i].position.z) < 0.75) {
                    this.scene.remove(this.def_wrapper.defenders[i]);
                    this.def_wrapper.defenders.splice(i, 1);
                }
            }

            // if the bullet is outside the arena
            if (Math.abs(this.bullet.position.x) > this.worldSize || Math.abs(this.bullet.position.z) > this.worldSize) {
                this.shooting = false;
                this.scene.remove(this.bullet);
            }
        }

        if (this.objects.length == 0) { return 2; }
        else { return 0; }
    }

    updateSurroundings() {
        let x = this.moon.position.x;
        let y = this.moon.position.y;
        let z = this.moon.position.z;

        this.moon.translateX(-140);
        this.moon.rotateOnWorldAxis(new T.Vector3(0,1,0), .007);
        this.moon.translateX(140);

        //update the spaceship "floating"
        this.def_wrapper.group.position.y = (.25)*Math.cos(this.bgframe);
        this.bgframe += .1;

    }
}