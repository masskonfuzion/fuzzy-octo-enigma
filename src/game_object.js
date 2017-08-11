function GameObject () {
    this.components = {};
    this.commandMap = {};   // Map of commands to functions to run, to execute those commands. e.g. { "doStuff": this.doMyThing }
}

GameObject.prototype.update = function(dt_s) {
    console.assert(this !== GameObject);
};

GameObject.prototype.executeCommand = function(cmdMsg) {
    console.assert(this !== GameObject);
}

GameObject.prototype.addComponent = function(compType, compObj) {
    compObj.parentObj = this;  // Set parent obj. Felt like overkill to make a function in the component class, so it's done here

    // For simplicity, compType will be a string (like "render" or "physics")
    this.components[compType] = compObj;
}

GameObject.prototype.getComponent = function(compType) {
    if (compType in this.components && this.components.hasOwnProperty(compType)) {
        return this.components[compType];
    }

    return null;
}
