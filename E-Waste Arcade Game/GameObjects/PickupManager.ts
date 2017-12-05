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
            var randomNumber = Math.random();

            if (randomNumber <= 0.33) {
                pickup = "apple";
            } else if (randomNumber <= 0.66) {
                pickup = "phone";
            } else {
                pickup = "can";
            }

            var spawnedObject = this.state.add.sprite(this.player.position.x + this.game.width, (Math.random() * (this.game.height - 100)), pickup, this);
            spawnedObject.scale.setTo(0.3, 0.3);
            this.spawnedPickups.add(spawnedObject);
            this.despawnPreviousItems();
            this.spawning = false;
        }

        despawnPreviousItems() {
            for (var i = 0; i < this.spawnedPickups.total; i++) {
                var pulledObj = this.spawnedPickups.next;
                if (pulledObj.position.x + 50 <= this.player.position.x) {
                    pulledObj.destroy();
                    this.spawnedPickups.remove(pulledObj);
                }
            }
        }
    }

} 