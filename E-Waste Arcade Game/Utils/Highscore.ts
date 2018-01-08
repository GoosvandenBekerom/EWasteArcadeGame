module EWasteUtils {
    export class Highscore {
        /*static addScoreOld(score: number, name: string)
        {
            let newScore = "";
            if (StorageControl.getStorage("highscore") != null)
            {
                let scoreStringArray = StorageControl.getStorage("highscore").split(',');

                let scoreIntArray = this.sortScores(scoreStringArray, score);
                let loopAmount = scoreIntArray.length;

                if (loopAmount > 5)
                {
                    loopAmount = 5;
                }

                newScore = scoreIntArray[0].toString()

                for (let i = 1; i < loopAmount; i++)
                {
                    let temp = ',' + scoreIntArray[i].toString();
                    newScore += temp;
                }
            }
            else
            {
                newScore = score.toString();
            }

            StorageControl.setStorage("highscore", newScore);
        }*/

        static addScore(score: number, name: string) {
            let scoreArray = [];
            let highscoreString = StorageControl.getStorage("highscores");
            if (highscoreString != null) {
                scoreArray = JSON.parse(highscoreString);
                scoreArray.push(new Score(score, name));
                
                scoreArray.sort((a, b) => {
                    return b.score - a.score;
                });

                if (scoreArray.length > 5) {
                    scoreArray.pop();
                }
            }
            StorageControl.setStorage("highscores", JSON.stringify(scoreArray));
        }
        
    }
}