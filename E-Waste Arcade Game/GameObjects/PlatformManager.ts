module EwasteGameObjects {
    export class PlatformManager extends Phaser.Group {
        game: Phaser.Game;
        state: Phaser.State;
        player: EwasteGameObjects.Player
        spawning: boolean;
        spawnedPlatforms: Phaser.LinkedList;

        constructor(game: Phaser.Game, state: Phaser.State, player: EwasteGameObjects.Player) {
            super(game);
            this.game = game;
            this.state = state;
            this.player = player;
            this.spawnedPlatforms = new Phaser.LinkedList;
            this.spawning = false;
        }

        spawnPlatform(x: number, y: number, width: number) {
            var height = 38; // height of current platform texture
            var obstacle = new EwasteGameObjects.Platform(this.game, x, y, width, height, "platform");

            this.add(obstacle);
            this.game.world.bringToTop(this);

            this.spawnedPlatforms.add(obstacle);

            this.game.world.bringToTop(this.player);

            this.despawnOutOfScreen();
            this.spawning = false;
        }

        despawnOutOfScreen() {
            for (var i = 0; i < this.spawnedPlatforms.total; i++) {
                var pulledObj = this.spawnedPlatforms.next;
                if (!pulledObj.inCamera) {
                    pulledObj.destroy();
                    this.spawnedPlatforms.remove(pulledObj);
                }
            }
        }
    }

} 