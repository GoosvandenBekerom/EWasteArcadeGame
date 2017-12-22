module EwasteGameObjects {
    export class Bin extends Phaser.Sprite{
        game: Phaser.Game;
        player: Phaser.Sprite;
		collectWasteTypeState: WasteType;
		red: Phaser.Sprite;
		green: Phaser.Sprite;
		blue: Phaser.Sprite;

		minScale = 0.1;
		maxScale = -0.2;
		
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

			this.red.scale.setTo(0.1);
			this.green.scale.setTo(0.1);
			this.blue.scale.setTo(0.1);
		}

		update() {
			this.red.position.x = this.player.x + 47;
			this.green.position.x = this.player.x + 67;
			this.blue.position.x = this.player.x + 87;

			this.red.position.y = this.player.y + 20;
			this.green.position.y = this.player.y + 20;
			this.blue.position.y = this.player.y + 20;

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