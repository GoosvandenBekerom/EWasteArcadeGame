module EwasteGameObjects {
    export class ScoreManager {
        game: Phaser.Game;
        ui: GUI;

        private distanceScore: number;
        private waste1Score: number;
        private waste2Score: number;
        private waste3Score: number;

        private lives: number;

        constructor(game: Phaser.Game, ui: GUI) {
            this.game = game;
            this.lives = 3;
        }

        updateDistance(distance: number) {
            this.distanceScore = Math.floor(distance);
            this.ui.updateScore(this.distanceScore);
        }

        addToWasteScore(type: WasteType, amount: number = 1) {
            switch (type) {
                case WasteType.WASTE_1: this.waste1Score += amount;
                case WasteType.WASTE_2: this.waste2Score += amount;
                case WasteType.WASTE_3: this.waste3Score += amount;
            }
        }

        loseLife(): number {
            this.lives--;
            this.ui.updateLives(this.lives);
            return this.lives;
        }
    }
}