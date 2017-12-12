module EwasteGameObjects {
    export class Bin extends Phaser.Sprite{
        game: Phaser.Game;
        collectWasteTypeState: WasteType;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, "bin3");
            this.game = game;
            this.collectWasteTypeState = WasteType.WASTE_1
        }

        changeCollectorBin() {
            switch (this.collectWasteTypeState) {
                case WasteType.WASTE_1: {
                    this.collectWasteTypeState = WasteType.WASTE_2;
                    this.loadTexture("bin3");
                    break;
                }
                case WasteType.WASTE_2: {
                    this.collectWasteTypeState = WasteType.WASTE_3;
                    this.loadTexture("bin1");
                    break;
                }
                case WasteType.WASTE_3: {
                    this.collectWasteTypeState = WasteType.WASTE_1;
                    this.loadTexture("bin2");
                    break;
                }
            }
        }
    }
}