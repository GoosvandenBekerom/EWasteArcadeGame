module EwasteGameObjects {
    export class GUI extends Phaser.Group{
        game: Phaser.Game;
        bmpText: EwasteGameObjects.UIText;
        heart1: EwasteGameObjects.Heart;
        heart2: EwasteGameObjects.Heart;
        heart3: EwasteGameObjects.Heart;
        isDrawn: boolean;
        player: EwasteGameObjects.Player;
        
        
        constructor(game: Phaser.Game, player: EwasteGameObjects.Player) {
            super(game);
            this.game = game;
            this.player = player;
        }

        update()
        {
            if (!this.isDrawn)
            {
                this.bmpText = new EwasteGameObjects.UIText(this.game, "0", 20, 10, 48);
                this.bmpText.fixedToCamera = true;
                this.game.add.existing(this.bmpText);

                this.heart1 = new EwasteGameObjects.Heart(this.game, 830, 10);
                this.heart1.fixedToCamera = true;
                this.game.add.existing(this.heart1);
                this.heart2 = new EwasteGameObjects.Heart(this.game, 890, 10);
                this.heart2.fixedToCamera = true;
                this.game.add.existing(this.heart2);
                this.heart3 = new EwasteGameObjects.Heart(this.game, 950, 10);
                this.heart3.fixedToCamera = true;
                this.game.add.existing(this.heart3);
                this.isDrawn = true;
            }
        }

        updateScore(score: number)
        {
            this.bmpText.updateUIText(score.toString());
        }

        updateLives(nrOflives: number)
        {
            if (nrOflives == 2)
            {
                this.heart3.destroy();
            }
            else if (nrOflives == 1)
            {
                this.heart2.destroy();
            }
            else
            {
                this.heart1.destroy();
            }
        }
    }
}