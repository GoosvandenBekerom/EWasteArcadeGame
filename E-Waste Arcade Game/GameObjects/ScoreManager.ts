module EwasteGameObjects {
    export class ScoreManager {
        game: Phaser.Game;
        state: EWasteGameStates.MainState;
        ui: GUI;

        private distanceScore: number;
        private wasteScore = 0;
        wastePickupScore = 75;

        waste1Amount = 0;
        waste2Amount = 0;
        waste3Amount = 0;

        constructor(game: Phaser.Game, ui: GUI, state: EWasteGameStates.MainState) {
            this.game = game;
            this.state = state;
			this.ui = ui;
        }

        updateDistance(distance: number) {	
            this.distanceScore = Math.floor(distance);
        }

        addToWasteScore(type: WasteType, amount: number = 1) {
            this.ui.powerBar.gainPower(amount * 5);

            switch (type) {
                case WasteType.WASTE_1: {
                    this.waste1Amount += amount;
                    break;
                }
                case WasteType.WASTE_2: {
                    this.waste2Amount += amount;
                    break;
                }
                case WasteType.WASTE_3: {
                    this.waste3Amount += amount;
                    break;
                }
            }

            this.wasteScore += amount * this.wastePickupScore;
            this.ui.updateScore(this.wasteScore);
        }

        loseLife(amountOfPower: number) {
            this.ui.powerBar.losePower(amountOfPower);
        }

        getDistanceScore() {
            return this.distanceScore;
        }

        getTotalScore(): number {
            return this.wasteScore;
        }
    }
}