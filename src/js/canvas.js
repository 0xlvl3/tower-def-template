/**
 * Check files for description of why these are imported
 */
import { waypoints } from "./waypoints.js";
import { placementTilesData } from "./placementTiles.js";
import { PlacementTile, Enemy, Projectile, Building } from "./classes.js";

/**
 * Bringing in our canvas from our index, we place it in a one letter variable for usability
 */
export const canvas = document.querySelector("canvas");
export const c = canvas.getContext("2d");

/**
 * Mouse object used for game control later
 */
export const mouse = {
  x: undefined,
  y: undefined,
};

/**
 * SETTINGS FOR MAP
 * ---------------
 * Tile settings within Tiled will be 20 width and 12 height, giving us 1280px x 768px this is using 64 x 64 squares
 * We give the base canvas a white background that covers the span of the canvas width and height
 * ---------------
 */
canvas.width = 1280;
canvas.height = 768;
c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

/**
 * HOW TO IMPORT A MAP IMAGE INTO CANVAS
 * can only be done using the following steps
 * -----------------------------------------
 *  const image = new Image();
 *  image.onload = () = {
 *  c.drawImage(image, width, height)
 *  }
 *  image.src = 'img/image.png'
 */
const map = new Image();
map.onload = () => {
  // c.drawImage(image, width, height) - to start we can use this but later we need to move to placing our image in our animate loop so it updates with the other objects
  //animate() loop will be processed with our map.
};
map.src = ""; //place map src here

const placementTilesData2D = [];
const placementTiles = [];
/*
split that map into rows of 20 all up 12 rows

for (let i = 0; i < placementTitlesData.length; i += 20) {
  
     we slice i, i + 20 to get our rows

  placementTilesData2D.push(placementTitlesData.slice(i, i + 20));
}
*/

/**
 * We forEach through our new placementTiles data, finding our row and y index and then we forEach our row for placement and x index, with the condition of if placement === 14, we want a placement tile space added to our map.
 * This is possible due to our placementTiles.js array.
 
placementTilesData2D.forEach((row, y) => {
  row.forEach((placement, x) => {
    if (placement === 14) {
    
      //add building placement tile here
      placementTiles.push(
        new PlacementTile({
          position: {
            x: x * 64,
            y: y * 64,
          },
        })
      );
    }
  });
});

*/

//used for spawning our enimes
export const enemies = [];
/**
 * Using the function spawnEnemies we use a forLoop that will spawn a certain amount of enemies TBW----------------------
 
 function spawnEnemies() {
  for (let i = 1; i < 10; i++) {
  
  //The xOffset here is used to delay the time of spawn between enemies
    const xOffset = i * 200;

    enemies.push(
      new Enemy({
        position: {
          x: waypoints[0].x - xOffset, //minus the xOffset on our x axis to delay enemies
          y: waypoints[0].y,
        },
      })
    );
  }
}
 spawnEnemies();
 */

//buildings array will be used to push new Building within our building array
export const buildings = [];

//activeTile will act as a boolean, to decide if a tile has a building on it or not.
let activeTile = undefined;

/**
 * Animate loop will be recursive, so that it gives the animation to our game
 * ------------
 * 
 * 

function animate() {

    //the method that animates our game, through recursive
    requestAnimationFrame(animate);
  
    //drawing our map into our canvas
    c.drawImage(map, 0, 0);
  
    //where we call our enemy update
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      enemy.update();
    }
  
    //where we call our tile update
    placementTiles.forEach((tile) => {
      tile.update(mouse);
    });
  
    buildings.forEach((building) => {
      building.update();
      //target is set to null first this will be used with collision detection with our buildings
      building.target = null;
  
      //how we detect collision between enemy and buildings
      const validEnemies = enemies.filter((enemy) => {
        //same as collision between our projectile and enemy
        const xDifference = enemy.center.x - building.center.x;
        const yDifference = enemy.center.y - building.center.y;
        const distance = Math.hypot(xDifference, yDifference);
  
        return distance < enemy.radius + building.radius;
      });
  
      building.target = validEnemies[0];
  
      //we replaced our forEach loop with a for loop so our projectile rendered correctly
      // building.projectiles.forEach((projectile, i) -- originally
      for (let i = building.projectiles.length - 1; i >= 0; i--) {
        const projectile = building.projectiles[i];
  
        projectile.update();
  
        //how to detect for enemy collision
        //this is how you get the distance between projectile and enemy
        const xDifference = projectile.enemy.center.x - projectile.position.x;
        const yDifference = projectile.enemy.center.y - projectile.position.y;
        const distance = Math.hypot(xDifference, yDifference);
  
        //this is when our projectile hits an enemy, once hit it removes projectile
        if (distance < projectile.enemy.radius + projectile.radius) {
          //how we get enemy health
          // projectile.enemy.health;
          //enemy hit takes -20 to health
          projectile.enemy.health -= 20;
          //if enemy health is gone
          if (projectile.enemy.health <= 0) {
            const enemyIndex = enemies.findIndex((enemy) => {
              return projectile.enemy === enemy;
            });
  
            //random enemies will not be removed because of this if
            if (enemyIndex > -1) {
              enemies.splice(enemyIndex, 1);
            }
          }
  
          building.projectiles.splice(i, 1);
        }
      }
    });
  }

 */

/**
 * Using our mouse x and y we created above to create our towers
 */
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  //   activeTile = null;
  //   for (let i = 0; i < placementTiles.length; i++) {
  //     const tile = placementTiles[i];
  //     if (
  //       mouse.x > tile.position.x &&
  //       mouse.x < tile.position.x + tile.size &&
  //       mouse.y > tile.position.y &&
  //       mouse.y < tile.position.y + tile.size
  //     ) {
  //       activeTile = tile;
  //       break;
  //     }
  //   }
});
