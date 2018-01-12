module EwasteGameObjects {
    export class UIText extends Phaser.BitmapText {
        game: Phaser.Game;

        constructor(game: Phaser.Game, text: string, x: number, y: number, size: number, align: string = 'left', font: string = 'font', width: number = 0)
        {
            super(game, x, y, font, text, size, align);
            this.game = game;

            if (width) {
                this.width = width;
            }
        }

        updateUIText(text: string)
        {
            this.text = text;
        }
    }
}