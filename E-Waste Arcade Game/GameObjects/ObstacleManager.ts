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

        update() {
            if (!this.spawning) {
                this.spawning = true;
                this.game.time.events.add(Phaser.Timer.SECOND * 4, this.spawnPickup, this);
            }
        }

        spawnPickup() {
            var tag = "obstacle1";
            var randomNumber = this.game.rnd.integerInRange(1, 3);

            // TODO: create some kind of spawngrid
            var xPos = this.player.position.x + this.game.width;
            var yPos = this.game.rnd.integerInRange(100, this.game.height - 200);

            var obstacle = new EwasteGameObjects.Obstacle(this.game, xPos, yPos, tag);

            this.add(obstacle);
            this.state.add.existing(obstacle);
            this.spawnedObstacles.add(obstacle); 

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