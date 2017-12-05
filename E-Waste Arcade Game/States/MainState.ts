﻿module EWasteGameStates {

    export class MainState extends Phaser.State {
        game: Phaser.Game;
        music: Phaser.Sound;
        player: EwasteGameObjects.Player;
        scene: EwasteGameObjects.Scene;

        ESC: Phaser.Key;

        startOffset = 100;
        amountOfBackgroundRepeats = 10000;
        
        create() {
            var widthBounds = this.game.width * this.amountOfBackgroundRepeats;
            this.scene = new EwasteGameObjects.Scene(this.game, 0, 0, widthBounds);
            
            this.player = new EwasteGameObjects.Player(
                this.game, this.startOffset, this.game.height / 2, widthBounds);

            this.game.add.existing(this.scene);
            this.game.add.existing(this.player);

            this.game.world.setBounds(0, 0, widthBounds, this.scene.height);

            this.ESC = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
            this.ESC.onDown.add(EWasteGameStates.MainState.prototype.GameOver, this);

            this.music = this.game.add.audio("BackgoundLoop");
            this.music.volume = 0.4;
            this.music.loop = true;
            this.music.play();
        }

        GameOver() {
            this.music.stop();
            this.game.state.start("GameOverState");
        }
    }
}