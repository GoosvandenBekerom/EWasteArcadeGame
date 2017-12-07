module EwasteGameObjects {
    export enum SpawnTemplate { Empty, Pickups, Obstacles, PickupObstacles }

    export class SpawnGrid {
        game: Phaser.Game;
        gridLanes: Array<number>; // y-positions for spawns
        pickupManager: PickupManager;

        constructor(game: Phaser.Game, gridLanes: Array<number>, pickupManager: PickupManager) {
            this.game = game;
            this.gridLanes = gridLanes;
            this.pickupManager = pickupManager;
        }

        generateNext(template: SpawnTemplate, startPosX: number) {
            // TODO: add something to define ammount of spawns (dynamic difficulty)
            var amountOfSpawns = 4;
            var distBetweenSpawns = this.game.width / amountOfSpawns;

            switch (template) {
                case SpawnTemplate.Empty: {
                    break;
                }
                case SpawnTemplate.Pickups: {
                    for (let i = 1; i < amountOfSpawns + 1; i++) {
                        var y = this.game.rnd.pick(this.gridLanes);
                        var x = i * distBetweenSpawns;
                        this.pickupManager.spawnPickup(x, y);
                    }
                    break;
                }
                case SpawnTemplate.Obstacles: {
                    for (let i = 0; i < amountOfSpawns; i++) {

                    }
                    break;
                }
                case SpawnTemplate.PickupObstacles: {
                    for (let i = 0; i < amountOfSpawns; i++) {

                    }
                    break;
                }
            }
        }
    }
}