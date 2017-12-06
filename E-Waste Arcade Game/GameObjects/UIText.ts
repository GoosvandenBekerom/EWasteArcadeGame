module EwasteGameObjects {
    export class UIText extends Phaser.BitmapText {
        game: Phaser.Game;

        constructor(game: Phaser.Game, text: string, x: number, y: number)
        {
            super(game, x, y, 'desyrel', text, 48);
            this.game = game;
        }

        updateUIText(text: string)
        {
            this.text = text;
        }
    }
}