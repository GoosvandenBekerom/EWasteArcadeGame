module EWasteUtils {
    export class JoystickInput {
        game: Phaser.Game;

        UP: Phaser.Key;
        DOWN: Phaser.Key;
        LEFT: Phaser.Key;
        RIGHT: Phaser.Key;
        YELLOW: Phaser.Key;
        GREEN: Phaser.Key;

        constructor(game: Phaser.Game,
            up: number,down: number,
            left: number,right: number,
            yellow: number, green: number)
        {
            this.game = game;

            this.UP = this.game.input.keyboard.addKey(up);
            this.DOWN = this.game.input.keyboard.addKey(down);
            this.LEFT = this.game.input.keyboard.addKey(left);
            this.RIGHT = this.game.input.keyboard.addKey(right);
            this.YELLOW = this.game.input.keyboard.addKey(yellow);
            this.GREEN = this.game.input.keyboard.addKey(green);
        }
    }
}