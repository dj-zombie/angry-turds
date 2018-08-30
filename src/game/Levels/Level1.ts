/// <reference path="../../lib/phaser/phaser.d.ts"/>


module AngryTurds {

  export class Level1 extends Phaser.State {

    preload() {
      this.stage.backgroundColor = '#71c5cf';
    }

    // background: Phaser.Sprite;
    // music: Phaser.Sound;
    player: AngryTurds.Player;
    obstacle: AngryTurds.Obstacle;
    row: AngryTurds.RowOfPipes;

    create() {
      // this.background = this.add.sprite(0, 0, 'level1');

      // this.music = this.add.audio('music', 1, false);
      // this.music.play();

      this.player = new Player(this.game, 130, 284);
      // this.obstacle = new Obstacle(this.game, 130, 284);
      this.row = new RowOfPipes(this.game, 530, 284);
    }
  }
}
