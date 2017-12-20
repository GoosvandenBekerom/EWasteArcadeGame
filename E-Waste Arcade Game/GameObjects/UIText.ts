module EwasteGameObjects {
    export class UIText extends Phaser.BitmapText {
        game: Phaser.Game;

        constructor(game: Phaser.Game, text: string, x: number, y: number, size: number, font: string = 'font')
        {
            super(game, x, y, font, text, size);
            this.game = game;
        }

        updateUIText(text: string)
        {
            this.text = text;
        }
    }
}