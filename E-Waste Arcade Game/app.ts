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
            this.game.load.image("scene", "Graphics/CitySkyline.png");
            this.game.load.image("sceneFloor", "Graphics/CityGround.png");
            this.game.load.image("gameover", "Graphics/GameOverScreen.jpg");

            // Pickups
            this.game.load.image("waste1_1", "Graphics/waste1_1.png");
            this.game.load.image("waste1_2", "Graphics/waste1_2.png");
            this.game.load.image("waste1_3", "Graphics/waste1_3.png");
            this.game.load.image("waste2_1", "Graphics/waste2_1.png");
            this.game.load.image("waste2_2", "Graphics/waste2_2.png");
            this.game.load.image("waste2_3", "Graphics/waste2_3.png");
            this.game.load.image("waste3_1", "Graphics/waste3_1.png");
            this.game.load.image("waste3_2", "Graphics/waste3_2.png");
            this.game.load.image("waste3_3", "Graphics/waste3_3.png");
            
            this.game.load.image("heart", "Graphics/robothead.png");

            this.game.load.image("platform", "Graphics/Platform.png");
            this.game.load.image("obstacle", "Graphics/firehydrant.png");

            // Spritesheets / Animations
            this.game.load.atlasJSONArray("CHAR_RUNNING",
                "Graphics/Player/run.png", "Graphics/Player/run.json");
            this.game.load.atlasJSONArray("CHAR_JUMPING",
                "Graphics/Player/jump.png", "Graphics/Player/jump.json");

            // Fonts
            this.game.load.bitmapFont('font', 'Graphics/font.png', 'Graphics/font.xml');

            // Audio
            this.game.load.audio("BackgoundLoop",
                [
                    "Sounds/BackgroundLoop.mp3",
                    "Sounds/BackgroundLoop.ogg",
                    "Sounds/BackgroundLoop.wav"
                ]);
            this.game.load.audio("damage",
                [
                    "Sounds/Damage.mp3",
                    "Sounds/Damage.ogg",
                    "Sounds/Damage.wav"
                ]);
            this.game.load.audio("pickupBad",
                [
                    "Sounds/PickupBad.mp3",
                    "Sounds/PickupBad.ogg",
                    "Sounds/PickupBad.wav"
                ]);
            this.game.load.audio("pickupGood",
                [
                    "Sounds/PickupGood.mp3",
                    "Sounds/PickupGood.ogg",
                    "Sounds/PickupGood.wav"
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