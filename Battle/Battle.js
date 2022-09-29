/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Battle extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Battle/costumes/costume1.svg", {
        x: 1.359890109889875,
        y: 1.3598901098899603
      }),
      new Costume("V1", "./Battle/costumes/V1.svg", {
        x: 3.765993055555583,
        y: 21.87499999999997
      }),
      new Costume("V2 Charged", "./Battle/costumes/V2 Charged.svg", {
        x: 5.423034175438573,
        y: 31.49999999999997
      })
    ];

    this.sounds = [new Sound("pop", "./Battle/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "endless mode" },
        this.whenIReceiveEndlessMode
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "endless mode" },
        this.whenIReceiveEndlessMode2
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];
  }

  *whenIReceiveEndlessMode() {
    this.visible = true;
    this.effects.ghost = 99;
    while (true) {
      this.costume = "costume1";
      this.goto(this.mouse.x, this.mouse.y);
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.stage.vars.hitMini = 0;
    this.visible = false;
  }

  *whenIReceiveEndlessMode2() {
    while (true) {
      if (this.mouse.down) {
        this.createClone();
        yield* this.wait(0.2);
      }
      yield;
    }
  }

  *startAsClone() {
    this.effects.ghost = 0;
    this.visible = true;
    this.costume = "V1";
    this.goto(this.mouse.x, this.mouse.y);
    while (
      !(
        this.touching("edge") ||
        this.touching(this.sprites["CarBossEric"].andClones())
      )
    ) {
      this.y += 10;
      yield;
    }
    if (this.touching("edge")) {
      this.deleteThisClone();
    } else {
      if (this.touching(this.sprites["CarBossEric"].andClones())) {
        this.stage.vars.hitMini = 1;
        this.broadcast("mini hit");
        this.stage.vars.hitMini = 0;
        this.deleteThisClone();
      }
    }
  }
}
