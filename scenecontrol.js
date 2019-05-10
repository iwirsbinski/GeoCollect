let T = THREE;

export class SceneControl {

    // construct the objects of the scene.
    constructor(scene) {
        this.scene = scene;

        let geo = new T.SphereBufferGeometry(.5, 30, 30);
        let mat = new T.MeshStandardMaterial({color: "blue"});
        
        // let botLeft = [];
        // for (let i = 0; i < 10; i++) {
        //     let mesh = new T.Mesh(geo,mat);
        //     scene.add(mesh);
        // }
        //split objects into 4 quadrants

        // build objects
        this.objects = [];
        let mesh1 = new T.Mesh(geo, mat);
        mesh1.position.x = 8;
        mesh1.position.y = .5;
        mesh1.position.z = 5;
        this.objects.push(mesh1);

        let mesh2 = new T.Mesh(geo, mat);
        mesh2.position.x = -5;
        mesh2.position.y = .5;
        mesh2.position.z = 8;
        this.objects.push(mesh2);

        let mesh3 = new T.Mesh(geo, mat);
        mesh3.position.x = -8;
        mesh3.position.y = .5;
        mesh3.position.z = -8;
        this.objects.push(mesh3);

        let mesh4 = new T.Mesh(geo, mat);
        mesh4.position.x = 5;
        mesh4.position.y = .5;
        mesh4.position.z = -5;
        this.objects.push(mesh4);

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

        this.def2 = new T.Mesh(defGeo, defMat); // the following defender
        this.def2.position.x = -15;
        this.def2.position.z = -15;
        this.def2.position.y = .5;
        this.scene.add(this.def2);

        
        this.def1Right = true;
        
    }

    // updates the game with respect to the objects.
    // returns true if all obejcts have been collected, else returns false.
    // returns 0 if game is continued, 1 if game is lost, 2 if game is won.
    update(cube) {
        for (let i = 0; i < this.objects.length; i++) {
            if ((Math.abs(cube.position.x - this.objects[i].position.x) < 0.3) &&
                (Math.abs(cube.position.z - this.objects[i].position.z) < 0.3)) {
                    this.scene.remove(this.objects[i]);
                    this.objects.splice(i,1);
            }
        }
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
        if (Math.abs(cube.position.x - this.def1.position.x) < 0.75 &&
        Math.abs(cube.position.z - this.def1.position.z) < 0.75) {
            this.scene.remove(cube);
            return 1;
        }
        if (Math.abs(cube.position.x - this.def2.position.x) < 0.75 &&
        Math.abs(cube.position.z - this.def2.position.z) < 0.75) {
            this.scene.remove(cube);
            return 1;
        }

        //move following defender
        let x = (cube.position.x - this.def2.position.x);
        let z = (cube.position.z - this.def2.position.z);
        let dist = Math.sqrt(Math.pow(x,2) + Math.pow(z,2));
        x = x / dist;
        z = z / dist;
        let step = 0.05;
        this.def2.position.x += step*x;
        this.def2.position.z += step*z;
        


        if (this.objects.length == 0) { return 2; }
        else { return 0; }


    }
}