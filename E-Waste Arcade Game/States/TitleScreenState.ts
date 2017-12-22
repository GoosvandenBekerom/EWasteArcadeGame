module EWasteGameStates {
    export class TitleScreenState extends Phaser.State {
        game: Phaser.Game;
        titleScreenImage: Phaser.Sprite;
        startGameSprite: Phaser.Sprite;
        tweenStartGame: Phaser.Tween;
        playerJump: Phaser.Sprite;
        uitleg: Phaser.Sprite;

        GREEN: Phaser.Key;

        // offset values
        padding = 5;

        create() {
            this.titleScreenImage = this.add.sprite(0, 0, "title");
            this.uitleg = this.add.sprite(this.game.width / 2, this.game.height / 2, "uitleg");
            this.uitleg.anchor.setTo(0.5);

            this.playerJump = this.add.sprite(300, 250, "CHAR_JUMPING");
            this.startGameSprite = this.add.sprite(710, 375, "startGame");

            let scoreContainer = this.game.add.graphics(561, 165);
            scoreContainer.drawRect(0, 0, 285, 220);

            {
                let sprites = [
                    new Phaser.Sprite(this.game, (scoreContainer.width / 7) * 1, this.padding, "waste1_1"),
                    new Phaser.Sprite(this.game, (scoreContainer.width / 7) * 3.5, this.padding, "waste2_1"),
                    new Phaser.Sprite(this.game, (scoreContainer.width / 7) * 6, this.padding, "waste3_1"),
                    new Phaser.Sprite(this.game, (scoreContainer.width / 7) * 1, this.padding + 60, "waste1_2"),
                    new Phaser.Sprite(this.game, (scoreContainer.width / 7) * 3.5, this.padding + 60, "waste2_2"),
                    new Phaser.Sprite(this.game, (scoreContainer.width / 7) * 6, this.padding + 60, "waste3_2"),
                    new Phaser.Sprite(this.game, (scoreContainer.width / 7) * 1, this.padding + 120, "waste1_3"),
                    new Phaser.Sprite(this.game, (scoreContainer.width / 7) * 3.5, this.padding + 120, "waste2_3"),
                    new Phaser.Sprite(this.game, (scoreContainer.width / 7) * 6, this.padding + 120, "waste3_3")
                ];

                for (let i = 0; i < sprites.length; i++) {
                    sprites[i].anchor.setTo(0.5, 0);
                    sprites[i].scale.setTo(0.66);
                    scoreContainer.addChild(sprites[i]);
                }
            }
           

            let text = new EwasteGameObjects.UIText(this.game, "AFVAL", 0, 0, 22);
            text.y = scoreContainer.height - text.height - 2;
            text.x = this.padding*2;
            scoreContainer.addChild(text);



            this.input.onTap.add(this.startGame, this);

            this.GREEN = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
            this.GREEN.onDown.add(EWasteGameStates.TitleScreenState.prototype.startGame, this);

            this.input.onDown.add(() => {
                this.startGame();
            });
            
            this.tweenStartGame = this.game.add.tween(this.startGameSprite).to({ alpha: 0 }, 1000, "Linear", true, 0, -1);
            this.tweenStartGame.yoyo(true, 1);

            this.playerJump.animations.add("jumping");
            this.playerJump.animations.play("jumping", 10, true);
        }

        startGame() {
            this.game.state.start("MainState");
        }
    }
}