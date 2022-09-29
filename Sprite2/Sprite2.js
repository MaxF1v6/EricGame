/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume2", "./Sprite2/costumes/costume2.svg", {
        x: 80.55000000000001,
        y: 29.55000000000001
      }),
      new Costume("costume6", "./Sprite2/costumes/costume6.svg", {
        x: 80.55000000000001,
        y: 29.55000000000001
      })
    ];

    this.sounds = [
      new Sound("Main Menu", "./Sprite2/sounds/Main Menu.wav"),
      new Sound("Menu theme 2", "./Sprite2/sounds/Menu theme 2.wav"),
      new Sound("Select", "./Sprite2/sounds/Select.wav"),
      new Sound("Enter", "./Sprite2/sounds/Enter.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "endless mode" },
        this.whenIReceiveEndlessMode
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3)
    ];

    this.audioEffects.volume = 0;
  }

  *whenthisspriteclicked() {}

  *startAsClone() {
    while (!(this.stage.vars.clone == 3)) {
      yield;
    }
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 10;
      yield;
    }
    this.deleteThisClone();
  }

  *startAsClone2() {
    if (this.stage.vars.uiLock == 3) {
      while (true) {
        if (this.stage.vars.ui == 1) {
          this.costume = "costume1 (1)";
        } else {
          this.costume = "costume1";
        }
        yield;
      }
    }
  }

  *whenGreenFlagClicked() {}

  *whenIReceiveEndlessMode() {
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 10;
      this.audioEffects.volume += -10;
      yield;
    }
    this.visible = false;
  }

  *whenthisspriteclicked2() {}

  *whenGreenFlagClicked2() {
    this.visible = true;
  }

  *whenGreenFlagClicked3() {
    while (true) {
      if (this.touching("mouse") && this.mouse.down) {
        this.broadcast("game start");
        this.visible = false;
        return;
      }
      yield;
    }
  }
}
