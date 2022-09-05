class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' })
  }

  preload() {
    this.load.image('start', 'https://codecademy-content.s3.amazonaws.com/courses/learn-phaser/BOB/Start+screen.png');
  }

  create() {
    const screen = this.add.image(0, 0, 'start').setOrigin(0);
    
    // on keypress any, transition to GameScene
    this.input.keyboard.on('keydown', () => {
      this.scene.stop('StartScene');
      this.scene.start('GameScene');
    });
  }
}

