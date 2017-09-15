// Bullet manager that controls the bullet particle system
// The manager can control how bullets are enables/initialized (and re-initialized) and disabled; also can control what sprite/image the bullet objects draw, as well as how they move

function BulletManager () {
    GameObject.call(this);
    // The Bullet particle system is an object pool
    this.addComponent("gunPS", new ParticleSystem());   // TODO possibly make a Bullet class that can be instantiated with one of many types of Bullet object (or maybe only one Bullet

    this.maxBullets = 0;
    this.initialBullets = 0;
    this.numFreeSlots = 0;  // Track the # of free Bullet slots in the particle system

    // Populate the command map (this.commandMap is part of the GameObject base class, which this Bullet Manager derives from)
    this.commandMap["disableBullet"] = this.disableBullet;
}

BulletManager.prototype = Object.create(GameObject.prototype);
BulletManager.prototype.constructor = BulletManager;

BulletManager.prototype.initialize = function(maxBullets) {
    // maxBullets is the maximum number of Bullets that could be in play
    var mySystem = this.components["gunPS"];
    mySystem.initialize(maxBullets);  // TODO make it possible to set the class (maybe give the specific constructor to call?)

    // TODO NOTE: Chances are the BulletManager does not have its own emitter; various other things will have emitters (e.g. spaceships). However, the manager will be able to expire bullets when they meet certain conditions (e.g. off-screen, collide with something)

    //// TODO make it possible to configure the emitter using a config object (i.e. an object with the params to set for the emitter, to enable different types of guns)
    //var myEmitter = this.components["bulletPE"];
    //myEmitter.setVelocityRange(1.0, 5.0);
    //myEmitter.setAngleRange(-180, 180);     // degrees
    //myEmitter.setLaunchDir(1.0, 0.0);   // Direction doesn't matter.. the angle range will be a full 360 degrees
    //myEmitter.setPosition(256, 256);    // TODO randomize emitter positions throughout the arena/space
    //myEmitter.registerParticleSystem(mySystem);
};

// Run a generic update function that simply walks through this object's components and updates them all
// The update() function is a "standard" function in the engine -- every game object should have an update()
BulletManager.prototype.update = function(dt_s, config = null) {
    for (var compName in this.components) {
        if (this.components.hasOwnProperty(compName)) {
            this.components[compName].update(dt_s);
        }
    }

    this.postUpdate(dt_s, config);
};


BulletManager.prototype.draw = function(canvasContext) {
    // Draw each alive Particle
    var myPS = this.components["gunPS"];
    for (var particle of myPS.particles) {
        if (particle.alive) {
            particle.draw(canvasContext);
        }
    }
};


// Run additional update logic after the update function finishes
// (This function is called from update()
BulletManager.prototype.postUpdate = function(dt_s, config=null) {
    // Enqueue a message to instruct the Bullet Management system to disable a bullet object if certain conditions are met
    for (var bullet of this.components["gunPS"].particles) {
        // Test for particles leaving arena
        // TODO improve bullet expiration. perhaps we can pass in the arena object, which can have a testContainment() function or something
        if (!bullet.alive) {
            continue;
        }

        var physComp = bullet.components["physics"];
        if (physComp.currPos[0] < 0 || physComp.currPos[0] > 512 ||
            physComp.currPos[1] < 0 || physComp.currPos[1] > 512 ) {
                cmdMsg = { "topic": "GameCommand",
                           "command": "disableBullet",
                           "objRef": this,
                           "params": { "bulletToDisable": bullet }
                         };
                // Remember, gameLogic is accessible globally
                gameLogic.messageQueue.enqueue(cmdMsg);
            }


        // NOTE: Look to the collision manager for another case: bullet collides with object. It will enqueue a message from there
    }
};


BulletManager.prototype.executeCommand = function(cmdMsg, params) {
    console.log("BulletManager executing command");
    console.log(cmdMsg);

    // Call function
    // Note that this command passes a "params" arg in the cmdMsg payload, where other executeCommand functions (elsewhere in this codebase) do not..
    this.commandMap[cmdMsg].call(this, params); // use call() because without it, we're losing our "this" reference (going from BulletManager to Object)
}


BulletManager.prototype.disableBullet = function(dictObj) {
    // reminder that the object passed in is a dict / associative array
    
    var bullet = dictObj["bulletToDisable"];
    bullet.alive = false;
}


