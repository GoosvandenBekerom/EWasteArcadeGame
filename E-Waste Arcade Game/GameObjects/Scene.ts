module EwasteGameObjects {
    export class Scene extends Phaser.TileSprite {
        game: Phaser.Game;
        nextFrame: Phaser.Sprite;

        constructor(game: Phaser.Game, x: number, y: number, widthBounds: number) {
            super(game, x, y, widthBounds, game.height,"scene", 0);
        }
    }
}