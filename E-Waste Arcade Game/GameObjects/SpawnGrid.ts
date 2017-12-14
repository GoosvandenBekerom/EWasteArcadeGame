module EwasteGameObjects {
    export enum SpawnLevel { Level_0, Level_1, Level_2, Level_3, Level_4, Level_5, Level_6, Level_7, Level_8, Level_9, Level_10 }
    export class TemplateValues {
        public static readonly NONE = 0;
        public static readonly PLATFORM = 1;
        public static readonly OBSTACLE = 2;
        public static readonly WASTE_1 = 3;
        public static readonly WASTE_2 = 4;
        public static readonly WASTE_3 = 5;
    }

    export class SpawnGrid {
        game: Phaser.Game;
        pickupManager: PickupManager;
        platformManager: PlatformManager;
        obstacleManager: ObstacleManager;

        gridRows: Array<number>; // y-positions for spawns
        gridColumns: number; // amount of columns per screen/level

        constructor(game: Phaser.Game, pickupManager: PickupManager, platformManager: PlatformManager, obstacleManager: ObstacleManager) {
            this.game = game;
            this.pickupManager = pickupManager;
            this.platformManager = platformManager;
            this.obstacleManager = obstacleManager;

            // GRID
            this.gridRows = new Array(5);
            let distBetween = this.game.height / 7;
            this.gridRows[0] = distBetween;
            this.gridRows[1] = distBetween * 2;
            this.gridRows[2] = distBetween * 3;
            this.gridRows[3] = distBetween * 4;
            this.gridRows[4] = distBetween * 5;

            this.gridColumns = 5;
        }

        getRandomTemplateType() {
            switch (this.game.rnd.integerInRange(1, 11)) {
                case 1: return SpawnLevel.Level_0;
                case 2: return SpawnLevel.Level_1;
                case 3: return SpawnLevel.Level_2;
                case 4: return SpawnLevel.Level_3;
                case 5: return SpawnLevel.Level_4;
                case 6: return SpawnLevel.Level_5;
                case 7: return SpawnLevel.Level_6;
                case 8: return SpawnLevel.Level_7;
                case 9: return SpawnLevel.Level_8;
                case 10: return SpawnLevel.Level_9;
                case 11: return SpawnLevel.Level_10;
            }
        }

        generateNext(templateType: SpawnLevel, startPosX: number) {
            let template = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];
            // TODO: get templates from files
            switch (templateType) {
                case SpawnLevel.Level_0: {
                    break;
                }
                case SpawnLevel.Level_1: {
                    template = [
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 3, 0, 0],
                        [0, 3, 0, 4, 0],
                        [3, 0, 0, 0, 5]
                    ];
                    break;
                }
                case SpawnLevel.Level_2: {
                    template = [
                        [0, 0, 0, 0, 1],
                        [0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 3],
                        [1, 0, 0, 0, 4],
                        [0, 0, 0, 0, 5]
                    ];
                    break;
                }
                case SpawnLevel.Level_3: {
                    template = [
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 2, 0, 0]
                    ];
                    break;
                }
                case SpawnLevel.Level_4: {
                    template = [
                        [0, 0, 0, 3, 3],
                        [0, 0, 1, 1, 1],
                        [0, 0, 3, 4, 5],
                        [1, 1, 1, 1, 1],
                        [0, 0, 5, 5, 0]
                    ];
                    break;
                }
                case SpawnLevel.Level_5: {
                    template = [
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 3, 0, 0],
                        [0, 3, 0, 4, 0],
                        [3, 0, 2, 0, 4]
                    ];
                    break;
                }
                case SpawnLevel.Level_6: {
                    template = [
                        [0, 0, 0, 3, 3],
                        [0, 0, 1, 1, 0],
                        [0, 0, 0, 4, 0],
                        [1, 1, 1, 1, 1],
                        [0, 2, 5, 5, 5]
                    ];
                    break;
                }
                case SpawnLevel.Level_7: {
                    
                    break;
                }
                case SpawnLevel.Level_8: {
                    
                    break;
                }
                case SpawnLevel.Level_9: {
                    
                    break;
                }
                case SpawnLevel.Level_10: {
                    
                    break;
                }
            }

            // actually generate the level
            let distBetweenSpawns = this.game.width / this.gridColumns;

            for (let row = 0; row < this.gridRows.length; row++) {
                for (let col = 0; col < this.gridColumns; col++) {
                    var x = ((col + 1) * distBetweenSpawns) + startPosX;
                    var y = this.gridRows[row];

                    if (template[row][col] == TemplateValues.WASTE_1) {
                        this.pickupManager.spawnPickup(x, y, WasteType.WASTE_1);
                    }
                    else if (template[row][col] == TemplateValues.WASTE_2) {
                        this.pickupManager.spawnPickup(x, y, WasteType.WASTE_2);
                    }
                    else if (template[row][col] == TemplateValues.WASTE_3) {
                        this.pickupManager.spawnPickup(x, y, WasteType.WASTE_3);
                    }
                    else if (template[row][col] == TemplateValues.PLATFORM) {
                        if (col == 0 || template[row][col - 1] != TemplateValues.PLATFORM) {

                            let platformLength = 1;
                            for (let i = col + 1; i < template[row].length; i++) {
                                if (template[row][i] == TemplateValues.PLATFORM) {
                                    platformLength++;
                                } else {
                                    break;
                                }
                            }
                            
                            this.platformManager.spawnPlatform(x, y, platformLength * distBetweenSpawns);
                        }
                    }
                    else if (template[row][col] == TemplateValues.OBSTACLE) {
                        this.obstacleManager.spawnObstacle(x, y);
                    }
                }
            }
        }
    }
}