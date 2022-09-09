/**
 * Check files for description of why these are imported
 */
import { waypoints } from "./waypoints.js";
import { placementTiles } from "./placementTiles.js";
import { PlacementTile, Enemy } from "./classes.js";

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

//this
const placementTilesData2D = [];
/*
split that map into rows of 20 all up 12 rows

for (let i = 0; i < placementTitlesData.length; i += 20) {
  
     we slice i, i + 20 to get our rows

  placementTilesData2D.push(placementTitlesData.slice(i, i + 20));
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
