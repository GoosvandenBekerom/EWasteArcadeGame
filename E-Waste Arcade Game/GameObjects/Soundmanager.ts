module EwasteGameObjects {
    export class SoundManager extends Phaser.Group {
        game: Phaser.Game;
        music: Phaser.Sound;
        damage: Phaser.Sound;
        landing: Phaser.Sound;
        pickupBad: Phaser.Sound;
        pickupGood: Phaser.Sound;
        walking: Phaser.Sound;

        constructor(game: Phaser.Game) {
            super(game);
            this.game = game;

            this.music = this.game.add.audio("BackgoundLoop");
            this.damage = this.game.add.audio("damage");
            this.landing = this.game.add.audio("landing");
            this.pickupBad = this.game.add.audio("pickupBad");
            this.pickupGood = this.game.add.audio("pickupGood");
            this.walking = this.game.add.audio("walking");

            this.music.volume = 0.1;
            this.music.loop = true;
            this.music.play();

            this.walking.volume = 0.1;
            this.walking.loop = true;
            this.walking.play();
        }

        public stopMusic() {
            this.music.stop();
            this.walking.stop();
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
            } else if (key === "walking") {
                this.walking.play();
            }
        }
    }
}