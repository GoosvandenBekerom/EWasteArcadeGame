module EwasteGameObjects {
    export class Heart extends Phaser.Sprite {
        game: Phaser.Game;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, "heart");
            this.game = game;
        }
    }
}