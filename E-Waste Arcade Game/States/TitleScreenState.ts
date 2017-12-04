module EWasteGameStates {
    export class TitleScreenState extends Phaser.State {
        game: Phaser.Game;
        titleScreenImage: Phaser.Sprite;
        
        create() {
            this.titleScreenImage = this.add.sprite(0, 0, "title");

            this.input.onTap.add(this.startGame, this);
        }

        startGame() {
            this.game.state.start("MainState");
        }
    }
}