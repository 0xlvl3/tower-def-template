/**
 *
 * @param {int} min
 * @param {int} max
 * @returns will return a random int between a min and a max value
 */
export function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 *
 * @param {array} colors
 * @returns will return a random color from an array.
 */
export function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 *
 * @param {coords} x1
 * @param {coords} y1
 * @param {coords} x2
 * @param {coords} y2
 * @returns takes in the coords of one object and another then gives the distance between the two.
 */
export function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
