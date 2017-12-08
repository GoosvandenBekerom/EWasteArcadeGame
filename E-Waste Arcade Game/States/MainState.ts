﻿module EWasteGameStates {

    export class MainState extends Phaser.State {
        game: Phaser.Game;
        music: Phaser.Sound;
        player: EwasteGameObjects.Player;
        scene: EwasteGameObjects.Scene;
        pickupManager: EwasteGameObjects.PickupManager;
        spawnGrid: EwasteGameObjects.SpawnGrid;
        platformManager: EwasteGameObjects.PlatformManager;
        scoremanager: EwasteGameObjects.ScoreManager;
        canvas: EwasteGameObjects.GUI;
        floor: Phaser.Sprite;

        spawnTriggerPosition: number;

        ESC: Phaser.Key;

        startOffset = 100;
        amountOfBackgroundRepeats = 10000;
        
        create() {
            var widthBounds = this.game.width * this.amountOfBackgroundRepeats;
            this.scene = new EwasteGameObjects.Scene(this.game, 0, 0, widthBounds);
            this.floor = new Phaser.Sprite(this.game, 0, 500);
            this.player = new EwasteGameObjects.Player(
                this.game, this.startOffset, this.game.height / 2, widthBounds, this.floor);
            this.pickupManager = new EwasteGameObjects.PickupManager(this.game, this, this.player);
            this.platformManager = new EwasteGameObjects.PlatformManager(this.game, this, this.player);
            this.scoremanager = new EwasteGameObjects.ScoreManager(this.game);
            let spawnLanes = [150, 300, 450];
            this.spawnGrid = new EwasteGameObjects.SpawnGrid(this.game, spawnLanes, this.pickupManager, this.platformManager);
            this.canvas = new EwasteGameObjects.GUI(this.game, this.player);

            this.game.add.existing(this.scene);
            this.game.add.existing(this.player);
            this.game.add.existing(this.pickupManager);
            this.game.add.existing(this.platformManager);
            this.game.add.existing(this.canvas);
            this.game.add.existing(this.floor);

            this.game.world.setBounds(0, 0, widthBounds, this.scene.height);

            this.ESC = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
            this.ESC.onDown.add(EWasteGameStates.MainState.prototype.GameOver, this);

            this.music = this.game.add.audio("BackgoundLoop");
            this.music.volume = 0.1;
            this.music.loop = true;
            //this.music.play();

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.enable(this.player);

            this.platformManager.enableBody = true;
            this.platformManager.physicsBodyType = Phaser.Physics.ARCADE;

            this.spawnTriggerPosition = this.game.width;
        }

        update() {
            this.game.physics.arcade.overlap(this.platformManager, this.player, this.Collision, null, this);

            if (this.player.x >= this.spawnTriggerPosition) {
                this.spawnTriggerPosition = this.player.x + this.game.width;
                this.spawnGrid.generateNext(this.spawnGrid.getRandomTemplateType(), this.spawnTriggerPosition);
            }
        }

        private Collision(player, obstacle) {
            console.log("obstacle collision");  
        }

        GameOver() {
            this.music.stop();
            EWasteUtils.Highscore.addScore(this.scoremanager.distanceScore);
            this.game.state.start("GameOverState");
        }
    }
}