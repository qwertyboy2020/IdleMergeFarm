const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#88c070',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let crops = ['carrot', 'corn', 'tomato'];
let grid = [];
let coinText;
let coins = 0;

function preload() {
    this.load.image('carrot', 'assets/carrot.png');
    this.load.image('corn', 'assets/corn.png');
    this.load.image('tile', 'assets/tile.png');
}

function create() {
    const gridSize = 4;
    const tileSize = 80;
    const spacing = 10;
    let offsetX = (this.game.config.width - (gridSize * (tileSize + spacing))) / 2;
    let offsetY = 100;

    coinText = this.add.text(16, 70, 'Coins: 0', { fontSize: '24px', fill: '#000' });

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            let x = offsetX + col * (tileSize + spacing);
            let y = offsetY + row * (tileSize + spacing);
            let tile = this.add.image(x, y, 'tile').setInteractive();
            tile.setData('crop', null);
            grid.push(tile);
            tile.on('pointerdown', () => {
                if (!tile.getData('crop')) {
                    let crop = this.add.image(x, y, 'carrot').setScale(0.8);
                    tile.setData('crop', crop);
                }
            });
        }
    }

    this.time.addEvent({
        delay: 1000,
        loop: true,
        callback: () => {
            coins += 1;
            coinText.setText('Coins: ' + coins);
        }
    });
}

function update() {}
