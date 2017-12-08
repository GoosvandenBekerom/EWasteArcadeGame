module EwasteGameObjects {
    export enum SpawnTemplate { Empty, Pickups, Obstacles, PickupObstacles }

    export class SpawnGrid {
        game: Phaser.Game;
        gridLanes: Array<number>; // y-positions for spawns
        pickupManager: PickupManager;
        obstacleManager: PlatformManager;

        constructor(game: Phaser.Game, gridLanes: Array<number>, pickupManager: PickupManager, obstacleManager: PlatformManager) {
            this.game = game;
            this.gridLanes = gridLanes;
            this.pickupManager = pickupManager;
            this.obstacleManager = obstacleManager;
        }

        getRandomTemplateType() {
            switch (this.game.rnd.integerInRange(1, 3)) { // todo make 4
                case 1: return SpawnTemplate.Empty;
                case 2: return SpawnTemplate.Pickups
                case 3: return SpawnTemplate.Obstacles;
                case 4: return SpawnTemplate.PickupObstacles;
            }
        }

        generateNext(template: SpawnTemplate, startPosX: number) {
            // TODO: add something to define ammount of spawns (dynamic difficulty)
            var amountOfSpawns = 4;
            var distBetweenSpawns = this.game.width / amountOfSpawns;

            switch (template) {
                case SpawnTemplate.Empty: {
                    console.log("empty template spawned");
                    break;
                }
                case SpawnTemplate.Pickups: {
                    console.log("pickups template spawned");
                    for (let i = 1; i < amountOfSpawns + 1; i++) {
                        var x = (i * distBetweenSpawns) + startPosX;
                        var y = this.game.rnd.pick(this.gridLanes);
                        this.pickupManager.spawnPickup(x, y);
                    }
                    break;
                }
                case SpawnTemplate.Obstacles: {
                    console.log("obstacle template spawned");
                    var y = this.gridLanes[1]; // make this more dynamic
                    this.obstacleManager.spawnPlatform(startPosX, y, this.game.width);
                    break;
                }
                case SpawnTemplate.PickupObstacles: {
                    console.log("pickup/obstacles template not implemented yet");
                    for (let i = 0; i < amountOfSpawns; i++) {

                    }
                    break;
                }
            }
        }
    }
}