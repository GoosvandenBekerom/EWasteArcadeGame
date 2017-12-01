var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EWasteGameStates;
(function (EWasteGameStates) {
    var TitleScreenState = (function (_super) {
        __extends(TitleScreenState, _super);
        function TitleScreenState() {
            _super.apply(this, arguments);
        }
        TitleScreenState.prototype.create = function () {
            this.titleScreenImage = this.add.sprite(0, 0, "title");
            this.music = this.game.add.audio("BackgoundLoop");
            this.music.volume = 0.4;
            this.music.loop = true;
            this.music.play();
            this.input.onTap.add(this.startGame, this);
        };
        TitleScreenState.prototype.startGame = function () {
            this.music.stop();
            this.game.state.start("MainState");
        };
        return TitleScreenState;
    }(Phaser.State));
    EWasteGameStates.TitleScreenState = TitleScreenState;
})(EWasteGameStates || (EWasteGameStates = {}));
//# sourceMappingURL=TitleScreenState.js.map