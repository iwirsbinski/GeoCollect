let T = THREE;

export class LevelTwo {

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

        // build ground
        let groundGeo = new T.PlaneBufferGeometry(30,30);
        let groundMat = new T.MeshStandardMaterial( {color: "red"});
        this.ground = new T.Mesh(groundGeo, groundMat);
        this.ground.receiveShadow = true;
        this.ground.rotateX(2*Math.PI - Math.PI / 2);
        scene.add(this.ground);
        this.worldSize = 15;

        // build objects
        this.objects = [];
        let mesh1 = new T.Mesh(geo, mat);
        mesh1.position.x = -10;
        mesh1.position.y = .5;
        mesh1.position.z = -10;
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
        mesh4.position.x = -12;
        mesh4.position.y = .5;
        mesh4.position.z = -5;
        this.objects.push(mesh4);

        let defGeo = new T.ConeBufferGeometry(1,1,50);
        let defMat = new T.MeshStandardMaterial({color: "yellow"});

        this.defenders = [];
        this.def2 = new T.Mesh(defGeo, defMat); // the following defender
        this.def2.position.x = 0;
        this.def2.position.z = -15;
        this.def2.position.y = .5;
        //this.scene.add(this.def2);
        this.defenders.push(this.def2);

        for (let i = 0; i < this.defenders.length; i++) {
            this.scene.add(this.defenders[i]);
        }

        for (let i = 0; i < this.objects.length; i++) {
            this.scene.add(this.objects[i]);
        }
    }

    update(cube) {
        // check if cube has collected each object, remove from list
        for (let i = 0; i < this.objects.length; i++) {
            if ((Math.abs(cube.position.x - this.objects[i].position.x) < 0.3) &&
                (Math.abs(cube.position.z - this.objects[i].position.z) < 0.3)) {
                    this.scene.remove(this.objects[i]);
                    this.objects.splice(i,1);
            }
        }

    }
}