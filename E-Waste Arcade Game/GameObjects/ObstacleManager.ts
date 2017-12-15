module EwasteGameObjects {
    export class ObstacleManager extends Phaser.Group {
        game: Phaser.Game;
        state: Phaser.State;
        player: EwasteGameObjects.Player
        spawning: boolean;
        spawnedObstacles: Phaser.LinkedList;

        constructor(game: Phaser.Game, state: Phaser.State) {
            super(game);
            this.game = game;
            this.state = state;
            this.spawnedObstacles = new Phaser.LinkedList;
            this.spawning = false;
            this.enableBody = true;
            this.physicsBodyType = Phaser.Physics.ARCADE;
            this.game.physics.arcade.enable(this);
        }

        spawnObstacle(x: number, y: number) {

            var tag = "obstacle_" + this.game.rnd.integerInRange(1, 2).toString();

            var obstacle = new EwasteGameObjects.Obstacle(this.game, x, y, tag);

            /*pickup.checkWorldBounds = true;
            pickup.events.onOutOfBounds(PickupManager.prototype.despawnPickup, this);*/

            this.add(obstacle);
            this.game.world.bringToTop(this);

            this.spawnedObstacles.add(obstacle);
            this.despawnOutOfScreen();
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

        despawnPickup(pickup: EwasteGameObjects.Obstacle) {
            pickup.kill();
            this.spawnedObstacles.remove(pickup);
        }
    }

} 