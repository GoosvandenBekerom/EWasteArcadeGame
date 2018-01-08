module EWasteUtils {
    export class Highscore {
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