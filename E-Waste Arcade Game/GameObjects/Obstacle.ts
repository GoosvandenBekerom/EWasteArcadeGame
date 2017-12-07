module EwasteGameObjects {
    export class Obstacle extends Phaser.Sprite {
        game: Phaser.Game;

        constructor(game: Phaser.Game, x: number, y: number, obstacleTag: string) {
            super(game, x, y, obstacleTag);

            this.game = game;
        }
    }
}