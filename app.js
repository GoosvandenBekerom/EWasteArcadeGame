var Game;
(function (Game) {
    var EWasteArcadeGame = (function () {
        function EWasteArcadeGame() {
            this.game = new Phaser.Game(1024, 576, Phaser.AUTO, "content", {
                preload: this.preload,
                create: this.create
            });
        }
        EWasteArcadeGame.prototype.preload = function () {
            // Graphics
            this.game.load.image("title", "Graphics/TitleScreen.jpg");
            //this.game.load.image("game", "Graphics/background576p.png");
            //this.game.load.image("gameover", "Graphics/TitleScreen.png");
            // Spritesheets
            //this.game.load.atlasXML("CHAR_IDLE", "Graphics/char_idle.xml");
            //this.game.load.atlasXML("CHAR_RUNNING", "Graphics/char_running.xml");
            //this.game.load.atlasXML("CHAR_JUMPING", "Graphics/char_jumping.xml");
            // Audio
            this.game.load.audio("BackgoundLoop", [
                "Sounds/BackgroundLoop.mp3",
                "Sounds/BackgroundLoop.ogg",
                "Sounds/BackgroundLoop.wav"
            ]);
        };
        EWasteArcadeGame.prototype.create = function () {
            this.game.state.add("TitleScreenState", EWasteGameStates.TitleScreenState, true);
            this.game.state.add("MainState", EWasteGameStates.MainState, false);
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        };
        return EWasteArcadeGame;
    }());
    Game.EWasteArcadeGame = EWasteArcadeGame;
})(Game || (Game = {}));
window.onload = function () {
    var game = new Game.EWasteArcadeGame();
};
//# sourceMappingURL=app.js.map