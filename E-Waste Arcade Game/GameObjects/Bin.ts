module EwasteGameObjects {
    export class Bin extends Phaser.Sprite{
        game: Phaser.Game;
        player: Phaser.Sprite;
		collectWasteTypeState: WasteType;
		red: Phaser.Sprite;
		green: Phaser.Sprite;
		blue: Phaser.Sprite;

		minScale = 0.1;
		maxScale = -0.1;

		position1x = 0;
		position2x = 0;
		position3x = 0;
		
        //Red = 0xED6B6B --- WASTETYPE 2
        //Green = 0x69F551 --- WASTETYPE 1
        //Blue = 0x515CF5 --- WASTETYPE 3

		constructor(game: Phaser.Game, player: Phaser.Sprite, x: number, y: number, red: Phaser.Sprite, green: Phaser.Sprite, blue: Phaser.Sprite) {
            super(game, x, y, null);
            this.game = game;
			this.player = player;
            this.player.tint = 0x69F551;
			this.collectWasteTypeState = WasteType.WASTE_1;

			this.red = red;
			this.green = green;
			this.blue = blue;

			this.game.physics.enable(this.red);
			this.game.physics.enable(this.green);
			this.game.physics.enable(this.blue);

			this.red.scale.setTo(0.1);
			this.green.scale.setTo(0.1);
			this.blue.scale.setTo(0.1);

			this.player.addChild(this.red);
			this.player.addChild(this.green);
			this.player.addChild(this.blue);

			this.red.position.y = 20;
			this.green.position.y = 20;
			this.blue.position.y = 20;
		}

		update() {
			this.updateBinPosition();

			if (this.collectWasteTypeState == WasteType.WASTE_2) {
				//red
				this.scaleBins(this.red, this.green, this.blue);
			} else if (this.collectWasteTypeState == WasteType.WASTE_1) {
				//green
				this.scaleBins(this.green, this.red, this.blue);
			} else if (this.collectWasteTypeState == WasteType.WASTE_3) {
				//blue
				this.scaleBins(this.blue, this.red, this.green);
			}

			this.game.world.bringToTop(this.red);
			this.game.world.bringToTop(this.green);
			this.game.world.bringToTop(this.blue);
		}

		scaleBins(current, other1, other2) {
			if (current.scale.y >= this.maxScale) {
				current.scale.setTo(current.scale.x, current.scale.y - 0.02);
			}

			if (other1.scale.y <= this.minScale) {
				other1.scale.setTo(other1.scale.x, other1.scale.y + 0.02);
			}

			if (other2.scale.y <= this.minScale) {
				other2.scale.setTo(other2.scale.x, other2.scale.y + 0.02);
			}
		}

        changeCollectorBinClockwise() {
            switch (this.collectWasteTypeState) {
                case WasteType.WASTE_1: {
                    this.changeToWaste2();
                    break;
                }
                case WasteType.WASTE_2: {
                    this.changeToWaste3();
                    break;
                }
                case WasteType.WASTE_3: {
                    this.changeToWaste1();
                    break;
                }
            }
        }

        changeCollectorBinAntiClockwise() {
            switch (this.collectWasteTypeState) {
                case WasteType.WASTE_1: {
                    this.changeToWaste3();
                    break;
                }
                case WasteType.WASTE_2: {
                    this.changeToWaste1();
                    break;
                }
                case WasteType.WASTE_3: {
                    this.changeToWaste2();
                    break;
                }
            }
        }

		private updateBinPosition() {
			this.position1x = 47;
			this.position2x = 67;
			this.position3x = 87;

			var movementPerFrame = 60;
			var maxTime = 100;

			if (this.collectWasteTypeState == WasteType.WASTE_1) {
				this.game.physics.arcade.moveToXY(this.red, this.position1x, this.red.position.y, movementPerFrame, maxTime);
				this.game.physics.arcade.moveToXY(this.green, this.position2x, this.green.position.y, movementPerFrame, maxTime);
				this.game.physics.arcade.moveToXY(this.blue, this.position3x, this.blue.position.y, movementPerFrame, maxTime);

			} else if (this.collectWasteTypeState == WasteType.WASTE_2) {
				this.game.physics.arcade.moveToXY(this.blue, this.position1x, this.blue.position.y, movementPerFrame, maxTime);
				this.game.physics.arcade.moveToXY(this.red, this.position2x, this.red.position.y, movementPerFrame, maxTime);
				this.game.physics.arcade.moveToXY(this.green, this.position3x, this.green.position.y, movementPerFrame, maxTime);
				
			} else if (this.collectWasteTypeState == WasteType.WASTE_3) {
				this.game.physics.arcade.moveToXY(this.green, this.position1x, this.green.position.y, movementPerFrame, maxTime);
				this.game.physics.arcade.moveToXY(this.blue, this.position2x, this.blue.position.y, movementPerFrame, maxTime);
				this.game.physics.arcade.moveToXY(this.red, this.position3x, this.red.position.y, movementPerFrame, maxTime);
			}
		}

        private changeToWaste1() {
            this.collectWasteTypeState = WasteType.WASTE_1;
			this.player.tint = 0x69F551;
        }

        private changeToWaste2() {
            this.collectWasteTypeState = WasteType.WASTE_2;
			this.player.tint = 0xED6B6B;
        }

        private changeToWaste3() {
            this.collectWasteTypeState = WasteType.WASTE_3;
			this.player.tint = 0x515CF5;
        }
    }
}