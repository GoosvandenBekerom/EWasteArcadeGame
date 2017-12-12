﻿module EwasteGameObjects {
    export class PowerBar {
        game: Phaser.Game;
        powerBarSprite: Phaser.Sprite;
        bmd: Phaser.BitmapData;
        currentPower: number;
        timer: Phaser.Timer;
        state: EWasteGameStates.MainState;

        constructor(game: Phaser.Game, x: number, y: number, state: EWasteGameStates.MainState) {
            this.game = game;
            this.state = state;
            // create a new bitmap data object
            this.bmd = game.add.bitmapData(200, 25);

            this.currentPower = 200;

            // draw to the canvas context like normal
            this.bmd.ctx.beginPath();
            this.bmd.ctx.rect(0, 0, this.currentPower, 25);
            this.bmd.ctx.fillStyle = '#ff0000';
            this.bmd.ctx.fill();

            // use the bitmap data as the texture for the sprite
            this.powerBarSprite = game.add.sprite(x, y, this.bmd);
            this.powerBarSprite.fixedToCamera = true;

            this.timer = this.game.time.create(false);
            this.timer.loop(500/*speed*/, this.loserPowerOnTime, this);
            this.timer.start();
        }

        loserPowerOnTime()
        {
            this.currentPower = this.currentPower - 1;
            this.powerBarSprite.width = this.currentPower;
            this.checkGameOver();
        }

        losePower(amountOfPower: number)
        {
            this.currentPower = this.currentPower - amountOfPower;
            this.checkGameOver();
            this.game.add.tween(this.powerBarSprite).to({ width: this.currentPower }, amountOfPower * 10 , Phaser.Easing.Linear.None, true);
        }

        private checkGameOver()
        {
            if (this.currentPower <= 0)
            {
                this.state.gameOver();
            }
        }

        getPower()
        {
            this.currentPower = this.currentPower + 10;
            if (this.currentPower > 200)
            {
                this.currentPower = 200;
            }
        
            this.game.add.tween(this.powerBarSprite).to({ width: this.currentPower }, 100, Phaser.Easing.Linear.None, true);
        }
    }
}