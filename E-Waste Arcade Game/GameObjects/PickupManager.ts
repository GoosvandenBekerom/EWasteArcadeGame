module EwasteGameObjects {
    export class PickupManager extends Phaser.Group {
        game: Phaser.Game;
        state: Phaser.State;
        player: EwasteGameObjects.Player
        spawning: boolean;
        spawnedPickups: Phaser.LinkedList;

        constructor(game: Phaser.Game, state: Phaser.State) {
            super(game);
            this.game = game;
            this.state = state;
            this.spawnedPickups = new Phaser.LinkedList;
            this.spawning = false;
            this.enableBody = true;
            this.physicsBodyType = Phaser.Physics.ARCADE;
            this.game.physics.arcade.enable(this);
        }
        
        spawnPickup(x: number, y: number, type: WasteType) {
            let tag = "";
            let rnd = this.game.rnd.integerInRange(1, 3);
            switch (type) {
                case WasteType.WASTE_1: {
                    tag = "waste1_" + rnd;
                    break;
                }
                case WasteType.WASTE_2: {
                    tag = "waste2_" + rnd;
                    break;
                }
                case WasteType.WASTE_3: {
                    tag = "waste3_" + rnd;
                    break;
                }
            }
            
            let pickup = new EwasteGameObjects.Pickup(this.game, type, x, y, tag);

            /*pickup.checkWorldBounds = true;
            pickup.events.onOutOfBounds(PickupManager.prototype.despawnPickup, this);*/

            this.add(pickup);
            this.game.world.bringToTop(this);

            this.spawnedPickups.add(pickup);
            this.despawnOutOfScreen();
        }

        despawnOutOfScreen() {
            for (let i = 0; i < this.spawnedPickups.total; i++) {
                let pulledObj = this.spawnedPickups.next;
                if (!pulledObj.inCamera) {
                    pulledObj.destroy();
                    this.spawnedPickups.remove(pulledObj);
                }
            }
        }

        despawnPickup(pickup: EwasteGameObjects.Pickup) {
            pickup.kill();
            this.spawnedPickups.remove(pickup);
        }
    }

} 