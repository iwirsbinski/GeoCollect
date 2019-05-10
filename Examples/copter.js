let T = THREE;

import { GrObject } from "../Framework/GrObject.js";



export class Copter extends GrObject {

        /**
     * Simple looking helicopter - with a complex behavior
     * 
     * @param {Object} params 
     */
    constructor(params={}) {
        let group = new THREE.Group();
        super(`Helicopter`,group);

        let cube = new T.CubeGeometry(1.5,1.5,1.5);
        let front = new T.SphereBufferGeometry(.75,20,20);
        let rotor1pole = new T.CubeGeometry(.2,2,.2);
        let rotor1 = new T.CubeGeometry(.1,.1,2);
        let rotor2 = new T.CubeGeometry(2,.1,.1);
    
        let rotor1poleMat = new T.MeshStandardMaterial({color:"blue"})
        let rotor1poleMesh = new T.Mesh(rotor1pole, rotor1poleMat);
        let rotor1Mat = new T.MeshStandardMaterial({color:"blue"})
        let rotor2Mat = new T.MeshStandardMaterial({color:"blue"})
        this.rotor1Mesh = new T.Mesh(rotor1, rotor1Mat);
        this.rotor2Mesh = new T.Mesh(rotor2, rotor2Mat);
        // let rotorGroup =  new T.Group();
        // rotorGroup.add(rotor2Mesh);
        // rotorGroup.add(rotor1Mesh);
        // rotorGroup.translateY(4);
        this.rotor1Mesh.translateY(2);
        this.rotor2Mesh.translateY(2);
        rotor1poleMesh.translateY(1);
    
        let backPole = new T.CubeGeometry(1.5,.2,.2);
        let backPoleMat = new T.MeshStandardMaterial({color:"blue"});
        let backPoleMesh = new T.Mesh(backPole, backPoleMat);
        backPoleMesh.translateX(2);
        let rotor3 = new T.CubeGeometry(.1,2,.1);
        let rotor4 = new T.CubeGeometry(.1,.1,2);
        let rotor3Mat = new T.MeshStandardMaterial({color:"blue"});
        let rotor4Mat = new T.MeshStandardMaterial({color:"blue"});
        this.rotor3Mesh = new T.Mesh(rotor3, rotor3Mat);
        this.rotor4Mesh = new T.Mesh(rotor4, rotor4Mat);
        this.rotor3Mesh.translateX(2.5);
        this.rotor4Mesh.translateX(2.5);
    
    
    
        let cubeMat = new T.MeshStandardMaterial({color:"green"});
        let frontMat = new T.MeshStandardMaterial({color:"green"});
        let cubeMesh = new T.Mesh(cube, cubeMat);
        let frontMesh = new T.Mesh(front, frontMat);
        this.body = new T.Group();
        frontMesh.translateX(.75);
        this.body.add(frontMesh);
        this.body.add(cubeMesh);
        this.body.add(rotor1poleMesh);
        this.body.add(backPoleMesh);
        //body.add(rotorGroup);
        this.body.add(this.rotor1Mesh);
        this.body.add(this.rotor2Mesh);
        this.body.add(this.rotor3Mesh);
        this.body.add(this.rotor4Mesh);
        this.body.translateY(2);
        this.body.translateZ(-4);
        this.body.translateX(-4);
        //rotorGroup.translateX(-4);
        //rotor1Mesh.translateX(-4);
        //rotorGroup.translateZ(-4);
        //rotor1Mesh.translateZ(-4);
        group.add(this.body);
        //scene.add(rotorGroup);
    
        //rader dish
        // let radarGeo = new T.ConeBufferGeometry(.5,1, 32);
        // let radarMat = new T.MeshStandardMaterial({color:"green"});
        // let radarMesh = new T.Mesh(radarGeo, radarMat);
        // radarMesh.translateY(.75);
        // radarMesh.rotateZ(Math.PI / 4);
        // radarMesh.rotateX(-Math.PI / 4);
        // group.add(radarMesh);
        this.rideable = this.body;

        
    }

    advance(delta, timeofday) {
                //move first copter
                this.body.translateX(4);
                this.body.translateZ(4);
                this.body.rotateOnWorldAxis(new T.Vector3(0,1,0), 0.04);  // this rotates in place?
                this.body.translateX(-4);
                this.body.translateZ(-4);
               // rotorGroup.rotateOnWorldAxis(new T.Vector3(0,1,0), 0.04);
                this.rotor1Mesh.rotateOnWorldAxis(new T.Vector3(0,1,0), 0.13);
                this.rotor2Mesh.rotateOnWorldAxis(new T.Vector3(0,1,0), 0.13);
                this.rotor3Mesh.rotateOnWorldAxis(new T.Vector3(1,0,0), 0.13);
                this.rotor4Mesh.rotateOnWorldAxis(new T.Vector3(1,0,0), 0.13);
        
                //radarMesh.rotateOnWorldAxis(new T.Vector3(0,1,0), 0.04)

    }

}