module EwasteGameObjects {
    export class Pickup extends Phaser.Sprite {
        game: Phaser.Game;
        wasteType: WasteType;

        constructor(game: Phaser.Game, type: WasteType, x: number, y: number, pickupTag: string) {
            super(game, x, y, pickupTag);

            this.game = game;
            this.wasteType = type;
        }
    }
}