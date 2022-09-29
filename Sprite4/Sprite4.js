/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite4 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite4/costumes/costume1.svg", {
        x: 0,
        y: 0
      }),
      new Costume(
        "pixil-frame-0(5)",
        "./Sprite4/costumes/pixil-frame-0(5).svg",
        { x: 64, y: 101.92592592592592 }
      )
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss Battle cut" },
        this.whenIReceiveBossBattleCut
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss Battle Cut p2" },
        this.whenIReceiveBossBattleCutP2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss Battle Cut p2" },
        this.whenIReceiveBossBattleCutP3
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Car eric ded" },
        this.whenIReceiveCarEricDed
      )
    ];
  }

  *whenIReceiveBossBattleCut() {
    this.stage.vars.bosscarcutover2 = 2;
    this.direction = 90;
    this.goto(0, -120);
    this.visible = true;
    while (true) {
      if (this.keyPressed("right arrow") || this.keyPressed("d")) {
        this.x += 10;
      } else {
        if (this.keyPressed("left arrow") || this.keyPressed("a")) {
          this.x += -10;
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    while (true) {
      this.stage.vars.carx = this.x;
      yield;
    }
  }

  *whenIReceiveBossBattleCutP2() {
    this.stage.vars.carEricsHealth = 100;
    for (let i = 0; i < 8; i++) {
      this.direction -= 90;
      yield* this.wait(0.1);
      yield;
    }
    yield* this.startSound("8_Bits_are_Scary_Assault_(getmp3");
    while (true) {
      if (this.keyPressed("space")) {
        yield* this.glide(0.3, this.x, -20);
        if (this.touching(this.sprites["CarBossEric"].andClones())) {
          this.broadcast("Car Eric Hit");
        }
        yield* this.glide(0.3, this.x, -120);
      }
      yield;
    }
  }

  *whenIReceiveBossBattleCutP3() {}

  *whenIReceiveCarEricDed() {
    for (let i = 0; i < 50; i++) {
      this.effects.ghost += 2;
      yield;
    }
    this.stopAllSounds();
    this.effects.ghost = 0;
    this.visible = false;
    this.audioEffects.volume = 100;
  }
}
