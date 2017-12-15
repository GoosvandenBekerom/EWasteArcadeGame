﻿module EwasteGameObjects {
    export class Bin extends Phaser.Sprite{
        game: Phaser.Game;
        player: Phaser.Sprite;
        collectWasteTypeState: WasteType;

        //Red = 0xED6B6B
        //Green = 0x69F551
        //Blue = 0x515CF5

        constructor(game: Phaser.Game, player: Phaser.Sprite, x: number, y: number) {
            super(game, x, y, "rgb");
            this.game = game;
			this.player = player;
			this.fixedToCamera = true;
			this.scale.setTo(0.66);
            this.player.tint = 0x69F551;
            this.collectWasteTypeState = WasteType.WASTE_1;
        }

        changeCollectorBin() {
            switch (this.collectWasteTypeState) {
                case WasteType.WASTE_1: {
                    this.collectWasteTypeState = WasteType.WASTE_2;
					this.player.tint = 0xED6B6B;
					this.loadTexture("brg");
                    break;
                }
                case WasteType.WASTE_2: {
                    this.collectWasteTypeState = WasteType.WASTE_3;
					this.player.tint = 0x515CF5;
					this.loadTexture("gbr");
                    break;
                }
                case WasteType.WASTE_3: {
                    this.collectWasteTypeState = WasteType.WASTE_1;
					this.player.tint = 0x69F551;
					this.loadTexture("rgb");
                    break;
                }
            }
        }
    }
}