module EWasteUtils {
    export class DynamicLevelControl {
        spawnLevel: EwasteGameObjects.SpawnLevel;
        scoreManager: EwasteGameObjects.ScoreManager;
        amountOfRoundsDone: number;
        lastLevelScore: number;
        fakeScore: boolean;

        constructor(scoreManager: EwasteGameObjects.ScoreManager)
        {
            this.scoreManager = scoreManager;
            this.spawnLevel = EwasteGameObjects.SpawnLevel.Level_1;
            this.amountOfRoundsDone = 0;
            this.lastLevelScore = 0;
            this.fakeScore = false;
        }

        getSpawnLevel(playerScore: number): EwasteGameObjects.SpawnLevel
		{
            if (this.amountOfRoundsDone % 5 == 0 && this.amountOfRoundsDone > 0)
            {  
                this.lastLevelScore = playerScore;
                this.amountOfRoundsDone = 0;
                if (this.spawnLevel != EwasteGameObjects.SpawnLevel.Level_8) {
                    this.spawnLevel++;
                }
            }
            else
            {
                //DYNAMIC
                if (this.fakeScore) {
                    this.lastLevelScore = playerScore;
                    this.fakeScore = false;
                }

                if (playerScore - this.lastLevelScore >= this.scoreManager.wastePickupScore * 6) {
                    this.fakeScore = true;
                    this.amountOfRoundsDone = 5;
                    return this.getSpawnLevel(playerScore);
                }
            }

            this.amountOfRoundsDone++;
            return this.spawnLevel;
        }
    }
}