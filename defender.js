let T = THREE;

export class defender {

    constructor(scene) {

        this.scene = scene;
        this.defenders = [];
        // create 2 defenders to begin.
        this.frame = 0; // updated each animation frame. create a new defender every 100 frames

        // start with 2 defenders
        let defGeo = new T.ConeBufferGeometry(1,1,50);
        let defMat = new T.MeshStandardMaterial({color: "yellow"});

        this.def2 = new T.Mesh(defGeo, defMat); // the following defender
        this.def2.position.x = -15;
        this.def2.position.z = -15;
        this.def2.position.y = .5;
        this.scene.add(this.def2);
        this.defenders.push(this.def2);

        this.def3 = new T.Mesh(defGeo, defMat); // another following defender
        this.def3.position.x = 15;
        this.def3.position.z = 15;
        this.def3.position.y = .5;
        this.scene.add(this.def3);
        this.defenders.push(this.def3);

        this.def4 = new T.Mesh(defGeo, defMat); // another following defender
        this.def4.position.x = -15;
        this.def4.position.z = 15;
        this.def4.position.y = .5;
        this.scene.add(this.def4);
        this.defenders.push(this.def4);

        this.new_flag = false;
        this.dropoff_flag = false;
        this.newLocX = 0;
        this.newLocZ = 0;
        this.newDefenderShip();

    }


    update(cube, worldSize) {

        // update each defender
        for (let i = 0; i < this.defenders.length; i++) {
            let x = (cube.position.x - this.defenders[i].position.x);
            let z = (cube.position.z - this.defenders[i].position.z);
            let dist = Math.sqrt(Math.pow(x,2) + Math.pow(z,2));
            if (dist < 20) {
                x = x / dist;
                z = z / dist;
                let step = 0.07
                this.defenders[i].position.x += step*x;
                this.defenders[i].position.z += step*z;
            }
        }

        // add a new defender every 100 frames
        // TODO; make a spaceship come drop off the defenders
        if (this.frame % 200 == 0 && !this.new_flag && !this.dropoff_flag) {
            this.new_flag = true;
            //this.shipTravel();
            // let defGeo = new T.ConeBufferGeometry(1,1,50);
            // let defMat = new T.MeshStandardMaterial({color: "yellow"});
    
            // let def = new T.Mesh(defGeo, defMat); // the following defender
            let x = Math.floor(Math.random() * 2*(worldSize - 1)) - (worldSize - 1);
            let z = Math.floor(Math.random() * 2*(worldSize - 1)) - (worldSize - 1);
            this.newLocX = x;
            this.newLocZ = z;
            // def.position.x = x;
            // def.position.z = z;
            // def.position.y = .5;
            // this.scene.add(def);
            // this.defenders.push(def);
        }

        if (this.new_flag) { this.shipTravel(); }
        if (this.dropoff_flag) { this.shipDropoff(); }

        this.frame++;
        
    }

    newDefenderShip() {
        this.group = new T.Group();

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

        // this.spotlight = new T.SpotLight({color: "green",});
        // this.spotlight.position.y = 2;
        // this.spotlight.position.x = 0;
        // this.spotlight.position.z = 0;
        //this.mesh.add(spotlight);
        this.mesh.add(cone);
        this.mesh.position.y = 10;
        //group.add(this.spotlight);
        this.group.add(this.mesh);


        this.group.translateX(40);


        this.scene.add(this.group);
    }

    shipTravel() {
        // the ship has arrived, call new defender function to be dropped off
        if (Math.abs(this.group.position.x - this.newLocX) < 0.2 && Math.abs(this.group.position.z - this.newLocZ) < 0.2) {
            this.new_flag = false;
            this.newDef();
            return;
        }
        let x = (this.newLocX - this.group.position.x);
        let z = (this.newLocZ - this.group.position.z);
        let dist = Math.sqrt(Math.pow(x,2) + Math.pow(z,2));
        x = x / dist;
        z = z / dist;
        let step = 0.16;
        this.group.position.x += step*x;
        this.group.position.z += step*z;
    }

    newDef() {
        console.log("new def!!")
        let defGeo = new T.ConeBufferGeometry(1,1,50);
        let defMat = new T.MeshStandardMaterial({color: "yellow"});

        this.new_def = new T.Mesh(defGeo, defMat); // the following defender
        let x = this.newLocX;
        let z = this.newLocZ;
        this.new_def.position.x = x;
        this.new_def.position.z = z;
        this.new_def.position.y = this.mesh.position.y
        console.log(this.new_def.position.y);
        this.scene.add(this.new_def);
        this.dropoff_flag = true;
        this.shipDropoff();

    }
    shipDropoff() {
        if (Math.abs(this.new_def.position.y - .5) < .01) {
            this.new_def.position.y = .5;
            this.defenders.push(this.new_def);
            this.dropoff_flag = false;
            return;
        }
        this.new_def.position.y -= .1;
    }
}