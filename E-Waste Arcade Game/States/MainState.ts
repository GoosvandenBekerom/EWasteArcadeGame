module EWasteGameStates {

    export class MainState extends Phaser.State {
        game: Phaser.Game;
        soundManager: EwasteGameObjects.SoundManager;
        player: EwasteGameObjects.Player;
        scene: EwasteGameObjects.Scene;
        sceneFloor: EwasteGameObjects.Scene;
        pickupManager: EwasteGameObjects.PickupManager;
        obstacleManager: EwasteGameObjects.ObstacleManager;
        spawnGrid: EwasteGameObjects.SpawnGrid;
        platformManager: EwasteGameObjects.PlatformManager;
        scoremanager: EwasteGameObjects.ScoreManager;
        canvas: EwasteGameObjects.GUI;
        levelControl: EWasteUtils.DynamicLevelControl;
        floor: Phaser.Sprite;
	bin: EwasteGameObjects.Bin;

        spawnTriggerPosition: number;

        ESC: Phaser.Key;

        startOffset = 100;
        amountOfBackgroundRepeats = 10000;
        
        create() {
            var widthBounds = this.game.width * this.amountOfBackgroundRepeats;
            this.scene = new EwasteGameObjects.Scene(this.game, 0, 0, widthBounds);
            this.sceneFloor = new EwasteGameObjects.Scene(this.game, 0, 0, widthBounds, "sceneFloor");
            this.soundManager = new EwasteGameObjects.SoundManager(this.game);
			this.floor = new Phaser.Sprite(this.game, 0, 500);
            this.pickupManager = new EwasteGameObjects.PickupManager(this.game, this);
            this.obstacleManager = new EwasteGameObjects.ObstacleManager(this.game, this);
            this.player = new EwasteGameObjects.Player(
				this.game, this.startOffset, 450, widthBounds, this.floor, this, this.soundManager);
			this.bin = new EwasteGameObjects.Bin(this.game, this.player, this.game.width / 2 - 100, 30);
			this.player.addBin(this.bin);
            this.platformManager = new EwasteGameObjects.PlatformManager(this.game, this, this.player);
            this.spawnGrid = new EwasteGameObjects.SpawnGrid(this.game, this.pickupManager, this.platformManager, this.obstacleManager);
            this.canvas = new EwasteGameObjects.GUI(this.game, this.player);
            this.scoremanager = new EwasteGameObjects.ScoreManager(this.game, this.canvas, this);
            this.levelControl = new EWasteUtils.DynamicLevelControl();

            this.game.add.existing(this.scene);
            this.game.add.existing(this.sceneFloor);
            this.game.add.existing(this.soundManager);
            this.game.add.existing(this.pickupManager);
            this.game.add.existing(this.obstacleManager);
            this.game.add.existing(this.player);
            this.game.add.existing(this.platformManager);
            this.game.add.existing(this.canvas);
			this.game.add.existing(this.floor);
			this.game.add.existing(this.bin);

            this.game.world.setBounds(0, 0, widthBounds, this.scene.height);

            this.ESC = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
            this.ESC.onDown.add(EWasteGameStates.MainState.prototype.gameOver, this);

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.platformManager.enableBody = true;
            this.platformManager.physicsBodyType = Phaser.Physics.ARCADE;

            this.spawnTriggerPosition = this.game.width;
        }

        update() {
            if (this.player.x >= this.spawnTriggerPosition) {
                this.spawnTriggerPosition = this.player.x + this.game.width;
                this.spawnGrid.generateNext(this.levelControl.getSpawnLevel(this.scoremanager.getTotalScore()), this.spawnTriggerPosition);
            }

            // Parallax
            this.scene.position.x += this.player.speed / 200;
        }

        render() {
            //this.game.debug.body(this.player);
        }

        gameOver() {
            this.soundManager.stopMusic();
            EWasteUtils.Highscore.addScore(this.scoremanager.getTotalScore());

            EWasteUtils.StorageControl.setStorage("recycle1", this.scoremanager.waste1Amount);
            EWasteUtils.StorageControl.setStorage("recycle2", this.scoremanager.waste2Amount);
            EWasteUtils.StorageControl.setStorage("recycle3", this.scoremanager.waste3Amount);

			EWasteUtils.StorageControl.setStorage("recycleKind1", "Papier");
			EWasteUtils.StorageControl.setStorage("recycleKind2", "Elektrisch afval");
			EWasteUtils.StorageControl.setStorage("recycleKind3", "PMD");

            this.game.state.start("GameOverState");
        }
    }
}