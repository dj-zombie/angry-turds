/// <reference path="../../lib/phaser/phaser.d.ts"/>


module AngryTurds {

  export class Boot extends Phaser.State {

    preload() {
      this.load.image('preloadBar', 'assets/img/loader.png');
    }

    create() {
      this.input.maxPointers = 1;
      this.stage.disableVisibilityChange = true;

      if (this.game.device.desktop) {
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        // this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // this.scale.forceOrientation(true, false);
        // this.scale.maxHeight = 800;
      }
      else {
        // this.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        this.scale.minWidth = 260;
        this.scale.minHeight = 480;
        this.scale.maxWidth = 768;
        this.scale.maxHeight = 1024;
        this.scale.forceLandscape = true;
        // this.scale.pageAlignVertically = true;
        // this.scale.setScreenSize(true);
      }

       this.game.state.start('Preloader', true, false);
     }
   } 
 }
