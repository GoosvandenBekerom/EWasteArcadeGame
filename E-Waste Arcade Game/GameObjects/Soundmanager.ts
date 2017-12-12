module EwasteGameObjects {
    export class SoundManager extends Phaser.Group {
        game: Phaser.Game;
        music: Phaser.Sound;
        damage: Phaser.Sound;
        landing: Phaser.Sound;
        pickupBad: Phaser.Sound;
        pickupGood: Phaser.Sound;

        constructor(game: Phaser.Game) {
            super(game);
            this.game = game;

            this.music = this.game.add.audio("BackgoundLoop");
            this.damage = this.game.add.audio("damage");
            this.landing = this.game.add.audio("landing");
            this.pickupBad = this.game.add.audio("pickupBad");
            this.pickupGood = this.game.add.audio("pickupGood");

            this.music.volume = 0.3;
            this.music.loop = true;
            this.music.play();
        }

        public stopMusic() {
            this.music.stop();
        }

        public playSound(key) {
            if (key === "damage") {
                this.damage.play();
            } else if (key === "landing") {
                this.landing.play();
            } else if (key === "pickupBad") {
                this.pickupBad.play();
            } else if (key === "pickupGood") {
                this.pickupGood.play();
            }
        }
    }
}