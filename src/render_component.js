function RenderComponentSprite() {
    GameObjectComponent.call(this);

    // NOTE: We'll need to load all the images on the document.onload() -- so we might need an image manager (long-term), or to just simply has a list/array of image components we plan to draw, so we can check that they all loaded, and throw an error if any didn't
    this.imgObj = null;
}

RenderComponentSprite.prototype = Object.create(GameObjectComponent.prototype);
RenderComponentSprite.prototype.constructor = RenderComponentSprite;


RenderComponentSprite.prototype.setImgObj = function(imgObj) {
    this.imgObj = imgObj;
}

RenderComponentSprite.prototype.draw = function(canvasContext, xCoord, yCoord) {
    // xCoord,yCoord must be passed in (probably from the physics component's position?)
    canvasContext.drawImage(this.imgObj, xCoord, yCoord);
}

RenderComponentSprite.prototype.update = function(dt_s, config = null) {
    // Override base GameObject class update(), but do nothing in this func
    // (unless we determine that something does need to be updated, in which case, update this comment :-D)
}


// ----------------------------------------------------------------------------

function RenderComponentCircle() {
    GameObjectComponent.call(this);
    this.color = [255, 255, 255];   // Default to white, because why not?
    this.radius = 3;
}

RenderComponentCircle.prototype = Object.create(GameObjectComponent.prototype);
RenderComponentCircle.prototype.constructor = RenderComponentCircle;


RenderComponentCircle.prototype.draw = function(canvasContext, xCoord, yCoord) {
    // xCoord,yCoord must be passed in (probably from the physics component's position?)
    canvasContext.beginPath();
    canvasContext.arc(xCoord, yCoord, this.radius, 0, Math.PI * 2, false);
    //canvasContext.fillStyle = 'white';  // TODO change to use #RRGGBB hex codes   // TODO delete
    canvasContext.fillStyle = 'rgb(' + Math.floor(this.color[0]) + ', ' + Math.floor(this.color[1]) + ', ' + Math.floor(this.color[2]) + ')';
    canvasContext.fill();   // You can also use stroke() here for a circle outline; to set color, use strokeStyle
    //canvasContext.closePath();
    // apparently stroke() or fill() end the path
}

RenderComponentCircle.prototype.update = function(dt_s, config = null) {
    // Override base GameObject class update(), but do nothing in this func
    // (unless we determine that something does need to be updated, in which case, update this comment :-D)
}

RenderComponentCircle.prototype.setColor = function(r, g, b) {
    this.color[0] = r;
    this.color[1] = g;
    this.color[2] = b;
}


