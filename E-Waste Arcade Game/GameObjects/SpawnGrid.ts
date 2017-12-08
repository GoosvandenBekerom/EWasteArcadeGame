module EwasteGameObjects {
    export enum SpawnTemplate { Empty, Pickups, Platforms, Obstacles, PickupPlatforms, PickupObstacles, PickupPlatformObstacles }

    export class SpawnGrid {
        game: Phaser.Game;
        gridLanes: Array<number>; // y-positions for spawns
        pickupManager: PickupManager;
        platformManager: PlatformManager;

        constructor(game: Phaser.Game, gridLanes: Array<number>, pickupManager: PickupManager, obstacleManager: PlatformManager) {
            this.game = game;
            this.gridLanes = gridLanes;
            this.pickupManager = pickupManager;
            this.platformManager = obstacleManager;
        }

        getRandomTemplateType() {
            switch (this.game.rnd.integerInRange(2, 3)) { // todo make equal to length of enum
                case 1: return SpawnTemplate.Empty;
                case 2: return SpawnTemplate.Pickups
                case 3: return SpawnTemplate.Platforms;
                case 4: return SpawnTemplate.Obstacles;
                case 5: return SpawnTemplate.PickupPlatforms;
                case 6: return SpawnTemplate.PickupObstacles;
                case 7: return SpawnTemplate.PickupPlatformObstacles;
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
                case SpawnTemplate.Platforms: {
                    console.log("platform template spawned");
                    var y = this.gridLanes[1]; // make this more dynamic
                    this.platformManager.spawnPlatform(startPosX, y, this.game.width);
                    break;
                }
                case SpawnTemplate.Obstacles: {
                    console.log("obstacle template not implemented yet");
                    break;
                }
                case SpawnTemplate.PickupPlatforms: {
                    console.log("pickup/platforms template not implemented yet");
                    break;
                }
                case SpawnTemplate.PickupObstacles: {
                    console.log("pickup/obstacles template not implemented yet");
                    break;
                }
                case SpawnTemplate.PickupPlatformObstacles: {
                    console.log("pickup/platforms/obstacles template not implemented yet");
                    break;
                }
            }
        }
    }
}