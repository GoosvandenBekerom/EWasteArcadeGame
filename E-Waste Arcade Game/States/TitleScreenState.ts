module EWasteGameStates {
    export class TitleScreenState extends Phaser.State {
        game: Phaser.Game;
        titleScreenImage: Phaser.Sprite;

        YELLOW: Phaser.Key;
        
        create() {
            this.titleScreenImage = this.add.sprite(0, 0, "title");

            this.input.onTap.add(this.startGame, this);

            this.YELLOW = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
            this.YELLOW.onDown.add(EWasteGameStates.TitleScreenState.prototype.startGame, this);

            this.input.onDown.add(() => {
                this.startGame();
            });
        }

        startGame() {
            this.game.state.start("MainState");
        }
    }
}