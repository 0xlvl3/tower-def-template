/**
 * import due to use within classes themselves
 */
import { c, mouse, enemies, buildings } from "./canvas.js";
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

  /**
   * update is what we will place in our animate loop hence why we pass draw here
   */
  update() {
    this.draw();

    //variable for our waypoints
    const waypoint = waypoints[this.waypointIndex];
    //x and y distance for our Math.atan2 method
    const yDistance = waypoint.y - this.center.y;
    const xDistance = waypoint.x - this.center.x;

    //Math.atan2 returns our angle in radians - formula always needs y before x
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

/**
 * Projectile will be the projectile fired from our tower
 */
export class Projectile {
  constructor({ position = { x: 0, y: 0 }, enemy }) {
    //original position
    this.position = position;

    //velocity will be used for the speed of the projectile
    this.velocity = {
      x: 0,
      y: 0,
    };

    //enemy will be used as our target
    this.enemy = enemy;

    //radius for our projectile it's size
    this.radius = 10;
  }

  /**
   * draw will be how our projectile is drawn
   */
  draw() {
    //all circles need to use beginPath
    c.beginPath();
    //followed by arc, arc(x, y, radius, startAngle, endAngle)
    //we use Math.PI * 2 here to get a perfect circle
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);

    //color our projectile
    c.fillStyle = "orange";
    c.fill();
  }

  /**
   * update will be passed into our animate loop
   */
  update() {
    this.draw();

    //editing our values
    //atan2 takes x and y distance as argus
    const angle = Math.atan2(
      //we use this.enemy.center and this.position to get the angle between the two which we pass within cos and sin methods
      this.enemy.center.y - this.position.y,
      this.enemy.center.x - this.position.x
    );

    const POWER = 5; //power here represents the speed of the projectile

    //how we figure out the angle that the projectile will go towards enemy, power will indicate how quick it travels
    this.velocity.x = Math.cos(angle) * POWER;
    this.velocity.y = Math.sin(angle) * POWER;

    //push projectile towards angle we just stated above, which is towards enemy
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

/**
 * Building will be our towers
 */
export class Building {
  constructor({ position = { x: 0, y: 0 } }) {
    //position will be used
    this.position = position;

    //using width and height we center the projectile in our buildings
    this.width = 64 * 2; // *2 here because our towers take up two spaces on our width 64*64
    this.height = 64;

    //center the projectile
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };

    //will be the radius around our building that if an enemy is in our radius we will shoot a projectile
    this.radius = 250;

    //used for targeting our enemy
    this.target;

    // will be used to produce a projectile
    this.frames = 0;

    //used to push our projectiles, also for collision detection
    this.projectiles = [];
  }

  /**
   * will draw our towers and radius on map
   */
  draw() {
    //indicates our buildings
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //indicates our radius currently, if enemy comes in contact projectile will fire
    c.beginPath();
    c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "rgba(0, 0, 255, 0.2)";
    c.fill();
  }

  /**
   * Will be used within our animate loop
   */
  update() {
    //draw out our buildings every update
    this.draw();

    if (this.frames % 100 === 0 && this.target) {
      this.projectiles.push(
        new Projectile({
          //position the projectile in center
          position: {
            x: this.center.x,
            y: this.center.y,
          },
          enemy: this.target, //target first enemy for now
        })
      );
    }

    this.frames++;
  }
}
