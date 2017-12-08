module EwasteGameObjects {
    export class Platform extends Phaser.TileSprite {
        game: Phaser.Game;

        // tODO: consider renaming to Platform
        constructor(game: Phaser.Game, x: number, y: number, width: number, height: number, obstacleTag: string) {
            super(game, x, y, width, height, obstacleTag);

            this.game = game;
            this.anchor.set(0, 0);
        }
    }
}