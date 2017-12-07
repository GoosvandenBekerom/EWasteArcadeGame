module EwasteGameObjects {
    export class ObstacleManager extends Phaser.Group {
        game: Phaser.Game;
        state: Phaser.State;
        player: EwasteGameObjects.Player
        spawning: boolean;
        spawnedObstacles: Phaser.LinkedList;

        constructor(game: Phaser.Game, state: Phaser.State, player: EwasteGameObjects.Player) {
            super(game);
            this.game = game;
            this.state = state;
            this.player = player;
            this.spawnedObstacles = new Phaser.LinkedList;
            this.spawning = false;
        }

        spawnObstacle(x: number, y: number, width: number) {
            var height = 38; // height of current obstacle texture
            var obstacle = new EwasteGameObjects.Obstacle(this.game, x, y, width, height, "obstacle1");

            this.add(obstacle);
            this.state.add.existing(obstacle);
            this.spawnedObstacles.add(obstacle);

            this.game.world.bringToTop(this.player);

            this.despawnOutOfScreen();
            this.spawning = false;
        }

        despawnOutOfScreen() {
            for (var i = 0; i < this.spawnedObstacles.total; i++) {
                var pulledObj = this.spawnedObstacles.next;
                if (!pulledObj.inCamera) {
                    pulledObj.destroy();
                    this.spawnedObstacles.remove(pulledObj);
                }
            }
        }
    }

} 