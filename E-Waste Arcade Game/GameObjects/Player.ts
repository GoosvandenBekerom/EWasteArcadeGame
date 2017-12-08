﻿module EwasteGameObjects {
    export enum PlayerState { IDLE, RUNNING, JUMPING }
    export enum WasteType { WASTE_1, WASTE_2, WASTE_3 }

    export class Player extends Phaser.Sprite {
        game: Phaser.Game;
        playerState: PlayerState;
        bin: Bin;
        backgroundWidth: number;

        // Score
        scoreManager: ScoreManager;

        // inputs
        joystick: EWasteUtils.JoystickInput;
        
        // camera follow variables
        middleOfScreen: number;
        horizontalOffset: number;

        // move variables
        verticalMoveOffset: number;
        speed = 80;
        speedIncrease = 0.005;
        animationSpeed = 20;
        animationSpeedJumping = 4;
        jumping: boolean = false;
        topBounds: number;
        botBounds: number;
        jumpTimer = 0;
        floor: Phaser.Sprite;

        constructor(game: Phaser.Game, x: number, y: number, backgroundWidth: number, floor: Phaser.Sprite) {
            super(game, x, y, "CHAR_RUNNING", 0);
            this.game = game;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.collideWorldBounds = true;
            this.body.bounce.y = 0;
            this.body.gravity.y = 500;

            this.backgroundWidth = backgroundWidth;
            this.scoreManager = new ScoreManager(this.game);

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

            this.bin = new Bin(this.game, 125 , -120);
            this.addChild(this.bin);
            this.joystick.YELLOW.onDown.add(Bin.prototype.changeCollectorBin, this.bin);

            this.anchor.set(0.0, 1.0);

            this.floor = floor;
            this.game.physics.enable(this.floor, Phaser.Physics.ARCADE);
            this.floor.scale.x = 500;
            this.floor.height = 80;
            this.floor.body.immovable = true;
            this.floor.fixedToCamera = true;

            this.startRunning();
        }

        update() {
            // update camera
            this.game.camera.focusOnXY(this.x + this.horizontalOffset, this.middleOfScreen);

            //Collision
            this.game.physics.arcade.collide(this, this.floor)

            // increase speed
            this.speed += this.speedIncrease;

            // move forward
            this.body.velocity.x = this.speed * (60 / this.game.time.elapsedMS);

            // jump
            var move = 0;
            if (this.joystick.UP.isDown && this.body.touching.down) {
                this.body.velocity.y = -450;
                this.jumpTimer = this.game.time.now + 750;
                this.startJumping();
                this.jumping = true;
            }

            if (this.joystick.DOWN.isDown) {
                //TODO: crouch/duck
            }

            if (this.body.touching.down && this.jumping && this.y == 500) {
                this.startRunning();
                this.jumping = false;
            }

            // update score
            this.scoreManager.distanceScore = this.x;
        }

        private clampVerticleMove(move: number) {
            return (move < this.topBounds)
                ? this.topBounds
                : ((move > this.botBounds) ? this.botBounds : move);
        }
        
        private startRunning() {
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
    }
}