module EwasteGameObjects {
    export class Pickup extends Phaser.Sprite {
        game: Phaser.Game;


        constructor(game: Phaser.Game) {
            super(game, 0, 0);
            this.game = game;
        }
    }
}