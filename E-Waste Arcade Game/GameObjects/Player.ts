module EwasteGameObjects {
    export enum PlayerState { IDLE, RUNNING, JUMPING }
    export enum WasteType { WASTE_1, WASTE_2, WASTE_3 }

    export class Player extends Phaser.Sprite {
        game: Phaser.Game;
        playerState: PlayerState;
        collectBinState: WasteType;
        backgroundWidth: number;

        // inputs
        joystick: EWasteUtils.JoystickInput;
        
        // camera follow variables
        middleOfScreen: number;
        horizontalOffset: number;

        // move variables
        verticalMoveOffset: number;
        speed = 1;
        speedIncrease = 0.0005;
        animationSpeed = 20;
        topBounds: number;
        botBounds: number;

        constructor(game: Phaser.Game, x: number, y: number, backgroundWidth: number) {
            super(game, x, y, "CHAR_RUNNING", 0);
            
            this.collectBinState = WasteType.WASTE_1;

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

            this.joystick.YELLOW.onDown.add(Player.prototype.changeCollectorBin, this);

            this.anchor.set(0.0, 1.0);
            this.startRunning();
        }

        update() {
            // increase speed
            this.speed += this.speedIncrease;

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
        
        private startRunning() {
            this.playerState = PlayerState.RUNNING;
            this.loadTexture("CHAR_RUNNING", 0);
            this.animations.add("running");
            this.animations.play("running", this.animationSpeed, true);
        }

        private changeCollectorBin()
        {
            switch (this.collectBinState) {
                case WasteType.WASTE_1: {
                    this.collectBinState = WasteType.WASTE_2;
                    //TODO SWITCH SPRITE
                    break;
                }
                case WasteType.WASTE_2:   {
                    this.collectBinState = WasteType.WASTE_3;
                    //TODO SWITCH SPRITE

                    break;
                }
                case WasteType.WASTE_3:   {
                    this.collectBinState = WasteType.WASTE_1; 
                    //TODO SWITCH SPRITE

                    break;
                }
            } 
        }
    }
}