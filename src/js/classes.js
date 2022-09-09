/**
 * import due to use within classes themselves
 */
import { c, mouse } from "./canvas.js";
import { waypoints } from "./waypoints.js";

/**
 * PlacementTile class will be the 64x64 plots we can place our towers on.
 * -----
 */
export class PlacementTile {
  constructor({ position = { x: 0, y: 0 } }) {
    //position x and y = position on map tile will be placed
    this.position = position;

    //size = 64 so we can declare 64x64 in our fillRect
    this.size = 64;

    //color = color not occupied
    this.color = "rgba(255, 255, 255, 0.2)";

    // occupied = boolean that will change if it is occupied or not
    this.occupied = false;
  }

  //draw out our available spots
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  /**
   * update will continually run as we pass it through our animate loop
   * ---
   * to update we also pass this.draw, this will highlight a placement tile if it is not occupied to place a tower
   * ---
   * @param {coords of mouse} mouse
   */
  update(mouse) {
    this.draw();

    // if (
    //   //creating a 64 x 64 with if statement
    //   mouse.x > this.position.x &&
    //   mouse.x < this.position.x + this.size &&
    //   mouse.y > this.position.y &&
    //   mouse.y < this.position.y + this.size
    // ) {
    //   this.color = "rgba(144, 249, 144, 0.5)"; //available placement tile
    // } else {
    //   this.color = "rgba(255, 255, 255, 0.2)";
    // }
  }
}

/**
 *
 * Enemy class will be the enemies that you place in your Tower Defense, this class can be used as a parent class
 * -----
 */
export class Enemy {
  constructor({ position = { x: 0, y: 0 } }) {
    //position x and y = will be used to spawn enemies - this will be on waypoint[0]
    this.position = position;

    //height and width = here will be used with position x and y to create a center for our enemies
    this.width = 100;
    this.height = 100;

    //reference to our waypoints js
    this.waypointIndex = 0;

    //getting a center of our circles, used for collision and sitting central on the pathway (waypoints)
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };

    //creating a radius for our circles
    this.radius = 50;

    //starting health
    this.health = 100;
  }

  //Where we draw our the enemies
  draw() {
    //default non-sprite color is red
    c.fillStyle = "red";

    //make the enemies squares
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //Make enemies circles
    c.beginPath();
    c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    c.fill();

    //red health bar - placed before green so it is layered under our green bar
    c.fillStyle = "red";
    //position.y - 15 because we want the health bar above our enemies head on the y axis, the height === 10, as we don't want it to come down onto our enemy sprite
    c.fillRect(this.position.x, this.position.y - 15, this.width, 10);

    //green health bar - layered on top of red bar
    c.fillStyle = "green";
    //this.width * this.health / 100 === 100, which is what we will substract from to give the illuision of a health bar going down.
    c.fillRect(
      this.position.x,
      this.position.y - 15,
      (this.width * this.health) / 100,
      10
    );
  }
  update() {
    this.draw();

    //variable for our waypoints
    const waypoint = waypoints[this.waypointIndex];
    //x and y distance for our Math.atan2 method
    const yDistance = waypoint.y - this.center.y;
    const xDistance = waypoint.x - this.center.x;
    //this formula always needs y before x
    const angle = Math.atan2(yDistance, xDistance);

    // this.position.x += 1;
    //cos(r) === x
    //sin(r) === y
    this.position.x += Math.cos(angle);
    this.position.y += Math.sin(angle);

    //code for centering our enemys on our waypoint line
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };

    //how we move from waypoint to waypoint, through our waypoints array
    if (
      Math.round(this.center.x) === waypoint.x &&
      Math.round(this.center.y) === waypoint.y &&
      this.waypointIndex < waypoints.length - 1
    ) {
      this.waypointIndex++;
    }
  }
}
