import { Scene } from 'phaser';

export class Game extends Scene {
    platforms: Phaser.Physics.Arcade.StaticGroup;
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    stars: any;
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.image('hexagon', 'assets/hexagon.png')
        this.load.image('tiles', 'assets/tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/hex.json');
    }


    create() {
        //         this.cursors = this.input.keyboard!.createCursorKeys();

        this.add.image(400, 300, 'ground').setScale(3, 20);

        var map = this.add.tilemap('map');

        var tileset = map.addTilesetImage('tileset', 'tiles');

        // map.createLayer('Calque 1', tileset!);

        const layer1 = map.createBlankLayer('layer1', tileset!);
        layer1!.randomize(0, 0, map.width, map.height, [1, 1, 1, 1, 1, 6]).setScale(1.7, 2.5);
        const layer2 = map.createBlankLayer('layer2', tileset!);
        layer2!.randomize(0, 0, map.width, map.height, [2]).setScale(1.7, 2.5);

        this.input.on('pointerup', function (pointer: any) {
            var tile = map.getTileAtWorldXY(pointer.worldX, pointer.worldY);
            if (!tile) return;
            // map.removeTileAtWorldXY
            map.removeTile(tile)
            console.log(pointer.worldX, pointer.worldY, tile);
            let neighborDeltas;
            if (tile.y % 2 == 0){
                neighborDeltas = [[-1,0], [-1,-1], [0,-1], [1,0], [0,1], [-1,1]];
            }
            else{
                neighborDeltas = [[-1,0], [0,-1], [1,-1], [1,0], [1,1], [0,1]];
            }
            for (let [dx,dy] of neighborDeltas){
                let neighborX = tile.x + dx;
                let neighborY = tile.y + dy;
                map.removeTileAt(neighborX, neighborY)
             }
            
        }
            , this);
        // for(x-range;x+range;x++); for(y-range;y+range;y++);
         
        // layer

        //         this.platforms = this.physics.add.staticGroup();

        //         this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //         this.platforms.create(600, 400, 'ground');
        //         this.platforms.create(50, 250, 'ground');
        //         this.platforms.create(750, 220, 'ground');



        //         this.player = this.physics.add.sprite(100, 450, 'dude').setScale(0.05).refreshBody();

        //         this.player.setBounce(0.2);
        //         this.player.setCollideWorldBounds(true);

        //         this.physics.add.collider(this.player, this.platforms);
        //         this.stars = this.physics.add.group({
        //             key: 'star',
        //             repeat: 11,
        //             setXY: {
        //             X: 12,
        //             Y:0,
        //             stepX:70,
        //         }
        //     });

        //     this.physics.add.collider(this.stars.getChildren(),this.platforms)
        //     this.physics.add.collider(this.stars.getChildren(),this.player)
        //     this.stars.children.iterate(function (star: Phaser.GameObjects.GameObject) {

        //       star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        //       return null;

        //     });

        //         this.anims.create({
        //             key: 'left',
        //             frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        //             frameRate: 10,
        //             repeat: -1
        //         });

        //         this.anims.create({
        //             key: 'turn',
        //             frames: [{ key: 'dude', frame: 4 }],
        //             frameRate: 20
        //         });

        //         this.anims.create({
        //             key: 'right',
        //             frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        //             frameRate: 10,
        //             repeat: -1
        //         });

    }

    update() {
        //         if (this.cursors.left.isDown) {
        //             this.player.setVelocityX(-160);
        //             this.player.anims.play('left', true);
        //         }
        //         else if (this.cursors.right.isDown) {
        //             this.player.setVelocityX(160);
        //             this.player.anims.play('right', true);
        //         }
        //         else {
        //             this.player.setVelocityX(0);
        //             this.player.anims.play('turn');
        //         }

        //         if (this.cursors.up.isDown && this.player.body.touching.down) {
        //             this.player.setVelocityY(-330);
        //         }
    }
}


// create a grid and place bobms and numbers on places 
// after use the grass to cover the grid and numbers 
// have on click move or delete grass
//if a bomb is clicked then game over