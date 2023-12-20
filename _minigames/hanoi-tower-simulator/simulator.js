// Description: Core functions for the game
// Author: Minkeun Park
// Created: 2023/12/20

class Simulator {
  constructor(n) {
    this.n = n;
    this.moves = [];
    this.currentStep = -1;
    this.eof = false;
  }
  /*
    * @param {number} n - number of discs
    * @param {number} from - index of the tower to move discs from
    * @param {number} to - index of the tower to move discs to
    * @param {number} spare - index of the tower to use as a spare
    * @return void
  */
  moveDiscs(discs, from, to, spare) {
    if (discs == 1) {
      this.moves.push([from, to]);
      return;
    }
    this.moveDiscs(discs - 1, from, spare, to);
    this.moveDiscs(1, from, to, spare);
    this.moveDiscs(discs - 1, spare, to, from);
  }
  forEachMoves(callback) {
    this.moves.forEach((move, i) => callback(move, i));
  }
  /*
    * @return minimum moves
  */
  minimumMoves() {
    return this.moves.length;
  }
  oneStepForward() {
    if (this.currentStep == this.moves.length - 1) {
      this.eof = true;
      console.log("eof");
    } else {
      this.currentStep++;
    }
  }
  /*
    * @return [from, to] (1-index).
    */
  moveInfo() {
    return this.moves[this.currentStep];
  }
}
