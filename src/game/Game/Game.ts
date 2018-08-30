/// <reference path="../../lib/phaser/phaser.d.ts"/>


module AngryTurds {

  export class Game extends Phaser.Game {

    constructor() {      
      super(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'angry-turds', null);

      this.state.add('Boot', Boot, false);
      this.state.add('Preloader', Preloader, false);
      this.state.add('MainMenu', MainMenu, false);
      this.state.add('Level1', Level1, false);

      this.state.start('Boot');
    }
  }
} 
