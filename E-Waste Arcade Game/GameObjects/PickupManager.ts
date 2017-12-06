module EwasteGameObjects {
    export class PickupManager extends Phaser.Group {
        game: Phaser.Game;
        state: Phaser.State;
        player: EwasteGameObjects.Player
        spawning: boolean;
        spawnedPickups: Phaser.LinkedList;

        constructor(game: Phaser.Game, state: Phaser.State, player: EwasteGameObjects.Player) {
            super(game);
            this.game = game;
            this.state = state;
            this.player = player;
            this.spawnedPickups = new Phaser.LinkedList;
            this.spawning = false;
        }
        
        update() {
            if (!this.spawning) {
                this.spawning = true;
                this.game.time.events.add(Phaser.Timer.SECOND * 4, this.spawnPickup, this);
            }
        }
        
        spawnPickup() {
            var pickup = "";
            var randomNumber = this.game.rnd.integerInRange(1, 3);

            if (randomNumber == 1) {
                pickup = "apple";
            } else if (randomNumber == 2) {
                pickup = "phone";
            } else {
                pickup = "can";
            }

            var spawnedObject = this.state.add.sprite(this.player.position.x + this.game.width,
                this.game.rnd.integerInRange(100, this.game.height - 100), pickup, this);
            
            this.spawnedPickups.add(spawnedObject);

            this.despawnOutOfScreen();
            this.spawning = false;
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
    }

} 