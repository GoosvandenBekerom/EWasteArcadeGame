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

        // Level templates
        level1: EWasteUtils.LevelTemplate;
        level2: EWasteUtils.LevelTemplate;
        level3: EWasteUtils.LevelTemplate;
        level4: EWasteUtils.LevelTemplate;
        level5: EWasteUtils.LevelTemplate;
        level6: EWasteUtils.LevelTemplate;
        level7: EWasteUtils.LevelTemplate;
        level8: EWasteUtils.LevelTemplate;
        level9: EWasteUtils.LevelTemplate;
        level10: EWasteUtils.LevelTemplate;

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

            this.loadLevelTemplates();
        }

        private loadLevelTemplates() {
            this.level1 = this.game.cache.getJSON("level1");
            this.level2 = this.game.cache.getJSON("level2");
            this.level3 = this.game.cache.getJSON("level3");
            this.level4 = this.game.cache.getJSON("level4");
            this.level5 = this.game.cache.getJSON("level5");
            this.level6 = this.game.cache.getJSON("level6");
            this.level7 = this.game.cache.getJSON("level7");
            this.level8 = this.game.cache.getJSON("level8");
            this.level9 = this.game.cache.getJSON("level9");
            this.level10 = this.game.cache.getJSON("level10");
            console.log(this.level1);
        }

        getRandomTemplateType() {
            switch (this.game.rnd.integerInRange(1, 7)) {
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

        generateNext(templateLevel: SpawnLevel, startPosX: number) {
            let templateToSpawn = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];
            
            switch (templateLevel) {
                case SpawnLevel.Level_0: {
                    break;
                }
                case SpawnLevel.Level_1: {
                    templateToSpawn = this.game.rnd.pick(this.level1.templates);
                    break;
                }
                case SpawnLevel.Level_2: {
                    templateToSpawn = this.game.rnd.pick(this.level2.templates);
                    break;
                }
                case SpawnLevel.Level_3: {
                    templateToSpawn = this.game.rnd.pick(this.level3.templates);
                    break;
                }
                case SpawnLevel.Level_4: {
                    templateToSpawn = this.game.rnd.pick(this.level4.templates);
                    break;
                }
                case SpawnLevel.Level_5: {
                    templateToSpawn = this.game.rnd.pick(this.level5.templates);
                    break;
                }
                case SpawnLevel.Level_6: {
                    templateToSpawn = this.game.rnd.pick(this.level6.templates);
                    break;
                }
                case SpawnLevel.Level_7: {
                    templateToSpawn = this.game.rnd.pick(this.level7.templates);
                    break;
                }
                case SpawnLevel.Level_8: {
                    templateToSpawn = this.game.rnd.pick(this.level8.templates);
                    break;
                }
                case SpawnLevel.Level_9: {
                    templateToSpawn = this.game.rnd.pick(this.level9.templates);
                    break;
                }
                case SpawnLevel.Level_10: {
                    templateToSpawn = this.game.rnd.pick(this.level10.templates);
                    break;
                }
            }

            // actually generate the level
            let distBetweenSpawns = this.game.width / this.gridColumns;

            for (let row = 0; row < this.gridRows.length; row++) {
                for (let col = 0; col < this.gridColumns; col++) {
                    var x = ((col + 1) * distBetweenSpawns) + startPosX;
                    var y = this.gridRows[row];

                    if (templateToSpawn[row][col] == TemplateValues.WASTE_1) {
                        this.pickupManager.spawnPickup(x, y, WasteType.WASTE_1);
                    }
                    else if (templateToSpawn[row][col] == TemplateValues.WASTE_2) {
                        this.pickupManager.spawnPickup(x, y, WasteType.WASTE_2);
                    }
                    else if (templateToSpawn[row][col] == TemplateValues.WASTE_3) {
                        this.pickupManager.spawnPickup(x, y, WasteType.WASTE_3);
                    }
                    else if (templateToSpawn[row][col] == TemplateValues.PLATFORM) {
                        if (col == 0 || templateToSpawn[row][col - 1] != TemplateValues.PLATFORM) {

                            let platformLength = 1;
                            for (let i = col + 1; i < templateToSpawn[row].length; i++) {
                                if (templateToSpawn[row][i] == TemplateValues.PLATFORM) {
                                    platformLength++;
                                } else {
                                    break;
                                }
                            }
                            
                            this.platformManager.spawnPlatform(x, y, platformLength * distBetweenSpawns);
                        }
                    }
                    else if (templateToSpawn[row][col] == TemplateValues.OBSTACLE) {
                        this.obstacleManager.spawnObstacle(x, y);
                    }
                }
            }
        }
    }
}