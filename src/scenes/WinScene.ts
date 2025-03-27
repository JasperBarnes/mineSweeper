import { Scene } from 'phaser';

export class WinScene extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameover_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('WinScene');
    }
    preload() {


    }

    create ()
    {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0xFF0000);

        this.background = this.add.image(400, 300, 'explosion').setScale(0.5);
        this.background.setAlpha(0.5);
        // this.add.image(explosion)
        this.gameover_text = this.add.text(400, 150, 'L Bozo', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.gameover_text.setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
