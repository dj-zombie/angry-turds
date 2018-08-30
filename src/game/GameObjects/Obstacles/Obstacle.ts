/// <reference path="../../../lib/phaser/phaser.d.ts"/>


module AngryTurds {

  export class Obstacle extends Phaser.Sprite {

    constructor(game: Phaser.Game, x: number, y: number) {
      super(game, x, y, 'pipe');
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.enable(this);
      this.body.velocity.x = -200;
      // kill when out of bounds
      this.checkWorldBounds = true;
      this.outOfBoundsKill = true;
      game.add.existing(this);
    }
    
    update() {
      
    }
  }
}