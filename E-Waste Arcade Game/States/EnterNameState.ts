module EWasteGameStates {
    export class EnterNameState extends Phaser.State {
        game: Phaser.Game;
        background: Phaser.Sprite;
        joystick: EWasteUtils.JoystickInput;
        timer: Phaser.Timer;

        // offset values
        margin = 30;

        // color values
        containerBg = 0xffffff;
        opacity = 0.5;

        // characters
        alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        current1: number;
        current2: number;
        current3: number;
        current4: number;
        current5: number;
        char1: EwasteGameObjects.UIText;
        char2: EwasteGameObjects.UIText;
        char3: EwasteGameObjects.UIText;
        char4: EwasteGameObjects.UIText;
        char5: EwasteGameObjects.UIText;

        // arrows
        arrowUp1: Phaser.Sprite;
        arrowDown1: Phaser.Sprite;
        arrowUp2: Phaser.Sprite;
        arrowDown2: Phaser.Sprite;
        arrowUp3: Phaser.Sprite;
        arrowDown3: Phaser.Sprite;
        arrowUp4: Phaser.Sprite;
        arrowDown4: Phaser.Sprite;
        arrowUp5: Phaser.Sprite;
        arrowDown5: Phaser.Sprite;
        activeArrow: number;

        create() {
            // Hook up input
            this.joystick = new EWasteUtils.JoystickInput(
                this.game,
                Phaser.Keyboard.UP, Phaser.Keyboard.DOWN,
                Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT,
                Phaser.Keyboard.X, Phaser.Keyboard.Z
            );

            // input timer
            this.timer = this.game.time.create();
            this.timer.loop(1500, this.endBtnEnabled, this);
            this.timer.start();
            
            // Background
            this.background = this.add.sprite(0, 0, "gameover", 0);

            let nameContainer = this.game.add.graphics(this.margin, this.margin);
            nameContainer.beginFill(this.containerBg, this.opacity);
            nameContainer.drawRect(0, 0, this.game.width - this.margin * 2, this.game.height - (this.margin * 2));
            nameContainer.endFill();

            // Display title
            let nameTitle = new EwasteGameObjects.UIText(this.game, "vul hier je naam in", this.margin + 30, this.margin + 30, 66);
            nameContainer.addChild(nameTitle);

            // positions
            let pos1 = 75, pos2 = 175, pos3 = 275, pos4 = 375, pos5 = 475;
            let posy1 = 185, posy2 = 375, posy = 289;
            let charOffsetX = 38;
            let txtSize = 72;

            // Arrows
            this.arrowUp1 = new Phaser.Sprite(this.game, pos1, posy1, "arrowUp");
            this.arrowDown1 = new Phaser.Sprite(this.game, pos1, posy2, "arrowDown");
            this.arrowUp2 = new Phaser.Sprite(this.game, pos2, posy1, "arrowUp");
            this.arrowDown2 = new Phaser.Sprite(this.game, pos2, posy2, "arrowDown");
            this.arrowUp3 = new Phaser.Sprite(this.game, pos3, posy1, "arrowUp");
            this.arrowDown3 = new Phaser.Sprite(this.game, pos3, posy2, "arrowDown");
            this.arrowUp4 = new Phaser.Sprite(this.game, pos4, posy1, "arrowUp");
            this.arrowDown4 = new Phaser.Sprite(this.game, pos4, posy2, "arrowDown");
            this.arrowUp5 = new Phaser.Sprite(this.game, pos5, posy1, "arrowUp");
            this.arrowDown5 = new Phaser.Sprite(this.game, pos5, posy2, "arrowDown");
            nameContainer.addChild(this.arrowUp1);
            nameContainer.addChild(this.arrowDown1);
            nameContainer.addChild(this.arrowUp2);
            nameContainer.addChild(this.arrowDown2);
            nameContainer.addChild(this.arrowUp3);
            nameContainer.addChild(this.arrowDown3);
            nameContainer.addChild(this.arrowUp4);
            nameContainer.addChild(this.arrowDown4);
            nameContainer.addChild(this.arrowUp5);
            nameContainer.addChild(this.arrowDown5);

            // change active tints
            this.activeArrow = 1;
            this.arrowUp1.alpha = 1;
            this.arrowDown1.alpha = 1;
            this.arrowUp2.alpha = 0;
            this.arrowDown2.alpha = 0;
            this.arrowUp3.alpha = 0;
            this.arrowDown3.alpha = 0;
            this.arrowUp4.alpha = 0;
            this.arrowDown4.alpha = 0;
            this.arrowUp5.alpha = 0;
            this.arrowDown5.alpha = 0;

            // Chars
            this.current1 = this.current2 = this.current3 = this.current4 = this.current5 = 0;
            this.char1 = new EwasteGameObjects.UIText(this.game, this.alphabet[this.current1], pos1 + charOffsetX, posy, txtSize);
            this.char2 = new EwasteGameObjects.UIText(this.game, this.alphabet[this.current2], pos2 + charOffsetX, posy, txtSize);
            this.char3 = new EwasteGameObjects.UIText(this.game, this.alphabet[this.current3], pos3 + charOffsetX, posy, txtSize);
            this.char4 = new EwasteGameObjects.UIText(this.game, this.alphabet[this.current2], pos4 + charOffsetX, posy, txtSize);
            this.char5 = new EwasteGameObjects.UIText(this.game, this.alphabet[this.current3], pos5 + charOffsetX, posy, txtSize);
            this.char1.anchor.setTo(0.5, 0);
            this.char2.anchor.setTo(0.5, 0);
            this.char3.anchor.setTo(0.5, 0);
            this.char4.anchor.setTo(0.5, 0);
            this.char5.anchor.setTo(0.5, 0);
            nameContainer.addChild(this.char1);
            nameContainer.addChild(this.char2);
            nameContainer.addChild(this.char3);
            nameContainer.addChild(this.char4);
            nameContainer.addChild(this.char5);

            // Button
            nameContainer.addChild(new Phaser.Sprite(this.game, 630, 280, "buttonButton"));

            // event handlers
            this.joystick.UP.onDown.add(() => {
                if (this.activeArrow == 1) {
                    this.current1++;
                    if (this.current1 == this.alphabet.length) this.current1 = 0;
                    this.char1.text = this.alphabet[this.current1];
                    this.char1.updateText();
                } else if (this.activeArrow == 2) {
                    this.current2++;
                    if (this.current2 == this.alphabet.length) this.current2 = 0;
                    this.char2.text = this.alphabet[this.current2];
                    this.char2.updateText();
                } else if (this.activeArrow == 3) {
                    this.current3++;
                    if (this.current3 == this.alphabet.length) this.current3 = 0;
                    this.char3.text = this.alphabet[this.current3];
                    this.char3.updateText();
                } else if (this.activeArrow == 4) {
                    this.current4++;
                    if (this.current4 == this.alphabet.length) this.current4 = 0;
                    this.char4.text = this.alphabet[this.current4];
                    this.char4.updateText();
                } else if(this.activeArrow == 5) {
                    this.current5++;
                    if (this.current5 == this.alphabet.length) this.current5 = 0;
                    this.char5.text = this.alphabet[this.current5];
                    this.char5.updateText();
                }
            });

            this.joystick.DOWN.onDown.add(() => {
                if (this.activeArrow == 1) {
                    this.current1--;
                    if (this.current1 < 0) this.current1 = this.alphabet.length - 1;
                    this.char1.text = this.alphabet[this.current1];
                    this.char1.updateText();
                } else if (this.activeArrow == 2) {
                    this.current2--;
                    if (this.current2 < 0) this.current2 = this.alphabet.length - 1;
                    this.char2.text = this.alphabet[this.current2];
                    this.char2.updateText();
                } else if (this.activeArrow == 3) {
                    this.current3--;
                    if (this.current3 < 0) this.current3 = this.alphabet.length - 1;
                    this.char3.text = this.alphabet[this.current3];
                    this.char3.updateText();
                } else if (this.activeArrow == 4) {
                    this.current4--;
                    if (this.current4 < 0) this.current4 = this.alphabet.length - 1;
                    this.char4.text = this.alphabet[this.current4];
                    this.char4.updateText();
                } else if (this.activeArrow == 5){
                    this.current5--;
                    if (this.current5 < 0) this.current5 = this.alphabet.length - 1;
                    this.char5.text = this.alphabet[this.current5];
                    this.char5.updateText();
                }
            });

            this.joystick.RIGHT.onDown.add(() => {
                if (this.activeArrow == 5) return;

                this.activeArrow++;

                this.arrowUp1.alpha = 0;
                this.arrowDown1.alpha = 0;
                this.arrowUp2.alpha = 0;
                this.arrowDown2.alpha = 0;
                this.arrowUp3.alpha = 0;
                this.arrowDown3.alpha = 0;
                this.arrowUp4.alpha = 0;
                this.arrowDown4.alpha = 0;
                this.arrowUp5.alpha = 0;
                this.arrowDown5.alpha = 0;

                if (this.activeArrow == 2) {
                    // active arrow is 2
                    this.arrowUp2.alpha = 1;
                    this.arrowDown2.alpha = 1;
                } else if (this.activeArrow == 3){
                    // active arrow is 3
                    this.arrowUp3.alpha = 1;
                    this.arrowDown3.alpha = 1;
                } else if (this.activeArrow == 4) {
                    // active arrow is 4
                    this.arrowUp4.alpha = 1;
                    this.arrowDown4.alpha = 1;
                } else if (this.activeArrow == 5) {
                    // active arrow is 5
                    this.arrowUp5.alpha = 1;
                    this.arrowDown5.alpha = 1;
                }
            });

            this.joystick.LEFT.onDown.add(() => {
                if (this.activeArrow == 1) return;

                this.activeArrow--;

                this.arrowUp1.alpha = 0;
                this.arrowDown1.alpha = 0;
                this.arrowUp2.alpha = 0;
                this.arrowDown2.alpha = 0;
                this.arrowUp3.alpha = 0;
                this.arrowDown3.alpha = 0;
                this.arrowUp4.alpha = 0;
                this.arrowDown4.alpha = 0;
                this.arrowUp5.alpha = 0;
                this.arrowDown5.alpha = 0;

                if (this.activeArrow == 4) {
                    // active arrow is 4
                    this.arrowUp4.alpha = 1;
                    this.arrowDown4.alpha = 1;
                } else if (this.activeArrow == 3) {
                    // active arrow is 3
                    this.arrowUp3.alpha = 1;
                    this.arrowDown3.alpha = 1;
                } else if (this.activeArrow == 2) {
                    // active arrow is 2
                    this.arrowUp2.alpha = 1;
                    this.arrowDown2.alpha = 1;
                } else {
                    // active arrow is 1
                    this.arrowUp1.alpha = 1;
                    this.arrowDown1.alpha = 1;
                }
            });
        }

        endBtnEnabled() {
            this.joystick.GREEN.onDown.add(() => {
                let name = this.alphabet[this.current1] + this.alphabet[this.current2] + this.alphabet[this.current3] + this.alphabet[this.current4] + this.alphabet[this.current5];
                EWasteUtils.StorageControl.setStorage('playerName', name);
                EWasteUtils.Highscore.addScore(parseInt(EWasteUtils.StorageControl.getStorage("yourScore")), name);
                this.game.state.start("GameOverState");
            });
            this.timer.stop();
        }
    }
}