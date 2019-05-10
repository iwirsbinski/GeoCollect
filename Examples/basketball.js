import {GrObject } from "../Framework/GrObject.js";
let T = THREE;
export class Basketball extends GrObject {

    constructor() {
        let group = new T.Group();
        super("basketball",group);
        let geo = new T.SphereGeometry(.7,30,20);
        let tl = new T.TextureLoader().load("../Pictures/basketball.png");
        //let mat = new T.MeshStandardMaterial({color: "red"});
        let mat = new T.MeshStandardMaterial({map: tl});
        this.mesh = new T.Mesh(geo, mat);
        this.mesh.position.z = 16;

        let boardGeo = new T.CubeGeometry(4,4,.1);
        let boardMat = new T.MeshStandardMaterial({color: "grey"});
        let board = new T.Mesh(boardGeo, boardMat);
        board.rotateY(Math.PI / 2);
        board.position.y = 5;
        board.position.x = -16;
        board.position.z = 16;

        let hoopGeo = new T.RingBufferGeometry(2,1.2,30,30);
        let hoopMat = new T.MeshStandardMaterial({color: "red"});
        let hoop = new T.Mesh(hoopGeo, hoopMat);
        hoop.position.y = 4.5;
        hoop.position.x = -14.3;
        hoop.position.z = 16;
        hoop.rotateX(Math.PI / 2);

        let personGeo = new T.CubeGeometry(1,2,1);
        let personMat = new T.MeshStandardMaterial({color: "blue"});
        this.person = new T.Mesh(personGeo, personMat);
        group.add(this.person);

        let headGeo = new T.SphereGeometry(.6,30,30);
        let headMat = new T.MeshStandardMaterial({color: "white"});
        let head = new T.Mesh(headGeo, headMat);
        head.translateY(1.5);
        this.person.add(head);

        this.person.position.x = 16.5;
        this.person.position.y = 1;
        this.person.position.z = 16;

        this.param = 0;
        group.add(hoop);
        group.add(board);
        group.add(this.mesh);

        this.inititateJump = false;
        this.goingUp = true;
        this.goinDown = false;
        this.jumped = false;
    }

    advance(delta,timeOfDay) {
        let thePoints = [ [15,1], [7.5,10],[-7.5,10], [-14.3,4.5], [-14,-2,15]];
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
        //context.closePath();
        //context.stroke();

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

        if (index == 4) { this.u = 0; }
        else {
        this.mesh.position.x = xPos;
        this.mesh.position.y = yPos;
        }

        //make thrower jump
        if (index == 0 && !this.jumped) {
            this.initiateJump = true;
            this.jumped = true;

        }
        if (index == 1) { this.jumped = false; }
        if (this.initiateJump) {
            if (this.goingUp) {
                this.person.position.y += .2;
                if (this.person.position.y >= 2) {
                    this.goingDown = true;
                    this.goingUp = false;
                }
            }
            if (this.goingDown) {
                this.person.position.y -= .2;
                if (this.person.position.y <= 1) {
                    this.goingUp = true;
                    this.goingDown = false;
                    this.initiateJump = false;
                    this.jumped = true;
                }
            }
        }

        this.param += 0.04;
        //if (this.param == 1) { this.param == 0;}

    }
}