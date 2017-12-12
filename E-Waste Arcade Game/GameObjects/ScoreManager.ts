module EwasteGameObjects {
    export class ScoreManager {
        game: Phaser.Game;
        state: EWasteGameStates.MainState;
        ui: GUI;

        private distanceScore: number;
        private waste1Score = 0;
        private waste2Score = 0;
        private waste3Score = 0;

        private lives: number;

        constructor(game: Phaser.Game, ui: GUI, state: EWasteGameStates.MainState) {
            this.game = game;
            this.state = state;
            this.ui = ui;
        }

        updateDistance(distance: number) {
            this.distanceScore = Math.floor(distance);
            this.ui.updateScore(this.distanceScore);
        }

        getDistanceScore() {
            return this.distanceScore;
        }

        addToWasteScore(type: WasteType, amount: number = 1) {
            console.log(type);
            this.ui.PowerBarGetPower();
            switch (type) {
                case WasteType.WASTE_1: {
                    this.waste1Score += amount;
                    break;
                }
                case WasteType.WASTE_2: {
                    this.waste2Score += amount;
                    break;
                }
                case WasteType.WASTE_3: {
                    this.waste3Score += amount;
                    break;
                }
            }
        }

        loseLife() {
            if (this.ui.PowerBarlosePower()) {
                this.state.gameOver();
            }
            return this.lives;
        }
    }
}