module EWasteGameStates {
    export class GameOverState extends Phaser.State {
        game: Phaser.Game;
        gameOverSprite: Phaser.Sprite;
        highscoreText: EwasteGameObjects.UIText;
        tweenButton: Phaser.Tween;
        returnTimer: Phaser.Timer;

        wasteInfo: EWasteUtils.WasteInfo;

        scoreText: string

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

            this.returnTimer = this.game.time.create();
            this.returnTimer.add(15000, () => { this.game.state.start("TitleScreenState"); })
            this.returnTimer.start();

            // Score
            let scoreContainer = this.game.add.graphics(this.margin, this.margin);
            scoreContainer.beginFill(this.containerBg, this.opacity);
            scoreContainer.drawRect(0, 0, 630, this.game.height - (this.margin * 2));
            scoreContainer.endFill();

            let playerName = EWasteUtils.StorageControl.getStorage("playerName");
            if (playerName == "noHighscore")
            {
                this.scoreText = "Jouw score is " + EWasteUtils.StorageControl.getStorage("yourScore") + ",\nHelaas geen highscore";
            }
            else {
                this.scoreText = "Nieuwe highscore!\nJouw score is " + EWasteUtils.StorageControl.getStorage("yourScore");
            }

            scoreContainer.addChild(new EwasteGameObjects.UIText(this.game, this.scoreText, this.padding, this.padding, 42));
            this.wasteInfo = this.game.cache.getJSON("gameOverInfo");

            // Waste Type scores
            for (let i = 1; i <= 3; i++) {
                let recycle = EWasteUtils.StorageControl.getStorage("recycle" + i);
                let kind = EWasteUtils.StorageControl.getStorage("recycleKind" + i);
                let wasteText = this.wasteInfo.Waste1;
                if (i == 2) wasteText = this.wasteInfo.Waste2;
                if (i == 3) wasteText = this.wasteInfo.Waste3;

                // image
                let sprite = new Phaser.Sprite(this.game, this.padding, 0, "wasteEnd" + i);
                sprite.y = (i * (sprite.height * 1.65)) + this.padding * i;
                scoreContainer.addChild(sprite);

                // text
                let text = new EwasteGameObjects.UIText(this.game, recycle + "\n" + wasteText,
                    sprite.x + sprite.width + this.padding, sprite.y, 24, "font2");

                text.maxWidth = scoreContainer.width - (this.padding * 3) - sprite.width;

                text.align = "left";
                text.anchor.setTo(0, 0.5);
                text.y += sprite.height / 2;

                scoreContainer.addChild(text);
            }


            // Highscores
            let highScoreWidth = 305;
            let highScoreHeight = 230;
            let highscoresContainer = this.game.add.graphics(this.game.width - this.margin - highScoreWidth, this.margin);
            highscoresContainer.beginFill(this.containerBg, this.opacity);
            highscoresContainer.drawRect(0, 0, highScoreWidth, highScoreHeight);
            highscoresContainer.endFill();

            highscoresContainer.addChild(new EwasteGameObjects.UIText(this.game, "HIGHSCORES", this.padding, this.padding, 36));

            let scores = JSON.parse(EWasteUtils.StorageControl.getStorage("highscores"));
            if (scores) {
                let namesString = "";
                let scoreString = "";
                for (let i = 0; i < scores.length; i++) {
                    namesString += scores[i].name + ":\n";
                    scoreString += scores[i].score + "\n";
                }
                let namesText = new EwasteGameObjects.UIText(this.game, namesString, this.padding, 50 + this.padding, 32);
                this.highscoreText = new EwasteGameObjects.UIText(this.game, scoreString, 175 + this.padding, 50 + this.padding, 32);

                highscoresContainer.addChild(namesText);
                highscoresContainer.addChild(this.highscoreText);
            }

            // back button
            let btnGraphics = this.game.add.graphics(
                this.game.width - this.margin - highScoreWidth,
                this.game.height - this.margin - highScoreHeight);

            let btn = new Phaser.Sprite(this.game, highScoreWidth / 2, 0, "endGame");
            btn.anchor.setTo(0.5, 0);
            btnGraphics.addChild(btn);

            this.tweenButton = this.game.add.tween(btn).to({ alpha: 0 }, 1000, "Linear", true, 0, -1);
            this.tweenButton.yoyo(true, 1);
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