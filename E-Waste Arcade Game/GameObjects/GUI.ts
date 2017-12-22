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
				this.powerBar = new EwasteGameObjects.PowerBar(this.game, (this.player.position.x - 20), this.player.position.y - 50, this.player.state);
                this.isDrawn = true;
            }

            this.powerBar.updatePosition(this.player.position.x, this.player.position.y);
        }

        updateScore(score: number)
        {
            this.bmpText.updateUIText(score.toString());
        }
    }
}