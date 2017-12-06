module EwasteGameObjects {
    export enum PlayerState { IDLE, RUNNING, JUMPING }

    export class Player extends Phaser.Sprite {
        game: Phaser.Game;
        playerState: PlayerState;
        backgroundWidth: number;

        // inputs
        joystick: EWasteUtils.JoystickInput;
        
        // camera follow variables
        middleOfScreen: number;
        horizontalOffset: number;

        // move variables
        verticalMoveOffset: number;
        speed = 1;
        speedIncrease = 0.001;
        animationSpeed = 0;
        topBounds: number;
        botBounds: number;

        constructor(game: Phaser.Game, x: number, y: number, backgroundWidth: number) {
            super(game, x, y, "CHAR_RUNNING", 0);

            this.game = game;
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
        }

        update() {
            // move forward
            this.x += this.speed * (60 / this.game.time.elapsedMS);
            
            // move up or down
            var move = 0;
            if (this.joystick.UP.isDown) {
                move -= this.verticalMoveOffset;
            }
            if (this.joystick.DOWN.isDown) {
                move += this.verticalMoveOffset;
            }
            this.y = this.clampVerticleMove(this.y + move);
            

            // update camera
            this.game.camera.focusOnXY(this.x + this.horizontalOffset, this.middleOfScreen);
        }

        private clampVerticleMove(move: number) {
            return (move < this.topBounds)
                ? this.topBounds
                : ((move > this.botBounds) ? this.botBounds : move);
        }
        
        /*private startIdle() {
            this.playerState = PlayerState.IDLE;
            this.loadTexture("CHAR_IDLE", 0);
            this.animations.add("idle");
            this.animations.play("idle", this.animationSpeed, true);
        }

        private StartRunning() {
            this.playerState = PlayerState.RUNNING;
            this.loadTexture("CHAR_MOVE_UP", 0);
            this.animations.add("move_up");
            this.animations.play("move_up", this.animationSpeed, true);
        }

        private startJumping() {
            this.playerState = PlayerState.JUMPING;
            this.loadTexture("CHAR_MOVE_DOWN", 0);
            this.animations.add("move_down");
            this.animations.play("move_down", this.animationSpeed, true);
        }*/
    }
}