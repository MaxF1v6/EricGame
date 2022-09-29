/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite3 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "pixil-frame-0(3)",
        "./Sprite3/costumes/pixil-frame-0(3).svg",
        { x: 144.5, y: 84.5 }
      ),
      new Costume("costume1", "./Sprite3/costumes/costume1.svg", {
        x: 0,
        y: 0
      }),
      new Costume(
        "pixil-frame-0(4)",
        "./Sprite3/costumes/pixil-frame-0(4).svg",
        { x: 139.49999175000005, y: 139.50001125000003 }
      ),
      new Costume(
        "imageedit_3_2043646356",
        "./Sprite3/costumes/imageedit_3_2043646356.svg",
        { x: 0, y: 0 }
      )
    ];

    this.sounds = [new Sound("pop", "./Sprite3/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "game start" },
        this.whenIReceiveGameStart
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Supplies added" },
        this.whenIReceiveSuppliesAdded
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "game start" },
        this.whenIReceiveGameStart2
      )
    ];
  }

  *whenIReceiveGameStart() {
    this.visible = true;
    while (true) {
      null;
      yield;
    }
  }

  *startAsClone() {
    while (true) {
      if (
        this.mouse.down &&
        !(this.stage.vars.list == "Click to Drive...") && this.touching("mouse")
      ) {
        this.stage.vars.list = "Click to Drive";
        this.stage.vars.intro = 3;
        this.deleteThisClone();
      }
      yield;
    }
  }

  *startAsClone2() {
    while (true) {
      this.effects.ghost = Math.hypot(
        this.mouse.x - this.x,
        this.mouse.y - this.y
      );
      if (this.touching("mouse")) {
        yield* this.sayAndWait("Click to Enter Shop", !this.touching("mouse"));
      }
      yield;
    }
  }

  *whenIReceiveSuppliesAdded() {
    this.visible = true;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    while (true) {
      if (this.touching("mouse") && this.mouse.down) {
        if (this.stage.vars.list == "Click to Drive") {
          this.broadcast("Boss Battle cut");
          this.visible = false;
        } else {
          this.stage.vars.listsBrain = this.stage.vars.list;
          this.stage.vars.list = "Get the supplies then you can drive the car";
          yield* this.wait(0.8);
          this.stage.vars.list = this.stage.vars.listsBrain;
        }
      }
      yield;
    }
  }

  *whenIReceiveGameStart2() {
    this.goto(175, 116);
    this.costume = "pixil-frame-0(4)";
    this.createClone();
    this.costume = "pixil-frame-0(3)";
    this.goto(-164, 130);
    this.visible = true;
    while (true) {
      this.effects.ghost = Math.hypot(
        this.mouse.x - this.x,
        this.mouse.y - this.y
      );
      if (this.touching("mouse")) {
        yield* this.sayAndWait(this.stage.vars.list, !this.touching("mouse"));
      }
      yield;
    }
  }
}
