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

    }


    update(cube, worldSize) {

        // update each defender
        for (let i = 0; i < this.defenders.length; i++) {
            let x = (cube.position.x - this.defenders[i].position.x);
            let z = (cube.position.z - this.defenders[i].position.z);
            let dist = Math.sqrt(Math.pow(x,2) + Math.pow(z,2));
            x = x / dist;
            z = z / dist;
            let step = 0.05;
            this.defenders[i].position.x += step*x;
            this.defenders[i].position.z += step*z;
        }

        // add a new defender every 100 frames
        // TODO; make a spaceship come drop off the defenders
        if (this.frame % 350 == 0) {
            let defGeo = new T.ConeBufferGeometry(1,1,50);
            let defMat = new T.MeshStandardMaterial({color: "yellow"});
    
            let def = new T.Mesh(defGeo, defMat); // the following defender
            let x = Math.floor(Math.random() * 2*(worldSize - 1)) - (worldSize - 1);
            let z = Math.floor(Math.random() * 2*(worldSize - 1)) - (worldSize - 1);
            def.position.x = x;
            def.position.z = z;
            def.position.y = .5;
            this.scene.add(def);
            this.defenders.push(def);
        }

        this.frame++;
        
    }
}