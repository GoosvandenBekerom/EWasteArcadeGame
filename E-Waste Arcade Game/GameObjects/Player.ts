module EwasteGameObjects {
    export enum PlayerState { IDLE, RUNNING, JUMPING }
    export enum WasteType { WASTE_1, WASTE_2, WASTE_3 }

    export class Player extends Phaser.Sprite {
        game: Phaser.Game;
        state: EWasteGameStates.MainState;
        playerState: PlayerState;
        bin: Bin;
        backgroundWidth: number;

        // inputs
        joystick: EWasteUtils.JoystickInput;
        
        // camera follow variables
        middleOfScreen: number;
        horizontalOffset: number;

        // move variables
        verticalMoveOffset: number;
        speed = 113;
        animationSpeed = 20;
        animationSpeedJumping = 5;
        jumping: boolean = false;
        platformCollisionLastFrame: boolean = false;
        topBounds: number;
        botBounds: number;
        jumpTimer = 0;
        floor: Phaser.Sprite;

        //variables for obstacle collision
        immune: boolean = false;
        startTimeImmunity: number;
        immunityTime: number = 2;
        tweenImmune: Phaser.Tween;

        //sound
        soundManager: EwasteGameObjects.SoundManager;

        private currentPlatform: Phaser.Sprite;

        constructor(game: Phaser.Game, x: number, y: number, backgroundWidth: number, floor: Phaser.Sprite, state: EWasteGameStates.MainState, soundManager: EwasteGameObjects.SoundManager) {
            super(game, x, y, "CHAR_RUNNING", 0);
            this.game = game;
            this.state = state;
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.soundManager = soundManager;
            this.body.collideWorldBounds = true;
            this.body.bounce.y = 0;
            this.body.gravity.y = 1000;

            this.backgroundWidth = backgroundWidth;

            this.middleOfScreen = this.game.height / 2;
            this.horizontalOffset = this.game.width / 2 - this.x;

            this.verticalMoveOffset = 5;
            this.topBounds = this.height;
            this.botBounds = this.game.height;

            this.joystick = new EWasteUtils.JoystickInput(
                this.game,
                Phaser.Keyboard.UP, Phaser.Keyboard.DOWN,
                Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT,
                Phaser.Keyboard.Z, Phaser.Keyboard.X
			);

            this.anchor.set(0.0, 1.0);

            this.floor = floor;
            this.game.physics.enable(this.floor, Phaser.Physics.ARCADE);
            this.floor.scale.x = 500;
            this.floor.height = 80;
            this.floor.body.immovable = true;
            this.floor.fixedToCamera = true;

            //Scale body
            this.body.setSize(80, 120, 33, 20);

            this.startRunning();
        }

        update() {
            // update camera
            this.game.camera.focusOnXY(this.x + this.horizontalOffset, this.middleOfScreen);

            //Collision
            this.game.physics.arcade.collide(this, this.floor, () => {
                if (this.playerState == PlayerState.RUNNING) return;
                this.startRunning();

                if (this.currentPlatform && this.currentPlatform.body) { this.currentPlatform.body.enable = true; }
            });

            if (this.game.physics.arcade.collide(this, this.state.platformManager, (player, platform) => {
                if (player.playerState != PlayerState.RUNNING) {
                    player.startRunning();
                }

                if (player.currentPlatform && player.currentPlatform.body && platform != player.currentPlatform) { player.currentPlatform.body.enable = true; }
                player.currentPlatform = platform;
            })) {
                this.platformCollisionLastFrame = true;

                // jump off platform
                if (this.joystick.DOWN.isDown) {
                    if (this.currentPlatform && this.currentPlatform.body) { this.currentPlatform.body.enable = false; }
                }
            } else {
                if (this.platformCollisionLastFrame) {
                    this.platformCollisionLastFrame = false;

                    // player is no longer on platform
                    this.jumping = true;
                    this.startFalling();
                }
            }

            // Triggers
            this.game.physics.arcade.overlap(this, this.state.pickupManager, this.pickupCollisionHandler);
            this.game.physics.arcade.overlap(this, this.state.obstacleManager, this.obstacleCollisionHandler);

            //immunity check
            if (this.immune) {
                this.tweenImmune.yoyo(true, 0);

                if (this.game.time.elapsedSecondsSince(this.startTimeImmunity) >= this.immunityTime) {
                    this.immune = false;
                    this.tweenImmune.yoyo(false);
                    this.tweenImmune.stop();
                    //this.tweenImmune.to({ alpha: 1 }, 1, "Linear", true, 0, -1)
                    this.alpha = 1;
                }
            }

            // move forward
            this.body.velocity.x = this.speed * (60 / this.game.time.elapsedMS);

            // jump
            var move = 0;
            if (this.joystick.UP.isDown && !this.jumping) {
                this.body.velocity.y = -630;
                this.jumpTimer = this.game.time.now + 750;
                this.startJumping();
                this.jumping = true;
            }

            if (this.joystick.DOWN.isDown && this.jumping) {
                this.body.velocity.y = 630;
            }
        }

        pickupCollisionHandler(player, pickup) {
            if (player.bin.collectWasteTypeState == pickup.wasteType) {
                player.state.scoremanager.addToWasteScore(pickup.wasteType);
                player.soundManager.playSound("pickupGood");
            } else {
                switch (player.state.levelControl.spawnLevel)
                {
                    case EwasteGameObjects.SpawnLevel.Level_0:
                        player.state.scoremanager.loseLife(5);
                        break;
                    case EwasteGameObjects.SpawnLevel.Level_1:
                        player.state.scoremanager.loseLife(5);
                        break;
                    case EwasteGameObjects.SpawnLevel.Level_2:
                        player.state.scoremanager.loseLife(5);
                        break;
                    case EwasteGameObjects.SpawnLevel.Level_3:
                        player.state.scoremanager.loseLife(10);
                        break;
                    case EwasteGameObjects.SpawnLevel.Level_4:
                        player.state.scoremanager.loseLife(10);
                        break;
                    case EwasteGameObjects.SpawnLevel.Level_5:
                        player.state.scoremanager.loseLife(10);
                        break;
                    case EwasteGameObjects.SpawnLevel.Level_6:
                        player.state.scoremanager.loseLife(15);
                        break;
                    case EwasteGameObjects.SpawnLevel.Level_7:
                        player.state.scoremanager.loseLife(15);
                        break;
                    case EwasteGameObjects.SpawnLevel.Level_8:
                        player.state.scoremanager.loseLife(20);
                        break;
                    case EwasteGameObjects.SpawnLevel.Level_9:
                        player.state.scoremanager.loseLife(20);
                        break;
                    case EwasteGameObjects.SpawnLevel.Level_10:
                        player.state.scoremanager.loseLife(25);
                        break;
                }
                player.soundManager.playSound("pickupBad");

            }
            pickup.kill();
        }

        obstacleCollisionHandler(player, obstacle) {
            if (!player.immune) {
                player.soundManager.playSound("damage");
                player.state.scoremanager.loseLife(25);
                player.immune = true;
                player.startTimeImmunity = player.game.time.time;
                player.tweenImmune = player.game.add.tween(player).to({ alpha: 0 }, 100, "Linear", true, 0, -1);
            }
		}

		public addBin(bin) {
			this.bin = bin;
            this.joystick.YELLOW.onDown.add(Bin.prototype.changeCollectorBinClockwise, this.bin);
            this.joystick.GREEN.onDown.add(Bin.prototype.changeCollectorBinAntiClockwise, this.bin);
		}

        private clampVerticleMove(move: number) {
            return (move < this.topBounds)
                ? this.topBounds
                : ((move > this.botBounds) ? this.botBounds : move);
        }
        
        private startRunning() {
            this.jumping = false;
            this.playerState = PlayerState.RUNNING;
            this.loadTexture("CHAR_RUNNING", 0);
            this.animations.add("running");
            this.animations.play("running", this.animationSpeed, true);
        }

        private startJumping() {
            this.playerState = PlayerState.JUMPING;
            this.loadTexture("CHAR_JUMPING", 0);
            this.animations.add("jumping");
            this.animations.play("jumping", this.animationSpeedJumping, true);
        }

        private startFalling() {
            this.playerState = PlayerState.JUMPING;
            this.loadTexture("CHAR_JUMPING", 5);
            this.animations.add("falling");
            this.animations.play("falling", this.animationSpeedJumping, true);
        }
    }
}