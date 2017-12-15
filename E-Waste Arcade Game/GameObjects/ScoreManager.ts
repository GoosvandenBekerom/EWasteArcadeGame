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

        constructor(game: Phaser.Game, ui: GUI, state: EWasteGameStates.MainState) {
            this.game = game;
            this.state = state;
			this.ui = ui

			EWasteUtils.StorageControl.setStorage("recycle1", 0);
			EWasteUtils.StorageControl.setStorage("recycle2", 0);
			EWasteUtils.StorageControl.setStorage("recycle3", 0);

			EWasteUtils.StorageControl.setStorage("recycleKind1", "Papier");
			EWasteUtils.StorageControl.setStorage("recycleKind2", "Elektrisch afval");
			EWasteUtils.StorageControl.setStorage("recycleKind3", "PMD");
        }

        updateDistance(distance: number) {	
            this.distanceScore = Math.floor(distance);
            //this.ui.updateScore(this.distanceScore);
        }

        getDistanceScore() {
            return this.distanceScore;
        }

        addToWasteScore(type: WasteType, amount: number = 1) {
            this.ui.powerBar.getPower();
            switch (type) {
                case WasteType.WASTE_1: {
                    this.waste1Amount += amount;
					this.waste1Score += this.waste1PickUpPoints;
					EWasteUtils.StorageControl.setStorage("recycle1", this.waste1Amount);
                    break;
                }
                case WasteType.WASTE_2: {
                    this.waste2Amount += amount;
					this.waste2Score += this.waste2PickUpPoints;
					EWasteUtils.StorageControl.setStorage("recycle2", this.waste2Amount);
                    break;
                }
                case WasteType.WASTE_3: {
                    this.waste3Amount += amount;
					this.waste3Score += this.waste3PickUpPoints;
					EWasteUtils.StorageControl.setStorage("recycle3", this.waste3Amount);
                    break;
                }
            }
            this.ui.updateScore(this.getTotalScore());
        }

        loseLife(amountOfPower: number) {
            this.ui.powerBar.losePower(amountOfPower);
        }

        getTotalScore(): number
        {
            return this.waste1Score + this.waste2Score + this.waste3Score;
        }
    }
}