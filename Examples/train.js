
import {GrObject } from "../Framework/GrObject.js";
let T = THREE;
export class Train extends GrObject {

    constructor() {
        let group = new THREE.Group();
        super("Train",group);
        let geo = new T.CubeGeometry(4,2,2);
        let tl = new T.TextureLoader().load("../Pictures/windows.png");
        let mat = new T.MeshStandardMaterial({map: tl});
        this.mesh = new T.Mesh(geo,mat);

        let geo2 = new T.CubeGeometry(4,.5,2);
        let mat2 = new T.MeshStandardMaterial({color: "white"});
        let mesh2 = new T.Mesh(geo2,mat2);

        let geometry = new T.Geometry();
        
        //top
        geometry.vertices.push(new T.Vector3(2,1,1));
        geometry.vertices.push(new T.Vector3(2,-1,1));
        geometry.vertices.push(new T.Vector3(2,-1,-1));
        geometry.vertices.push(new T.Vector3(2,1,-1));
        geometry.vertices.push(new T.Vector3(4,0,0));

        let topf = new T.Face3(0,4,3);
        geometry.faces.push(topf);
        let botf = new T.Face3(2,4,1);
        geometry.faces.push(botf);
        let leftf = new T.Face3(0,1,4);
        geometry.faces.push(leftf);
        let rightf = new T.Face3(4,2,3);
        geometry.faces.push(rightf);

        geometry.computeFaceNormals();

        let mat3 = new T.MeshStandardMaterial({color: "grey"});
        let mesh3 = new T.Mesh(geometry, mat3);
        let thePoints = this.thePoints;


        this.mesh.position.y = 1;
        group.add(this.mesh);
        mesh2.position.y = 1;
        this.mesh.add(mesh2);
        this.mesh.add(mesh3);
        this.param = 0;
        // this.group = new T.Group();
        // this.group.position.x = mesh3.position.x;
        // this.group.position.y = mesh3.position.y;
        // this.group.position.z = mesh3.position.z;
        // this.group.rotateY(Math.PI / 2);
        this.mesh.add(this.group);
        group.add(this.group)
        

        this.rideable = mesh3;

        // let path = new T.Path();
        // this.thePoints = [ [-8,-8], [8,8],[15,0], [8,-8], [-8,8], [-15,0]];
        // let firstX = (this.thePoints[1][0] - this.thePoints[this.thePoints.length-1][0]) / 2;
        // let firstY = (this.thePoints[1][1] - this.thePoints[this.thePoints.length-1][1]) / 2;
        // let hermites = [[firstX,firstY]];
        // for (let i = 1; i < this.thePoints.length - 1; i++) {
        //     let x = (this.thePoints[i+1][0] - this.thePoints[i-1][0]) / 2;
        //     let y = (this.thePoints[i+1][1] - this.thePoints[i-1][1]) / 2;
        //     hermites.push([x,y]);
        // }
        // let lastX = (this.thePoints[0][0] - this.thePoints[this.thePoints.length-2][0]) / 2;
        // let lastY = (this.thePoints[0][1] - this.thePoints[this.thePoints.length-2][1]) / 2;
        // hermites.push([lastX,lastY]);
    
        // let bezee = Array[hermites.length];
        // //context.beginPath();
        // //context.moveTo(thePoints[0][0], thePoints[0][1]);
        // path.currentPoint = new T.Vector2(this.thePoints[0][0], this.thePoints[0][1]);
        
        // for (let i = 0; i < hermites.length - 1; i++) {
        //     let h0Prime = hermites[i];
        //     let h0 = thePoints[i];
        //     let h1Prime = hermites[i+1];
        //     let h1 = this.thePoints[i+1];
        //     let p1x = h0[0] + ((1/3)*h0Prime[0]);
        //     let p1y = h0[1] + ((1/3)*h0Prime[1]);
        //     let p2x = h1[0] - ((1/3)*h1Prime[0]);
        //     let p2y = h1[1] - ((1/3)*h1Prime[1]);
        //     //context.bezierCurveTo(p1x, p1y, p2x, p2y, h1[0], h1[1]);
        //     path.bezierCurveTo(p1x, p1y, p2x, p2y, h1[0], h1[1]);
        // }
        // //the last connecting line, back to first point
        // let h0Prime = hermites[hermites.length-1];
        // let h0 = this.thePoints[hermites.length-1];
        // let h1Prime = hermites[0];
        // let h1 = this.thePoints[0];
        // let p1x = h0[0] + (1/3)*h0Prime[0];
        // let p1y = h0[1] + (1/3)*h0Prime[1];
        // let p2x = h1[0] - (1/3)*h1Prime[0];
        // let p2y = h1[1] - (1/3)*h1Prime[1];
        // //context.bezierCurveTo(p1x, p1y, p2x, p2y, h1[0], h1[1]);
        // path.bezierCurveTo(p1x, p1y, p2x, p2y, h1[0], h1[1]);
        // //context.closePath();
        // //context.stroke();
        // let points = path.getPoints();

        // let geometry2 = new THREE.BufferGeometry().setFromPoints( points );
        // let material = new THREE.LineBasicMaterial( { color: 0xffffff } );
    
        // let line = new THREE.Line( geometry2, material );
        // this.mesh.add( line );

    }

    advance(delta,timeOfDay) {
        let path = new T.Path();
        let thePoints = [ [-8,-8], [8,8],[18,0], [8,-8], [-8,8], [-18,0]];
        let firstX = (thePoints[1][0] - thePoints[thePoints.length-1][0]) / 2;
        let firstY = (thePoints[1][1] - thePoints[thePoints.length-1][1]) / 2;
        let hermites = [[firstX,firstY]];
        for (let i = 1; i < thePoints.length - 1; i++) {
            let x = (thePoints[i+1][0] - thePoints[i-1][0]) / 2;
            let y = (thePoints[i+1][1] - thePoints[i-1][1]) / 2;
            hermites.push([x,y]);
        }
        let lastX = (thePoints[0][0] - thePoints[thePoints.length-2][0]) / 2;
        let lastY = (thePoints[0][1] - thePoints[thePoints.length-2][1]) / 2;
        hermites.push([lastX,lastY]);
    
        let bezee = Array[hermites.length];
        //context.beginPath();
        //context.moveTo(thePoints[0][0], thePoints[0][1]);
        path.currentPoint = new T.Vector3(thePoints[0][0], 0, thePoints[0][1]);
        
        for (let i = 0; i < hermites.length - 1; i++) {
            let h0Prime = hermites[i];
            let h0 = thePoints[i];
            let h1Prime = hermites[i+1];
            let h1 = thePoints[i+1];
            let p1x = h0[0] + ((1/3)*h0Prime[0]);
            let p1y = h0[1] + ((1/3)*h0Prime[1]);
            let p2x = h1[0] - ((1/3)*h1Prime[0]);
            let p2y = h1[1] - ((1/3)*h1Prime[1]);
            //context.bezierCurveTo(p1x, p1y, p2x, p2y, h1[0], h1[1]);
            path.bezierCurveTo(p1x, 0, p1y, p2x, 0, p2y, h1[0], 0, h1[1]);
        }
        //the last connecting line, back to first point
        let h0Prime = hermites[hermites.length-1];
        let h0 = thePoints[hermites.length-1];
        let h1Prime = hermites[0];
        let h1 = thePoints[0];
        let p1x = h0[0] + (1/3)*h0Prime[0];
        let p1y = h0[1] + (1/3)*h0Prime[1];
        let p2x = h1[0] - (1/3)*h1Prime[0];
        let p2y = h1[1] - (1/3)*h1Prime[1];
        //context.bezierCurveTo(p1x, p1y, p2x, p2y, h1[0], h1[1]);
        path.bezierCurveTo(p1x,0, p1y, p2x,0, p2y, h1[0],0, h1[1]);
        //context.closePath();
        //context.stroke();
        let points = path.getPoints();

        let geometry = new THREE.BufferGeometry().setFromPoints( points );
        let material = new THREE.LineBasicMaterial( { color: 0xffffff } );
    
        let line = new THREE.Line( geometry, material );
       // this.mesh.add( line );
    
        let u = this.param % 1;
        //calculate position
        let index = Math.floor(this.param) % thePoints.length;
        let next = (index + 1) % thePoints.length;
        let b0 = 1 - 3*(Math.pow(u,2)) + 2*Math.pow(u,3);
        let b1 = u - 2*Math.pow(u,2) + Math.pow(u,3);
        let b2 = 3*Math.pow(u,2) - 2*Math.pow(u,3);
        let b3 = -Math.pow(u,2) + Math.pow(u,3);
        //if (index == 4) { index = 1;}
        let xPos = b0*thePoints[index][0] + b1*hermites[index][0] + b2*thePoints[next][0] +
                        b3*hermites[next][0];
        let yPos = b0*thePoints[index][1] + b1*hermites[index][1] + b2*thePoints[next][1] +
                        b3*hermites[next][1];

            //calculate angle
        let b0prime = -6*u + 6*Math.pow(u,2);
        let b1prime = 1 - 4*u + 3*Math.pow(u,2);
        let b2prime = 6*u - 6*Math.pow(u, 2);
        let b3prime = -2*u + 3*Math.pow(u,2);
        let xDirec = b0prime*thePoints[index][0] + b1prime*hermites[index][0] + b2prime*thePoints[next][0] +
        b3prime*hermites[next][0];
        let yDirec = b0prime*thePoints[index][1] + b1prime*hermites[index][1] + b2prime*thePoints[next][1] +
        b3prime*hermites[next][1];
        let angle = Math.atan2(yDirec,xDirec);

        this.mesh.position.x = xPos;
        this.mesh.position.z = yPos;
        this.mesh.rotation.y = -angle;

        this.param += 0.015;
        //if (this.param == 1) { this.param == 0;}

    }

    getTrack() {
        let path = new T.Path();
        let thePoints = [ [-8,-8], [8,8],[15,0], [8,-8], [-8,8], [-15,0]];
        let firstX = (thePoints[1][0] - thePoints[thePoints.length-1][0]) / 2;
        let firstY = (thePoints[1][1] - thePoints[thePoints.length-1][1]) / 2;
        let hermites = [[firstX,firstY]];
        for (let i = 1; i < thePoints.length - 1; i++) {
            let x = (thePoints[i+1][0] - thePoints[i-1][0]) / 2;
            let y = (thePoints[i+1][1] - thePoints[i-1][1]) / 2;
            hermites.push([x,y]);
        }
        let lastX = (thePoints[0][0] - thePoints[thePoints.length-2][0]) / 2;
        let lastY = (thePoints[0][1] - thePoints[thePoints.length-2][1]) / 2;
        hermites.push([lastX,lastY]);
    
        let bezee = Array[hermites.length];
        //context.beginPath();
        //context.moveTo(thePoints[0][0], thePoints[0][1]);
        path.currentPoint = new T.Vector2(thePoints[0][0], thePoints[0][1]);
        
        for (let i = 0; i < hermites.length - 1; i++) {
            let h0Prime = hermites[i];
            let h0 = thePoints[i];
            let h1Prime = hermites[i+1];
            let h1 = thePoints[i+1];
            let p1x = h0[0] + ((1/3)*h0Prime[0]);
            let p1y = h0[1] + ((1/3)*h0Prime[1]);
            let p2x = h1[0] - ((1/3)*h1Prime[0]);
            let p2y = h1[1] - ((1/3)*h1Prime[1]);
            //context.bezierCurveTo(p1x, p1y, p2x, p2y, h1[0], h1[1]);
            path.bezierCurveTo(p1x, p1y, p2x, p2y, h1[0], h1[1]);
        }
        //the last connecting line, back to first point
        let h0Prime = hermites[hermites.length-1];
        let h0 = thePoints[hermites.length-1];
        let h1Prime = hermites[0];
        let h1 = thePoints[0];
        let p1x = h0[0] + (1/3)*h0Prime[0];
        let p1y = h0[1] + (1/3)*h0Prime[1];
        let p2x = h1[0] - (1/3)*h1Prime[0];
        let p2y = h1[1] - (1/3)*h1Prime[1];
        //context.bezierCurveTo(p1x, p1y, p2x, p2y, h1[0], h1[1]);
        path.bezierCurveTo(p1x, p1y, p2x, p2y, h1[0], h1[1]);
        //context.closePath();
        //context.stroke();
        let points = path.getPoints();

        let geometry = new THREE.BufferGeometry().setFromPoints( points );
        let material = new THREE.LineBasicMaterial( { color: 0xffffff } );
    
        this.line = new THREE.Line( geometry, material );
        let returnMesh = new T.Mesh();
        returnMesh.add(line);
        return returnMesh;
    }

}