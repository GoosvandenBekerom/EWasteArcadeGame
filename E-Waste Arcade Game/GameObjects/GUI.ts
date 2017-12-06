module EwasteGameObjects {
    export class GUI extends Phaser.Group{
        game: Phaser.Game;
        bmpText: Phaser.BitmapText;

        constructor(game: Phaser.Game) {
            super(game)
            this.game = game;
        }

        Create()
        {
            this.bmpText = this.game.add.bitmapText(200, 100, 'desyrel', 'Phaser & Pixi\nrocking!', 64);
        }

        update()
        {
            //this.bmpText.text = Math.round(this.game.time.now).toString();
        }
    }
}0