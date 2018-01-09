module EwasteGameObjects {
    export class PowerBar {
        game: Phaser.Game;
        powerBarSprite: Phaser.Sprite;
        batterySprite: Phaser.Sprite;
        bmd: Phaser.BitmapData;
        currentPower: number;
        timer: Phaser.Timer;
        state: EWasteGameStates.MainState;
        
        powerBarHeight = -105;

        constructor(game: Phaser.Game, x: number, y: number, state: EWasteGameStates.MainState) {
            this.game = game;
            this.state = state;
            // create a new bitmap data object
            this.bmd = game.add.bitmapData(25, -this.powerBarHeight);
            
            this.currentPower = this.powerBarHeight;

            // draw to the canvas context like normal
            this.bmd.ctx.beginPath();
            this.bmd.ctx.rect(0, 0, 25, -this.powerBarHeight);
			this.bmd.ctx.fillStyle = '#c0af00';
            this.bmd.ctx.fill();


            // use the bitmap data as the texture for the sprite
            this.powerBarSprite = this.game.add.sprite(x, y, this.bmd);
            this.powerBarSprite.height = this.powerBarHeight;
            //this.powerBarSprite.fixedToCamera = true;
            this.batterySprite = this.game.add.sprite(x - 2.5, y -13, "battery");
            //this.batterySprite.fixedToCamera = true;
            

            this.timer = this.game.time.create(false);
            this.timer.loop(500/*speed*/, this.loserPowerOnTime, this);
            this.timer.start();
        }

        loserPowerOnTime()
        {
            this.currentPower = this.currentPower + (this.state.player.speed / 100);
            this.powerBarSprite.height = this.currentPower;
            this.checkGameOver();
        }

        losePower(amountOfPower: number)
        {
            this.currentPower = this.currentPower + amountOfPower;
            this.game.add.tween(this.powerBarSprite).to({ height: this.currentPower }, amountOfPower * 10 , Phaser.Easing.Linear.None, true);
        }

        private checkGameOver()
        {
            if (this.currentPower >= 0 && this.state.player.playerState != PlayerState.DYING)
            {
                this.state.gameOver();
            }
        }

        gainPower(amountOfPower: number)
        {
            this.currentPower = this.currentPower - amountOfPower;
            if (this.currentPower < this.powerBarHeight)
            {
                this.currentPower = this.powerBarHeight;
            }
        
            this.game.add.tween(this.powerBarSprite).to({ height: this.currentPower }, 100, Phaser.Easing.Linear.None, true);
        }

        updatePosition(posx: number, posy: number) {
            this.batterySprite.position.y = posy - 130;
            this.batterySprite.position.x = posx - 10;
            this.powerBarSprite.position.y = posy - 13;
            this.powerBarSprite.position.x = posx - 8;
        }
    }
}