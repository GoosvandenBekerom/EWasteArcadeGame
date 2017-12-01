var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EwasteGameObjects;
(function (EwasteGameObjects) {
    (function (PlayerState) {
        PlayerState[PlayerState["IDLE"] = 0] = "IDLE";
        PlayerState[PlayerState["RUNNING"] = 1] = "RUNNING";
        PlayerState[PlayerState["JUMPING"] = 2] = "JUMPING";
        PlayerState[PlayerState["FALLING"] = 3] = "FALLING";
    })(EwasteGameObjects.PlayerState || (EwasteGameObjects.PlayerState = {}));
    var PlayerState = EwasteGameObjects.PlayerState;
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, "CHAR_RUNNING", 0);
            this.game = game;
            this.speed = 0;
            this.animationSpeed = 0;
            this.UP_ARROW = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.DOWN_ARROW = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.anchor.set(0.0, 1.0);
        }
        Player.prototype.moveLeft = function () {
            //TODO
        };
        Player.prototype.moveRight = function () {
            //TODO
        };
        Player.prototype.jump = function () {
            //TODO
        };
        Player.prototype.startIdle = function () {
            this.playerState = PlayerState.IDLE;
            this.loadTexture("CHAR_IDLE", 0);
            this.animations.add("idle");
            this.animations.play("idle", this.animationSpeed, true);
        };
        Player.prototype.startRunning = function () {
            this.playerState = PlayerState.RUNNING;
            this.loadTexture("CHAR_RUNNING", 0);
            this.animations.add("walk");
            this.animations.play("walk", this.animationSpeed, true);
        };
        Player.prototype.startJumping = function () {
            this.playerState = PlayerState.JUMPING;
            this.loadTexture("CHAR_JUMPING", 0);
            this.animations.add("jump");
            this.animations.play("jump", this.animationSpeed, true);
        };
        return Player;
    }(Phaser.Sprite));
    EwasteGameObjects.Player = Player;
})(EwasteGameObjects || (EwasteGameObjects = {}));
//# sourceMappingURL=Player.js.map