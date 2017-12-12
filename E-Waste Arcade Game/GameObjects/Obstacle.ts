module EwasteGameObjects {
    export class Obstacle extends Phaser.Sprite {
        game: Phaser.Game;

        constructor(game: Phaser.Game, x: number, y: number, obstacleTag: string) {
            super(game, x, y, obstacleTag);

            this.game = game;
            this.anchor.setTo(0.5, 0.5);

            this.game.physics.enable(this, Phaser.Physics.ARCADE);
        }
    }
}