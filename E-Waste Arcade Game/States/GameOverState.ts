module EWasteGameStates {
    export class GameOverState extends Phaser.State {
        game: Phaser.Game;
        gameOverSprite: Phaser.Sprite;
        highscoreText: EwasteGameObjects.UIText;

        create() {
            this.gameOverSprite = this.add.sprite(0, 0, "gameover", 0);
            this.gameOverSprite.scale.setTo(
                this.game.width / this.gameOverSprite.width,
                this.game.height / this.gameOverSprite.height);

            this.input.onDown.add(() => {
                this.game.state.start("TitleScreenState", true);
            });

            var tempstr = EWasteUtils.CookieControl.getCookie("highscore").replace(/,/g, "\n")
            this.game.add.existing(new EwasteGameObjects.UIText(this.game, "1:\n2:\n3:\n4:\n5:\n6:\n7:\n8:\n9:\n10:\n", 0, 0, 32));
            this.highscoreText = new EwasteGameObjects.UIText(this.game, tempstr , 50, 0, 32);
            this.game.add.existing(this.highscoreText);
        }
    }
}