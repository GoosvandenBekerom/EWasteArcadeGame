module EwasteGameObjects {
    export class GUI extends Phaser.Group{
        game: Phaser.Game;
        bmpText: EwasteGameObjects.UIText;
        isDrawn: boolean;
        player: EwasteGameObjects.Player;
        powerBar: EwasteGameObjects.PowerBar;

        
        constructor(game: Phaser.Game, player: EwasteGameObjects.Player) {
            super(game);
            this.game = game;
            this.player = player;

            this.bmpText = new EwasteGameObjects.UIText(this.game, "0", 20, 10, 48);
        }

        update()
        {
            if (!this.isDrawn)
            {
                this.bmpText.fixedToCamera = true;
                this.game.add.existing(this.bmpText);
                this.powerBar = new EwasteGameObjects.PowerBar(this.game, 20, 80, this.player.state);
                this.isDrawn = true;
            }


        }

        updateScore(score: number)
        {
            this.bmpText.updateUIText(score.toString());
        }

        PowerBarGetPower() {
            this.powerBar.getPower();
        }

        PowerBarlosePower(): boolean
        {
            return this.powerBar.losePower() <= 0;
        }
    }
}