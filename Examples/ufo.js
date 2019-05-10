
import {GrObject } from "../Framework/GrObject.js";
let T = THREE;
export class UFO extends GrObject {


    constructor() {
        let group = new T.Group();
        super("UFO", group);

        let geometry = new T.Geometry();
        let angle = 0;
        let count = 0;

        //set vertices
        geometry.vertices.push(new T.Vector3(0,1.2,0));
        geometry.vertices.push(new T.Vector3(0,-1.2,0));
        while (angle <= 2*Math.PI) {
            let x = 3*Math.cos(angle);
            let z = 3*Math.sin(angle);
            geometry.vertices.push(new T.Vector3(x,0,z));
            angle += Math.PI / 8;
            count++
        }
        
        for (let i = 2; i < geometry.vertices.length - 1; i++) {
            let face = new T.Face3(i+1, i, 0);
            geometry.faces.push(face);
        }

        let lastFaceTop = new T.Face3(2, geometry.vertices.length - 1, 0);
        geometry.faces.push(lastFaceTop);

        for (let i = 2; i < geometry.vertices.length - 1; i++) {
            let face = new T.Face3(i, i+1, 1);
            geometry.faces.push(face);
        }

        let lastFace = new T.Face3(geometry.vertices.length - 1, 2 , 1);
        geometry.faces.push(lastFace);
        geometry.computeFaceNormals();

        let mat = new T.MeshStandardMaterial({color: "grey"});
        this.mesh = new T.Mesh(geometry, mat);

        let coneGeo = new T.ConeBufferGeometry(3, 12, 30);
        let coneMat = new T.MeshStandardMaterial({color: "green", transparent: true, opacity: .5});
        let cone = new T.Mesh(coneGeo, coneMat);
        cone.translateY(-5);

        let cubeGeo = new T.CubeGeometry(1,1,1);
        let cubeMat = new T.MeshStandardMaterial({color: "red"});
        this.cube = new T.Mesh(cubeGeo, cubeMat);
        this.cube.position.x = 15;
        this.cube.position.y = 1;
        this.cube.position.z = 0;
        // this.spotlight = new T.SpotLight({color: "green",});
        // this.spotlight.position.y = 2;
        // this.spotlight.position.x = 0;
        // this.spotlight.position.z = 0;
        //this.mesh.add(spotlight);
        this.mesh.add(cone);
        this.mesh.position.y = 10;
        //group.add(this.spotlight);
        group.add(this.mesh);
        group.add(this.cube);

        this.abduct = 0;
        this.moveRight = 1;
        this.moveUp = 0;
        this.cubeAttached = 0;
        this.cubeRight = true;
        this.moveDown = 0;

        this.dropping = false;

        this.u = 0;

        this.rideable = this.mesh;
    }

    advance(delta, timeofDay) {
        if (this.moveDown == 0) {
            if (this.moveRight == 1) {
                this.mesh.translateX(.2);
                this.mesh.position.y = 10 + Math.cos(this.u % (2*Math.PI));
                if (this.cubeAttached == 1) {
                    this.cube.translateX(.2);
                    this.cube.position.y = 10 + Math.cos(this.u % (2*Math.PI));
                }
                //this.spotlight.translateX(.2);
                let targetMesh = new T.Mesh();
                // targetMesh.position.x = this.mesh.position.x;
                // targetMesh.position.y = 0;
                // targetMesh.position.z = 0;
                // this.spotlight.target = targetMesh;
                if (this.mesh.position.x >= 15) {
                    //console.log("Switch");
                    this.moveRight = 0;
                    this.moveDown = 1;
                }
            }
            else if (this.moveRight == 0){
                this.mesh.translateX(-.2);
                this.mesh.position.y = 10 + Math.cos(this.u % (2*Math.PI));
                if (this.cubeAttached == 1) {
                    this.cube.translateX(-.2);
                    this.cube.position.y = 10 + Math.cos(this.u % (2*Math.PI));
                }
                //this.spotlight.translateX(-.2);
                if (this.mesh.position.x <= -15) {
                    this.moveRight = 1;
                    this.moveDown = 1;
                }
            }
        
        }
        else {

            // keep hovering
            this.mesh.position.y = 10 + Math.cos(this.u % (2*Math.PI));
            if (this.cubeAttached == 1 && !this.dropping) {
                this.cube.position.y = 10 + Math.cos(this.u % (2*Math.PI));
            }

            // if cube is not attached, abduct it
            if (this.cubeAttached == 0) {
                if ((this.mesh.position.x < 0 && this.cube.position.x < 0) || (this.mesh.position.x > 0 && this.cube.position.x > 0))  {
                    this.cube.translateY(.1);
                    if (this.cube.position.y >= this.mesh.position.y) {
                        this.cubeAttached = 1;
                        this.moveDown = 0;
                }
            }
            else {
                this.moveDown = 0;
            }
            }
            // if cube is attached, drop it
            else if ((this.mesh.position.x < 0 && this.cube.position.x < 0) || (this.mesh.position.x > 0 && this.cube.position.x > 0)){
                this.cube.translateY(-.1);
                this.dropping = true;
                if (this.cube.position.y <= 1) {
                    this.cubeAttached = 0;
                    this.moveDown = 0;
                }
            }
        }
        this.u += .1;
    }
}