module EWasteGameStates {

    export class MainState extends Phaser.State {
        game: Phaser.Game;
        player: EwasteGameObjects.Player;

        startOffset = 50;
        
        create() {
            this.player = new EwasteGameObjects.Player(
                this.game, this.startOffset, this.game.height - this.startOffset);

            this.game.add.existing(this.player);
        }
    }
}