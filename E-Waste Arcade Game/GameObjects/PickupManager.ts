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
        
        spawnPickup(x: number, y: number) {
            var tag = "";
            var type: WasteType;
            var randomNumber = this.game.rnd.integerInRange(1, 3);

            if (randomNumber == 1) {
                tag = "apple";
                type = WasteType.WASTE_1;
            } else if (randomNumber == 2) {
                tag = "phone";
                type = WasteType.WASTE_2;
            } else {
                tag = "can";
                type = WasteType.WASTE_3;
            }
            
            var pickup = new EwasteGameObjects.Pickup(this.game, type, x, y, tag);

            /*pickup.checkWorldBounds = true;
            pickup.events.onOutOfBounds(PickupManager.prototype.despawnPickup, this);*/

            this.add(pickup);
            this.game.world.bringToTop(this);

            this.spawnedPickups.add(pickup);
            this.despawnOutOfScreen();
        }

        despawnOutOfScreen() {
            for (var i = 0; i < this.spawnedPickups.total; i++) {
                var pulledObj = this.spawnedPickups.next;
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