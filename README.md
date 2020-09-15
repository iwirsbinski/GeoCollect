# GeoCollect
Computer game implemented using THREE.js

This project was implemented by Isaac Wirsbinski using the THREE.js JavaScript API. The project also makes use of some starter code from open-source libraries, and some
written by Micheal Gliecher of UW-Madison, for his course in Computer Graphics.

Implementation:
The three files which are central to the logical flow of gameplay are game.js, scenecontrol.js, and defender.js (all authored by Isaac Wirsbinski)

game.js:
This file starts the game, and is the central driver. It and handles processing of keyboard input, as well as redirection to various screens as certian events take place.

scenecontrol.js
The SceneControl class handles the more specific details of gameplay. This class handles the creation and deleting of "objects" that the player collects, and determines
the score and when the game is lost. A SceneControl object is created in game.js, and its functions are called from there.

defender.js
The Defender class handles all specifics relating to the Defenders and the spaceship. This class has the logic for the defenders to dynamically chase the player as they move.
It also controls the spaceships movements, and its dropoff of new defenders.

How to play:
You are the green cube. Your goal is to collect as many of the blue spheres as possible. Avoid the yellow cones, and the spaceship's green light.
