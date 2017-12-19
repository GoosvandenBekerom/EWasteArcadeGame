module EWasteGameStates {
    export class TitleScreenState extends Phaser.State {
        game: Phaser.Game;
        titleScreenImage: Phaser.Sprite;
        joystickJump: Phaser.Sprite;
        buttonSwitchLeft: Phaser.Sprite;
        buttonSwitchRight: Phaser.Sprite;
        startGameSprite: Phaser.Sprite;
        tweenStartGame: Phaser.Tween;
        playerJump: Phaser.Sprite;

        YELLOW: Phaser.Key;
        
        create() {
            this.titleScreenImage = this.add.sprite(0, 0, "title");

            this.playerJump = this.add.sprite(250, 50, "CHAR_JUMPING");

            this.joystickJump = this.add.sprite(275, 200, "joystickJump");
            this.buttonSwitchLeft = this.add.sprite(450, 275, "buttonSwitchLeft");
            this.buttonSwitchRight = this.add.sprite(600, 275, "buttonSwitchRight");
            this.startGameSprite = this.add.sprite(450, 425, "startGame");

            this.input.onTap.add(this.startGame, this);

            this.YELLOW = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
            this.YELLOW.onDown.add(EWasteGameStates.TitleScreenState.prototype.startGame, this);

            this.input.onDown.add(() => {
                this.startGame();
            });
            
            this.tweenStartGame = this.game.add.tween(this.startGameSprite).to({ alpha: 0 }, 500, "Linear", true, 0, -1);
            this.tweenStartGame.yoyo(true, 1);

            this.playerJump.animations.add("jumping");
            this.playerJump.animations.play("jumping", 10, true);
        }

        startGame() {
            this.game.state.start("MainState");
        }
    }
}