
var nodeCount = 20;
var nodeArray = [];
var attractor;

function setup() {
  createCanvas(400, 400);
  background(77);




  // building an array full of Node objects
  for (var i = 0; i < nodeCount; i++) {
    nodeArray[i] = new Node(random(width), random(height));
    // nodeArray[i].velocity.x = random(-3, 3);
    // nodeArray[i].velocity.y = random(-3, 3);
    nodeArray[i].damping = 0.1;  // resetting the damping value (it changes in update)
  }

  attractor = new Attractor(width/2, height/2);

}

function draw() {
  background(77);

  attractor.location.set(mouseX, mouseY)

  for (var i = 0; i < nodeArray.length; i++) {

    if (mouseIsPressed) {
      attractor.attractNode(nodeArray[i]);
    }



    nodeArray[i].displayNode();
    nodeArray[i].update();
  }
}




//ATTRACTOR CLASS
function Attractor(_locX, _locY) {
  this.location = new p5.Vector(_locX, _locY);
  this.radius = 200;

  this.attractNode = function(node) {
    var distanceVector = this.location.sub(node.location);
    var distanceFromAttractor = mag(distanceVector.x, distanceVector.y);

    if (distanceFromAttractor > 0 && distanceFromAttractor < this.radius) {
      var s = distanceFromAttractor/this.radius;  //convert distance from 0 - radius to 0 - 1
      var f = 1 / pow(s, 0.5) - 1;  // magical equation.  (Generative Design pg. 396)
      f = f / this.radius; // prevent undesirable strong effects

      // exert the forces of the nodes velocity vector
      node.velocity.x += distanceVector.x * f;
      node.velocity.y += distanceVector.y * f;
    }
  }
}



// NODE CLASS
function Node(_locX, _locY) {

  this.location = new p5.Vector(_locX, _locY);

  this.velocity = new p5.Vector(0, 0);
  this.size = 10;
  this.minBoundary = new p5.Vector(5, 5);  // setting the boundaries of its location
  this.maxBoundary = new p5.Vector(width - 5, height - 5);
  var damping = 0.1;  //  Damping the motion.  The higher the number, the faster node stops moving

  this.update = function() {
    this.location.add(this.velocity);  //  adding velocity to location first

    if (this.location.x < this.minBoundary.x) {
      this.location.x = this.minBoundary.x - (this.location.x - this.minBoundary.x);
      this.velocity.x = -this.velocity.x;
    }
    if (this.location.x > this.maxBoundary.x) {
      this.location.x = this.maxBoundary.x - (this.location.x - this.maxBoundary.x);
      this.velocity.x = -this.velocity.x;
    }

    if (this.location.y < this.minBoundary.y) {
      this.location.y = this.minBoundary.y - (this.location.y - this.minBoundary.y);
      this.velocity.y = -this.velocity.y;
    }
    if (this.location.y > this.maxBoundary.y) {
      this.location.y = this.maxBoundary.y - (this.location.y - this.maxBoundary.y);
      this.velocity.y = -this.velocity.y;
    }

    // applying the damping factor
    this.velocity.x *= (1-damping)
    this.velocity.y *= (1-damping)


  }

  // displaying the node
  this.displayNode = function() {
    noStroke();
    fill(255, 100);
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }
}
