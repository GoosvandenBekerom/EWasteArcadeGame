module EWasteUtils {
    export class DynamicLevelControl {
        spawnLevel: EwasteGameObjects.SpawnLevel;
        amountOfRoundsDone: number;
        lastLevelScore: number;
        fakeScore: boolean;

        constructor()
        {
            this.spawnLevel = EwasteGameObjects.SpawnLevel.Level_1;
            this.amountOfRoundsDone = 0;
            this.lastLevelScore = 0;
            this.fakeScore = false;
        }

        getSpawnLevel(playerScore: number): EwasteGameObjects.SpawnLevel
		{
			return EwasteGameObjects.SpawnLevel.Level_10;
			/*
            let newLevel = EwasteGameObjects.SpawnLevel.Level_0;
            if (this.amountOfRoundsDone % 5 == 0 && this.amountOfRoundsDone > 0)
            {  
                this.lastLevelScore = playerScore;
                this.amountOfRoundsDone = 0;
                if (this.spawnLevel != EwasteGameObjects.SpawnLevel.Level_10) {
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

                if (playerScore - this.lastLevelScore >= 75 * 6) {
                    this.fakeScore = true;
                    this.amountOfRoundsDone = 5;
                    return this.getSpawnLevel(playerScore);
                }
                newLevel = this.spawnLevel;
            }

            this.amountOfRoundsDone++;
            return newLevel;
			*/
        }
    }
}