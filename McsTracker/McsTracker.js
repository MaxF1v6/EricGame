/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class McsTracker extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./McsTracker/costumes/costume1.svg", {
        x: 133.25,
        y: 186.5
      }),
      new Costume("costume2", "./McsTracker/costumes/costume2.svg", {
        x: 133.25,
        y: 186.5
      }),
      new Costume("costume3", "./McsTracker/costumes/costume3.svg", {
        x: 133.25,
        y: 186.5
      }),
      new Costume("costume4", "./McsTracker/costumes/costume4.svg", {
        x: 133.25,
        y: 186.5
      }),
      new Costume("costume5", "./McsTracker/costumes/costume5.svg", {
        x: 133.25,
        y: 186.5
      }),
      new Costume("costume6", "./McsTracker/costumes/costume6.svg", {
        x: 133.25,
        y: 186.5
      }),
      new Costume("costume7", "./McsTracker/costumes/costume7.svg", {
        x: 133.25,
        y: 186.5
      }),
      new Costume("costume8", "./McsTracker/costumes/costume8.svg", {
        x: 133.25,
        y: 186.5
      }),
      new Costume("costume9", "./McsTracker/costumes/costume9.svg", {
        x: 133.25,
        y: 186.5
      }),
      new Costume("costume10", "./McsTracker/costumes/costume10.svg", {
        x: 133.25,
        y: 186.5
      }),
      new Costume("costume11", "./McsTracker/costumes/costume11.svg", {
        x: 133.25,
        y: 186.5
      }),
      new Costume("costume12", "./McsTracker/costumes/costume12.svg", {
        x: 133.25,
        y: 186.5
      })
    ];

    this.sounds = [
      new Sound("pop", "./McsTracker/sounds/pop.wav"),
      new Sound(
        "426888__thisusernameis__beep4",
        "./McsTracker/sounds/426888__thisusernameis__beep4.wav"
      )
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "game start" },
        this.whenIReceiveGameStart
      ),
      new Trigger(Trigger.KEY_PRESSED, { key: "e" }, this.whenKeyEPressed),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "open manual car" },
        this.whenIReceiveOpenManualCar
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.bosscarcutover2 = 0;
    this.costume = "settings icon";
    this.visible = false;
  }

  *whenIReceiveGameStart() {
    this.visible = false;
  }

  *whenKeyEPressed() {
    if (
      this.stage.vars.bosscarcutover2 == 0 ||
      this.stage.vars.bosscarcutover2 == 3
    ) {
      if (this.stage.vars.ericTracker == 0) {
        this.visible = true;
        this.moveAhead();
        this.goto(-300, 0);
        this.costume = "costume1";
        this.size = 100;
        yield* this.glide(0.3, -125, 0);
        yield* this.glide(0.1, -120, 0);
        this.stage.vars.ericTracker = 1;
      } else {
        if (this.stage.vars.ericTracker == 1) {
          yield* this.glide(0.3, -300, 0);
          this.visible = false;
          this.stage.vars.ericTracker = 0;
        }
      }
    }
  }

  *whenthisspriteclicked() {
    if (
      this.stage.vars.bosscarcutover2 == 0 ||
      this.stage.vars.bosscarcutover2 == 3
    ) {
      0;
    } else {
      this.visible = false;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.stage.vars.boss == 1) {
        while (!!(this.stage.vars.boss == 1)) {
          this.visible = false;
          yield;
        }
      }
      yield;
    }
  }

  *whenIReceiveOpenManualCar() {
    while (true) {
      if (this.stage.vars.bosscarcutover2 == 2) {
        this.goto(-120, 0);
        this.visible = true;
        this.costume = "costume2";
        yield* this.startSound("426888__thisusernameis__beep4");
        yield* this.wait(1);
        for (let i = 0; i < 10; i++) {
          yield* this.startSound("426888__thisusernameis__beep4");
          this.costumeNumber += 1;
          yield* this.wait(0.3);
          yield;
        }
        this.stage.vars.ericTracker = 0;
        this.stage.vars.bosscarcutover2 = 3;
      }
      yield;
    }
  }
}
