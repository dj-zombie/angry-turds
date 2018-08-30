/// <reference path="../../lib/phaser/phaser.d.ts"/>


module AngryTurds {

  export class Preloader extends Phaser.State {

    preloadBar: Phaser.Sprite;

    preload() {
      //  Set-up our preloader sprite
      this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
      this.load.setPreloadSprite(this.preloadBar);

      //  Load our actual games assets
      this.load.image('titlepage', 'assets/img/titlepage.jpg');
      this.load.image('logo', 'assets/img/logo.png');
      this.load.audio('music', 'assets/img/title.mp3', true);
      this.load.spritesheet('simon', 'assets/img/simon.png', 58, 96, 5);
      this.load.image('level1', 'assets/img/level1.png');

      this.load.image('bird', 'assets/img/bird.png'); 
      this.load.image('pipe', 'assets/img/pipe.png'); 
    }

    create() {
      var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
      tween.onComplete.add(this.startMainMenu, this);
    }

    startMainMenu() {
      this.game.state.start('Level1', true, false);
    }
  }
}
