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
            this.game.load.image("title", "Graphics/TitleScreen.png");
            this.game.load.image("joystickJump", "Graphics/joystickJump.png");
            this.game.load.image("buttonSwitchLeft", "Graphics/buttonSwitchLeft.png");
            this.game.load.image("buttonSwitchRight", "Graphics/buttonSwitchRight.png");
            this.game.load.image("startGame", "Graphics/startGame.png")
            this.game.load.image("endGame", "Graphics/endGame.png")
            this.game.load.image("scene", "Graphics/CitySkyline.png");
            this.game.load.image("sceneFloor", "Graphics/CityGround.png");
			this.game.load.image("gameover", "Graphics/GameOverScreen.png");
			this.game.load.image("rgb", "Graphics/rgb.png");
			this.game.load.image("brg", "Graphics/brg.png");
			this.game.load.image("gbr", "Graphics/gbr.png");
            this.game.load.image("wasteEnd1", "Graphics/waste1_final.png");
            this.game.load.image("wasteEnd2", "Graphics/waste2_final.png");
            this.game.load.image("wasteEnd3", "Graphics/waste3_final.png");

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
            
            this.game.load.image("battery", "Graphics/battery.png");

            this.game.load.image("platform", "Graphics/Platform.png");
            this.game.load.image("obstacle1", "Graphics/firehydrant.png");

            this.game.load.image("obstacle_1", "Graphics/taxi.png");
            this.game.load.image("obstacle_2", "Graphics/police.png");

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

            // Levels
            this.game.load.json("level1", "Levels/level1.json");
            this.game.load.json("level2", "Levels/level2.json");
            this.game.load.json("level3", "Levels/level3.json");
            this.game.load.json("level4", "Levels/level4.json");
            this.game.load.json("level5", "Levels/level5.json");
            this.game.load.json("level6", "Levels/level6.json");
            this.game.load.json("level7", "Levels/level7.json");
            this.game.load.json("level8", "Levels/level8.json");
            this.game.load.json("level9", "Levels/level9.json");
            this.game.load.json("level10", "Levels/level10.json");
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