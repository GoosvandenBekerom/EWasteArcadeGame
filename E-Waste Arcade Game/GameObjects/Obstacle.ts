module EwasteGameObjects {
    export class Obstacle extends Phaser.Sprite {
        game: Phaser.Game;

        constructor(game: Phaser.Game, x: number, y: number, obstacleTag: string) {
            super(game, x, y, obstacleTag);

            this.game = game;
            this.anchor.setTo(.5, 0);

            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.setSize(220, 90, 33, 60);
        }
    }
}