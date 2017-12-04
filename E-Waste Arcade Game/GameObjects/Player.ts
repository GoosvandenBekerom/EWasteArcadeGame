module EwasteGameObjects {
    export enum PlayerState { IDLE, RUNNING, JUMPING, FALLING }

    export class Player extends Phaser.Sprite {
        game: Phaser.Game;
        playerState: PlayerState;

        UP_ARROW: Phaser.Key;
        DOWN_ARROW: Phaser.Key;

        backgroundWidth: number;
        speed: number;
        animationSpeed: number;
        verticalMoveOffset: number;

        constructor(game: Phaser.Game, x: number, y: number, backgroundWidth: number) {
            super(game, x, y, "CHAR_RUNNING", 0);

            this.game = game;
            this.speed = 1;
            this.backgroundWidth = backgroundWidth;
            this.animationSpeed = 0;
            this.verticalMoveOffset = 100;

            this.UP_ARROW = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.UP_ARROW.onDown.add(Player.prototype.movePlayerUp, this);

            this.DOWN_ARROW = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.DOWN_ARROW.onDown.add(Player.prototype.movePlayerDown, this);

            this.anchor.set(0.0, 1.0);
        }

        update() {
            this.x += this.speed * (60 / this.game.time.elapsedMS);

            if (this.x > this.backgroundWidth * .75) {
                this.x = this.backgroundWidth * .25
            }
        }

        movePlayerUp() {
            //TODO: animation stuff
            if (this.y - this.verticalMoveOffset >= 0) {
                this.y -= this.verticalMoveOffset;
            }
        }

        movePlayerDown() {
            //TODO: animation stuff
            if (this.y + this.verticalMoveOffset <= this.game.height) {
                this.y += this.verticalMoveOffset;
            }
        }

        startJump() {
            //TODO: animation stuff and adding upwards force
        }

        private startIdle() {
            this.playerState = PlayerState.IDLE;
            this.loadTexture("CHAR_IDLE", 0);
            this.animations.add("idle");
            this.animations.play("idle", this.animationSpeed, true);
        }

        private startRunning() {
            this.playerState = PlayerState.RUNNING;
            this.loadTexture("CHAR_RUNNING", 0);
            this.animations.add("walk");
            this.animations.play("walk", this.animationSpeed, true);
        }

        private startJumping() {
            this.playerState = PlayerState.JUMPING;
            this.loadTexture("CHAR_JUMPING", 0);
            this.animations.add("jump");
            this.animations.play("jump", this.animationSpeed, true);
        }
    }
}