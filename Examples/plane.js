
import { GrObject } from "../Framework/GrObject.js";

let T = THREE;

export class Plane extends GrObject {

    constructor() {
        let group = new T.Group();
        super("Plane", group);

        let bodyGeo = new T.ConeBufferGeometry(1,5,30);
        let bodyMat = new T.MeshStandardMaterial({color: "white"});
        this.bodyMesh = new T.Mesh(bodyGeo, bodyMat);

        let wing1Geo = new T.Geometry();
        wing1Geo.vertices.push(new T.Vector3(0,-.7,0));
        wing1Geo.vertices.push(new T.Vector3(0,.7,0));
        wing1Geo.vertices.push(new T.Vector3(-3,0,-.5));

        let f1 = new T.Face3(0,1,2);
        wing1Geo.faces.push(f1);
        let f2 = new T.Face3(2,1,0);
        wing1Geo.faces.push(f2);
        wing1Geo.computeFaceNormals();

        let wingMat = new T.MeshStandardMaterial({color: "white"});
        let wing1Mesh = new T.Mesh(wing1Geo, wingMat);
        this.bodyMesh.add(wing1Mesh);

        let wing2Geo = new T.Geometry();
        wing2Geo.vertices.push(new T.Vector3(0,-.7,0));
        wing2Geo.vertices.push(new T.Vector3(0,.7,0));
        wing2Geo.vertices.push(new T.Vector3(3,0,.5));

        let f3 = new T.Face3(0,1,2);
        wing2Geo.faces.push(f3);
        let f4 = new T.Face3(2,1,0);
        wing2Geo.faces.push(f4);
        wing2Geo.computeFaceNormals();
        let wing2Mesh = new T.Mesh(wing2Geo, wingMat)
        this.bodyMesh.add(wing2Mesh);

        let wing3Geo = new T.Geometry();
        wing3Geo.vertices.push(new T.Vector3(0,-1,0));
        wing3Geo.vertices.push(new T.Vector3(0,-2.5,0));
        wing3Geo.vertices.push(new T.Vector3(.5,-2.5,-3));

        let f5 = new T.Face3(0,1,2);
        wing3Geo.faces.push(f5);
        let f6 = new T.Face3(2,1,0);
        wing3Geo.faces.push(f6);
        wing3Geo.computeFaceNormals();
        let wing3Mesh = new T.Mesh(wing3Geo, wingMat);
        this.bodyMesh.add(wing3Mesh);
        this.bodyMesh.position.x = -10;
        //this.bodyMesh.z = 0


        this.bodyMesh.translateY(3);
        this.bodyMesh.rotateX(Math.PI / 2);
        

        
        


        group.add(this.bodyMesh);
        this.u = 0;
        
    }

    advance(delta, timeOfDay) {
        this.bodyMesh.translateX(20);
        this.bodyMesh.translateZ(20);
        this.bodyMesh.rotateOnWorldAxis(new T.Vector3(0,1,0), 0.04);  // this rotates in place?
        this.bodyMesh.translateX(-20);
        this.bodyMesh.translateZ(-20);
        
        this.bodyMesh.position.y = 12 + (Math.cos(this.u) * 3);
        this.u += .03;
    }
}