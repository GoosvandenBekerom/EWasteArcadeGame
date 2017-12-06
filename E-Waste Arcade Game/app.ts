module Game {
    export class EWasteArcadeGame {
        game: Phaser.Game;

        constructor() {
            this.game = new Phaser.Game(1024, 576, Phaser.AUTO,
                "content",
                {
                    preload: this.preload,
                    create: this.create
                });
        }

        preload() {
            // Graphics
            this.game.load.image("title", "Graphics/TitleScreen.jpg");
            this.game.load.image("scene", "Graphics/background.png");
            this.game.load.image("gameover", "Graphics/GameOverScreen.jpg");

            // Spritesheets
            // TODO: check what we need as of animations
            //this.game.load.atlasXML("CHAR_IDLE", "Graphics/char_idle.png", "Graphics/char_idle.xml");
            //this.game.load.atlasXML("CHAR_MOVE_UP", "Graphics/char_move_up.png", "Graphics/char_move_up.xml");
            //this.game.load.atlasXML("CHAR_MOVE_DOWN", "Graphics/char_move_down.png", "Graphics/char_move_down.xml");

            // Audio
            this.game.load.audio("BackgoundLoop",
                [
                    "Sounds/BackgroundLoop.mp3",
                    "Sounds/BackgroundLoop.ogg",
                    "Sounds/BackgroundLoop.wav"
                ]);
        }

        create() {
            this.game.state.add("TitleScreenState", EWasteGameStates.TitleScreenState, true);
            this.game.state.add("MainState", EWasteGameStates.MainState, false);
            this.game.state.add("GameOverState", EWasteGameStates.GameOverState, false);

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }
    }
}

window.onload = () => {
    const game = new Game.EWasteArcadeGame();
}