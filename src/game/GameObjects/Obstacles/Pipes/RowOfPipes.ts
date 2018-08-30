/// <reference path="../../../../lib/phaser/phaser.d.ts"/>


module AngryTurds {

  export class RowOfPipes extends Obstacle {

    constructor(game: Phaser.Game, x: number, y: number) {
      var hole = Math.floor(Math.random() * 5) + 1;

      for (var i = 0; i < 8; i++) {
        if (i != hole && i != hole +1) {
          super(game, 530, i * 60 + 50);
          console.log('super! x: ' + x + ' i: ' + i);
        }
      }

      console.log('new super');
      // super(game, 530, 284);
      
      
    }



    update() {
    }
  }
}