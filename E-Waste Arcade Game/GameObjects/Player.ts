module EwasteGameObjects {
    export enum PlayerState { IDLE, MOVING_UP, MOVING_DOWN }

    export class Player extends Phaser.Sprite {
        game: Phaser.Game;
        playerState: PlayerState;
        backgroundWidth: number;

        // inputs
        UP_ARROW: Phaser.Key;
        DOWN_ARROW: Phaser.Key;
        SHUFFLE_BTN: Phaser.Key;
        
        // camera follow variables
        middleOfScreen: number;
        horizontalOffset: number;

        // move variables
        verticalMoveOffset: number;
        speed: number;
        animationSpeed: number;
        topBounds: number;
        botBounds: number;

        constructor(game: Phaser.Game, x: number, y: number, backgroundWidth: number) {
            super(game, x, y, "CHAR_RUNNING", 0);
            
            this.game = game;
            this.backgroundWidth = backgroundWidth;

            this.middleOfScreen = this.game.height / 2;
            this.horizontalOffset = this.game.width / 2 - this.x;

            this.verticalMoveOffset = 5;
            this.animationSpeed = 0;
            this.speed = 1;
            this.topBounds = this.height;
            this.botBounds = this.game.height;

            this.UP_ARROW = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.DOWN_ARROW = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.SHUFFLE_BTN = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);

            this.anchor.set(0.0, 1.0);
        }

        update() {
            // move forward
            this.x += this.speed * (60 / this.game.time.elapsedMS);
            
            // move up or down
            var move = 0;
            if (this.UP_ARROW.isDown) {
                move -= this.verticalMoveOffset;
            }
            if (this.DOWN_ARROW.isDown) {
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
        
        private startIdle() {
            this.playerState = PlayerState.IDLE;
            this.loadTexture("CHAR_IDLE", 0);
            this.animations.add("idle");
            this.animations.play("idle", this.animationSpeed, true);
        }

        private startMovingUp() {
            this.playerState = PlayerState.MOVING_UP;
            this.loadTexture("CHAR_MOVE_UP", 0);
            this.animations.add("move_up");
            this.animations.play("move_up", this.animationSpeed, true);
        }

        private startMovingDown() {
            this.playerState = PlayerState.MOVING_DOWN;
            this.loadTexture("CHAR_MOVE_DOWN", 0);
            this.animations.add("move_down");
            this.animations.play("move_down", this.animationSpeed, true);
        }
    }
}