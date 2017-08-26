function AsteroidManager () {
    // The Asteroid field is essentially a particle system
    this.addComponent("asteroidPS", new ParticleSystem());
    this.addComponent("asteroidPE", new ParticleEmitter());     // The Asteroid manager will control the particle emitter to put particles into the system

    this.maxAsteroids = 0;
    this.initialAsteroids = 0;
    this.numFreeSlots = 0;  // Track the # of free Asteroid slots in the particle system
}


AsteroidManager.prototype = Object.create(GameObject.prototype);
AsteroidManager.prototype.constructor = AsteroidManager;

AsteroidManager.prototype.initialize = function() {
    // maxAsteroids is the maximum number of Asteroids that could be in play
    var mySystem = this.components["asteroidPS"];
    mySystem.initialize(numAsteroids);  // TODO make it possible to set the class (maybe give the specific constructor to call?)

    // TODO make it possible to configure the emitter using a config object (i.e. an object with the params to set for the emitter, to enable difficulty levels, etc)
    var myEmitter = this.components["asteroidPE"];
    myEmitter.setVelocityRange(1.0, 5.0);
    myEmitter.setAngleRange(-180, 180);     // degrees
    myEmitter.setLaunchDir(1.0, 0.0);   // Direction doesn't matter.. the angle range will be a full 360 degrees

    // TODO initialize initAsteroids-many Asteroids into the arena
};

AsteroidManager.prototype.update = function(dt_s, config = null) {
    // ==== TEST/DEBUG stuff (TODO remove when finished testing ====

};

AsteroidManager.prototype.setAsteroidCounts = function(initAsteroids, maxAsteroids) {
    this.initAsteroids = initAsteroids;
    this.maxAsteroids = maxAsteroids;
};

AsteroidManager.prototype.resetAsteroidField = function() {
    // TODO revisit
    // This fn is meant to be called after setting max/init (or maybe we should reset when we initialize? Not sure..


    // Track the # of free slots in the Asteroid particle system. Before putting
    // on a new Asteroid, there should be enough free slots to accommodate all
    // fragments the Asteroid will eventually generate (er.. am I saying this
    // right? Basically, to put 1 particle out, we have to be sure there are
    // 4 slots open, because eventually 1 large Asteroid could be blasted into
    // 4 small Asteroids.)
    this.numFreeSlots = this.maxAsteroids;

};