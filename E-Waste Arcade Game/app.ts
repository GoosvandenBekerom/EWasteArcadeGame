module Game {
    export class EWasteArcadeGame {
        game: Phaser.Game;

        constructor() {
            this.game = new Phaser.Game(1024, 576, Phaser.CANVAS,
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
            this.game.load.image("apple", "Graphics/Apple.png");
            this.game.load.image("can", "Graphics/Can.png");
            this.game.load.image("phone", "Graphics/Phone.png");

            this.game.load.image("bin1", "Graphics/playerRGB.png");
            this.game.load.image("bin2", "Graphics/playerBRG.png");
            this.game.load.image("bin3", "Graphics/playerGBR.png");

            this.game.load.image("heart", "Graphics/robothead.png");

            this.game.load.image("platform", "Graphics/Obstacle1.png");

            // Spritesheets / Animations
            this.game.load.atlasJSONArray("CHAR_RUNNING",
                "Graphics/Player/run.png", "Graphics/Player/run.json");
            this.game.load.atlasJSONArray("CHAR_JUMPING",
                "Graphics/Player/jump.png", "Graphics/Player/jump.json");

            // Fonts
            this.game.load.bitmapFont('desyrel', 'Graphics/desyrel.png', 'Graphics/desyrel.xml');

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