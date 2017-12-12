module EwasteGameObjects {
    export class ScoreManager {
        game: Phaser.Game;
        state: EWasteGameStates.MainState;
        ui: GUI;

        private distanceScore: number;
        private waste1Score = 0;
        private waste2Score = 0;
        private waste3Score = 0;

        private waste1Amount = 0;
        private waste2Amount = 0;
        private waste3Amount = 0;

        private waste1PickUpPoints = 75;
        private waste2PickUpPoints = 75;
        private waste3PickUpPoints = 75;

        private lives: number;

        constructor(game: Phaser.Game, ui: GUI, state: EWasteGameStates.MainState) {
            this.game = game;
            this.state = state;
            this.ui = ui
        }

        updateDistance(distance: number) {
            this.distanceScore = Math.floor(distance);
            //this.ui.updateScore(this.distanceScore);
        }

        getDistanceScore() {
            return this.distanceScore;
        }

        addToWasteScore(type: WasteType, amount: number = 1) {
            console.log(type);
            this.ui.PowerBarGetPower();
            switch (type) {
                case WasteType.WASTE_1: {
                    this.waste1Amount += amount;
                    this.waste1Score += this.waste1PickUpPoints;
                    break;
                }
                case WasteType.WASTE_2: {
                    this.waste2Amount += amount;
                    this.waste2Score += this.waste2PickUpPoints;
                    break;
                }
                case WasteType.WASTE_3: {
                    this.waste3Amount += amount;
                    this.waste3Score += this.waste3PickUpPoints;
                    break;
                }
            }
            this.ui.updateScore(this.waste1Score + this.waste2Score + this.waste3Score);
        }

        loseLife() {
            if (this.ui.PowerBarlosePower()) {
                this.state.gameOver();
            }
            return this.lives;
        }
    }
}