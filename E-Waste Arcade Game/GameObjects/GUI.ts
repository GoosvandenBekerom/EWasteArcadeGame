module EwasteGameObjects {
    export class GUI extends Phaser.Group{
        game: Phaser.Game;
        bmpText: EwasteGameObjects.UIText;
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
                this.isDrawn = true;
            }
            else
            {
               this.bmpText.updateUIText(Math.round(this.player.x/10).toString());
            }
        }
    }
}0