import { Scene } from 'phaser';
// const GRASS = 1;
const BOMB = 6;
const ONE = 7;
const TWO = 2;
const BLANK = 8;
const THREE = 3;
const FOUR = 4;
const FIVE = 5;
const FLAG = 9
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
        layer1!.randomize(0, 0, map.width, map.height, [1, 1, 1, 1, 1,BOMB]).setScale(1.7, 2.5);
        for (let x = 0; x < map.width; x++) {
            for (let y = 0; y < map.height; y++) {

                let tile = layer1?.getTileAt(x, y);
                if (!tile) continue;
                // If the tile is a bomb, continue
                // If not, count up the number of neighbors who are bombs
                // and set the tile to that tile (layer1.setTileAt())
                if (tile.index === BOMB) continue;


                else {
                    let bombCount = 0;
                    let neighborDeltas;
                    if (tile.y % 2 == 0) {
                        neighborDeltas = [[-1, 0], [-1, -1], [0, -1], [1, 0], [0, 1], [-1, 1]];
                    }
                    else {
                        neighborDeltas = [[-1, 0], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1]];
                    }
                    for (let [dx, dy] of neighborDeltas) {
                        let neighborX = tile.x + dx;
                        let neighborY = tile.y + dy;
                        let neighbor = map.getTileAt(neighborX, neighborY);
                        if (neighbor?.index == BOMB) {
                            bombCount = bombCount + 1;
                        }
                    }
                    switch (bombCount) {
                        case 1:
                            layer1!.putTileAt(ONE, tile.x, tile.y);
                            break;
                        case 2:
                            layer1!.putTileAt(TWO, tile.x, tile.y);
                            break;
                        case 3:
                            layer1!.putTileAt(THREE, tile.x, tile.y);
                            break;
                        case 4:
                            layer1!.putTileAt(FOUR, tile.x, tile.y);
                            break;
                        case 5:
                            layer1!.putTileAt(FIVE, tile.x, tile.y);
                            break;
                    }
                    //         var tile = map.getTileAtWorldXY(pointer.worldX, pointer.worldY);
                    //         let neighborDeltas;
                    // if (tile.y % 2 == 0) {
                    //     neighborDeltas = [[-1, 0], [-1, -1], [0, -1], [1, 0], [0, 1], [-1, 1]];
                    // }
                    // else {
                    //     neighborDeltas = [[-1, 0], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1]];
                    // }
                    // for (let [dx, dy] of neighborDeltas) {
                    //     let neighborX = tile.x + dx;
                    //     let neighborY = tile.y + dy;

                }
                // if(tile.index == BOMB)){
                // tile.index == BOMB}
                //  if the tile is a bomb (), continue
                //  else, add up it's neighbors who are bombs
            }
        }
        const layer2 = map.createBlankLayer('layer2', tileset!);
        layer2!.randomize(0, 0, map.width, map.height, [BLANK]).setScale(1.7, 2.5);

        this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            switch (pointer.button) {
                case 0: // left click
                    let tile = map.getTileAtWorldXY(pointer.worldX, pointer.worldY);
                    if (!tile) return;
                    var layer1Tile = layer1!.getTileAtWorldXY(pointer.worldX, pointer.worldY)
                    if(tile.index === BLANK){
                    map.removeTile(tile)
                    }
                    console.log(pointer.worldX, pointer.worldY, tile);
                    if (layer1Tile.index === BOMB) {
                        //defeat
                        this.scene.start("GameOver")
                    }
                    break;
                case 1: // middle click
                    let layer2Tile = layer2!.getTileAtWorldXY(pointer.worldX, pointer.worldY);
                    if (!layer2Tile) return;
                    layer2!.putTileAt(layer2Tile.index === FLAG ? BLANK : FLAG, layer2Tile.x, layer2Tile.y);
                    break;
                case 2: // right click
                
                    break;
            }
            // let placeFlag = layer2?.getTileAt(x,y);
            console.log(pointer.button)
            if(layer2?.findTile(tile=>tile.index=== BLANK)===null){
                //victory
                this.scene.start("MainMenu")
                console.log("You won!");
            }



        }
            , this);
        // this.input.on('pointerup', (pointer: any) =>{
        //     var tile = map.getTileAtWorldXY(pointer.worldX, pointer.worldY);
        //     if (!tile) return;
        //     var layer2Tile = layer1!.getTileAtWorldXY(pointer.worldX, pointer.worldY)
        //     layer2!.putTileAt(FLAG, tile.worldX, tile.worldY);

        // }
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