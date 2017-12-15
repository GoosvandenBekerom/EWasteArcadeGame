module EWasteGameStates {
    export class GameOverState extends Phaser.State {
        game: Phaser.Game;
        gameOverSprite: Phaser.Sprite;
        highscoreText: EwasteGameObjects.UIText;

        YELLOW: Phaser.Key;

        create() {
            this.gameOverSprite = this.add.sprite(0, 0, "gameover", 0);
            this.gameOverSprite.scale.setTo(
                this.game.width / this.gameOverSprite.width,
                this.game.height / this.gameOverSprite.height);

            this.input.onDown.add(() => {
                this.game.state.start("TitleScreenState", true);
            });

			//Highscore
            var tempstr = EWasteUtils.StorageControl.getStorage("highscore").replace(/,/g, "\n")
            this.game.add.existing(new EwasteGameObjects.UIText(this.game, "1:\n2:\n3:\n4:\n5:", 0, 0, 32));
            this.highscoreText = new EwasteGameObjects.UIText(this.game, tempstr , 50, 0, 32);
			this.game.add.existing(this.highscoreText);


			for (let i = 1; i <= 4; i++) {
				if (i === 4) {
					var text = "Jouw score is " + EWasteUtils.StorageControl.getStorage("yourScore");
					this.game.add.existing(new EwasteGameObjects.UIText(this.game, text, 300, 400 + (i * 30), 24));
					return;
				}

				var recycle = EWasteUtils.StorageControl.getStorage("recycle" + i);
				var kind = EWasteUtils.StorageControl.getStorage("recycleKind" + i);
				this.game.add.existing(new EwasteGameObjects.UIText(this.game, "Je hebt " + recycle + " gerecycled van " + kind, 300, 400 + (i * 30), 24));
            }
            
            this.YELLOW = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
            this.YELLOW.onDown.add(EWasteGameStates.TitleScreenState.prototype.startGame, this);
        }
    }
}