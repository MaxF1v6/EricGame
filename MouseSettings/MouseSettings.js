/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MouseSettings extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./MouseSettings/costumes/costume1.svg", {
        x: 0.8888888888888857,
        y: 0.9166666666666856
      }),
      new Costume("costume2", "./MouseSettings/costumes/costume2.svg", {
        x: 247.058815,
        y: 180.999995
      }),
      new Costume("costume3", "./MouseSettings/costumes/costume3.svg", {
        x: 243.993985,
        y: 286.6333238772455
      })
    ];

    this.sounds = [new Sound("pop", "./MouseSettings/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "game start" },
        this.whenIReceiveGameStart
      ),
      new Trigger(Trigger.BROADCAST, { name: "Shop" }, this.whenIReceiveShop),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss Battle cut" },
        this.whenIReceiveBossBattleCut
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss Battle Cut p2" },
        this.whenIReceiveBossBattleCutP2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Car eric ded" },
        this.whenIReceiveCarEricDed
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.direction = 90;
    this.visible = false;
    while (true) {
      this.goto(this.mouse.x, this.mouse.y);
      yield;
    }
  }

  *whenIReceiveGameStart() {
    if (this.random(1, 2) == 1) {
      this.stage.vars.list = "You need oil before you can drive";
    } else {
      this.stage.vars.list = "You need a tire before you can drive";
    }
  }

  *whenIReceiveShop() {
    this.visible = false;
  }

  *whenIReceiveBossBattleCut() {
    this.effects.ghost = 70;
    this.costume = "costume3";
    this.visible = true;
    while (true) {
      this.goto(this.sprites["Sprite4"].x, this.sprites["Sprite4"].y);
      yield;
    }
  }

  *whenIReceiveBossBattleCutP2() {
    this.moveBehind();
    this.moveAhead(1);
    for (let i = 0; i < 8; i++) {
      this.direction -= 90;
      yield* this.wait(0.1);
      yield;
    }
  }

  *whenIReceiveCarEricDed() {
    for (let i = 0; i < 50; i++) {
      this.effects.ghost += 2;
      yield;
    }
    this.visible = false;
  }
}
