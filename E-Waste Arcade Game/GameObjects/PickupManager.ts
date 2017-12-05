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
            this.spawning = false;
            this.spawnedPickups = new Phaser.LinkedList();
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

            var spawnedObject = this.state.add.sprite(this.player.position.x + 500, Math.random() * this.game.height, pickup, this);
            this.spawnedPickups.add(spawnedObject);
            this.spawning = false;

            this.checkDespawn();
        }

        checkDespawn() {
            for (var i = 0; i < this.spawnedPickups.total; i++) {
                var pulledObject = this.spawnedPickups.next;
                if (pulledObject.position.x + (this.game.width / 4) <= this.player.position.x) {
                    pulledObject.destroy();
                }
            }
        }
    }

} 