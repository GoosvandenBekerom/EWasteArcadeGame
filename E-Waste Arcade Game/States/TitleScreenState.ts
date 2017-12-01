module EWasteGameStates {
    export class TitleScreenState extends Phaser.State {
        game: Phaser.Game;
        music: Phaser.Sound;
        titleScreenImage: Phaser.Sprite;
        
        create() {
            this.titleScreenImage = this.add.sprite(0, 0, "title");
            
            this.music = this.game.add.audio("BackgoundLoop");
            this.music.volume = 0.4;
            this.music.loop = true;
            this.music.play();

            this.input.onTap.add(this.startGame, this);
        }

        startGame() {
            this.music.stop();
            this.game.state.start("MainState");
        }
    }
}