module EWasteGameStates {
    export class GameOverState extends Phaser.State {
        game: Phaser.Game;
        gameOverSprite: Phaser.Sprite;
        highscoreText: EwasteGameObjects.UIText;

        timer: Phaser.Timer;
        YELLOW: Phaser.Key;

        // offset values
        margin = 30;
        padding = 10;

        // color values
        containerBg = 0xffffff;
        opacity = 0.5;

        create() {
            // Background
            this.gameOverSprite = this.add.sprite(0, 0, "gameover", 0);

            // input
            this.timer = this.game.time.create();
            this.timer.loop(1000, this.endBtnEnabled, this);
            this.timer.start();

            // Score
            let scoreContainer = this.game.add.graphics(this.margin, this.margin);
            scoreContainer.beginFill(this.containerBg, this.opacity);
            scoreContainer.drawRect(0, 0, 650, this.game.height - (this.margin * 2));
            scoreContainer.endFill();

            let scoreText = EWasteUtils.StorageControl.getStorage("playerName") + ", Jouw score is " +
                EWasteUtils.StorageControl.getStorage("yourScore");
            scoreContainer.addChild(new EwasteGameObjects.UIText(this.game, scoreText, this.padding, this.padding, 42));

            // Waste Type scores
            for (let i = 1; i <= 3; i++) {
                var recycle = EWasteUtils.StorageControl.getStorage("recycle" + i);
                var kind = EWasteUtils.StorageControl.getStorage("recycleKind" + i);

                // image
                let sprite = new Phaser.Sprite(this.game, this.padding, 0, "wasteEnd" + i);
                sprite.y = (i * (sprite.height * 1.5)) + this.padding * i;
                scoreContainer.addChild(sprite);

                // text
                let text = new EwasteGameObjects.UIText(this.game,
                    "Aantal gerecycled: " + recycle + "\n" +
                    "Hiermee is het mogelijk om _ te maken.",
                    sprite.x + sprite.width + this.padding, sprite.y, 24);

                text.maxWidth = scoreContainer.width - (this.padding * 3) - sprite.width;

                text.align = "left";
                text.anchor.setTo(0, 0.5);
                text.y += sprite.height / 2;

                scoreContainer.addChild(text);
            }


            // Highscores
            let highScoreWidth = 285;
            let highScoreHeight = 230;
            let highscoresContainer = this.game.add.graphics(this.game.width - this.margin - highScoreWidth, this.margin);
            highscoresContainer.beginFill(this.containerBg, this.opacity);
            highscoresContainer.drawRect(0, 0, highScoreWidth, highScoreHeight);
            highscoresContainer.endFill();

            highscoresContainer.addChild(new EwasteGameObjects.UIText(this.game, "HIGHSCORES", this.padding, this.padding, 36));
            highscoresContainer.addChild(new EwasteGameObjects.UIText(this.game, "1:\n2:\n3:\n4:\n5:", this.padding, 50 + this.padding, 32));
            let scores = EWasteUtils.StorageControl.getStorage("highscore").replace(/,/g, "\n")
            this.highscoreText = new EwasteGameObjects.UIText(this.game, scores, 50 + this.padding, 50 + this.padding, 32);
            highscoresContainer.addChild(this.highscoreText);

            // back button
            let btnGraphics = this.game.add.graphics(
                this.game.width - this.margin - highScoreWidth,
                this.game.height - this.margin - highScoreHeight);

            let btn = new Phaser.Sprite(this.game, highScoreWidth / 2, 0, "endGame");
            btn.anchor.setTo(0.5, 0);
            btnGraphics.addChild(btn);
        }

        startTitleScreen(caller) {
            caller.game.state.start("TitleScreenState", true);
        }

        endBtnEnabled()
        {
            this.input.onDown.add(this.startTitleScreen);
            this.YELLOW = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
            this.YELLOW.onDown.add(this.startTitleScreen);
            this.timer.stop();
        }
    }
}