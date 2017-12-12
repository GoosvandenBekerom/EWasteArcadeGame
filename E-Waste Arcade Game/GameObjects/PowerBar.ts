module EwasteGameObjects {
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
            this.timer.loop(1000/*speed*/, this.loserPowerOnTime, this);
            this.timer.start();
        }

        loserPowerOnTime()
        {
            this.currentPower = this.currentPower - 2;
            this.game.add.tween(this.powerBarSprite).to({ width: this.currentPower }, 500, Phaser.Easing.Linear.None, true);
            if (this.currentPower <= 0)
            {
                this.state.gameOver();
            }
        }

        losePower(): number
        {
            this.currentPower = this.currentPower - 20;
            this.game.add.tween(this.powerBarSprite).to({ width: this.currentPower }, 200, Phaser.Easing.Linear.None, true);
            return this.currentPower;
        }

        getPower()
        {
            this.currentPower = this.currentPower + 5;
            if (this.currentPower > 200)
            {
                this.currentPower = 200;
            }
        
            this.game.add.tween(this.powerBarSprite).to({ width: this.currentPower }, 200, Phaser.Easing.Linear.None, true);
        }
    }
}