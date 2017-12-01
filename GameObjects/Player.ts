module EwasteGameObjects {
    export enum PlayerState { IDLE, RUNNING, JUMPING, FALLING }

    export class Player extends Phaser.Sprite {
        game: Phaser.Game;
        playerState: PlayerState;

        UP_ARROW: Phaser.Key;
        DOWN_ARROW: Phaser.Key;
        ESC: Phaser.Key;

        speed: number;
        animationSpeed: number;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, "CHAR_RUNNING", 0);

            this.game = game;
            this.speed = 0;
            this.animationSpeed = 0;

            this.UP_ARROW = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.DOWN_ARROW = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.anchor.set(0.0, 1.0);
        }

        moveLeft() {
            //TODO
        }

        moveRight() {
            //TODO
        }

        jump() {
            //TODO
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