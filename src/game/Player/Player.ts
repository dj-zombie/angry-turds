/// <reference path="../../lib/phaser/phaser.d.ts"/>


module AngryTurds {

  export class Player extends Phaser.Sprite {

    constructor(game: Phaser.Game, x: number, y: number) {
      super(game, x, y, 'bird');
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.enable(this);
      this.body.gravity.y = 1000;
      game.add.existing(this);
      this.attachEventListeners();      
    }

    attachEventListeners() {
      this.game.input.onDown.add(this.fart, this);
      this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
    }

    fart() {
      this.body.velocity.y = -350;
    }

    die() {
      this.game.state.start('MainMenu');
    }

    update() {
      // if (this.game.input.keyboardisDown(Phaser.Keyboard.SPACEBAR)) {
      //   this.jump();
      // }

      if (this.y > this.game.world.height) {
        this.die();
      }
    }
  }
}