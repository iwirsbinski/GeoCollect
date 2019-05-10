
import {GrObject } from "../Framework/GrObject.js";
let T = THREE;
export class TrainTrack extends GrObject {

    constructor() {
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
        path.currentPoint = new T.Vector3(thePoints[0][0], thePoints[0][1]);
        
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
        let material = new THREE.LineBasicMaterial( { color: "black",} );
    
        let line = new THREE.Line( geometry, material );
        let lineOut = new THREE.Line( geometry, material );
        let lineIn = new THREE.Line( geometry, material );
        let meshOut = new T.Mesh();
        meshOut.add(lineOut);
        meshOut.scale.set(1.5);
        let meshIn = new T.Mesh();
        meshIn.add(lineIn);
        meshIn.scale.set(1/2);
        let mesh = new T.Mesh();
        mesh.add(line);
        mesh.add(meshIn);
        mesh.add(meshOut);
        mesh.rotateX(Math.PI/2);
        mesh.translateZ(-.1);
        super("Traintrack", mesh);
    }
}