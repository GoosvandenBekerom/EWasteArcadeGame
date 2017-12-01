var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EWasteGameStates;
(function (EWasteGameStates) {
    var MainState = (function (_super) {
        __extends(MainState, _super);
        function MainState() {
            _super.apply(this, arguments);
            this.startOffset = 50;
        }
        MainState.prototype.create = function () {
            this.player = new EwasteGameObjects.Player(this.game, this.startOffset, this.game.height - this.startOffset);
            this.game.add.existing(this.player);
        };
        return MainState;
    }(Phaser.State));
    EWasteGameStates.MainState = MainState;
})(EWasteGameStates || (EWasteGameStates = {}));
//# sourceMappingURL=MainState.js.map