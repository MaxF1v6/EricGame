/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class CarBossEric extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1 (1)", "./CarBossEric/costumes/costume1 (1).png", {
        x: 246,
        y: 194
      }),
      new Costume("costume1 (2)", "./CarBossEric/costumes/costume1 (2).png", {
        x: 246,
        y: 194
      }),
      new Costume("costume1", "./CarBossEric/costumes/costume1.svg", {
        x: 126.5,
        y: 99
      }),
      new Costume("costume2", "./CarBossEric/costumes/costume2.svg", {
        x: 173.25,
        y: 19.48124999999999
      })
    ];

    this.sounds = [
      new Sound("Alert", "./CarBossEric/sounds/Alert.wav"),
      new Sound(
        "617043__d4xx__bass-impact-3",
        "./CarBossEric/sounds/617043__d4xx__bass-impact-3.wav"
      ),
      new Sound(
        "583402__scrbun__edsscreamr",
        "./CarBossEric/sounds/583402__scrbun__edsscreamr.mp3"
      ),
      new Sound(
        "270332__littlerobotsoundfactory__hit-03",
        "./CarBossEric/sounds/270332__littlerobotsoundfactory__hit-03.wav"
      ),
      new Sound(
        "xDeviruchi - Prepare for Battle! ",
        "./CarBossEric/sounds/xDeviruchi - Prepare for Battle! .wav"
      )
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss Battle cut" },
        this.whenIReceiveBossBattleCut
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss Battle Cut p2" },
        this.whenIReceiveBossBattleCutP2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Car Eric Hit" },
        this.whenIReceiveCarEricHit
      )
    ];
  }

  *whenIReceiveBossBattleCut() {
    this.visible = true;
    this.costume = "costume2";
    this.goto(0, 100);
    while (!(this.keyPressed("e") || this.stage.vars.ericTracker == 1)) {
      yield;
    }
    this.broadcast("open manual car");
    this.visible = false;
    while (!(this.stage.vars.bosscarcutover2 == 3)) {
      yield;
    }
    this.size = 100;
    this.stage.vars.boss = 1;
    this.costume = "costume1 (1)";
    this.moveBehind();
    this.visible = true;
    this.goto(0, 300);
    for (let i = 0; i < 18; i++) {
      this.y += -11;
      yield;
    }
    for (let i = 0; i < 3; i++) {
      this.y += 1;
      yield;
    }
    yield* this.startSound("xDeviruchi - Prepare for Battle! ");
    yield* this.sayAndWait("" + "Hello " + /* no username */ "", 2);
    yield* this.glide(1, 0, 100);
    this.costume = "costume1";
    this.effects.ghost = 50;
    this.createClone();
    this.effects.ghost = 0;
    this.costume = "costume1 (1)";
    for (let i = 0; i < 7; i++) {
      this.x = this.stage.vars.carx;
      yield* this.wait(0.1);
      this.x = this.stage.vars.carx;
      yield* this.wait(0.1);
      yield;
    }
    yield* this.glide(
      0.2,
      this.sprites["Sprite4"].x,
      this.sprites["Sprite4"].y
    );
    yield* this.startSound("617043__d4xx__bass-impact-3");
    this.broadcast("Boss Battle Cut p2");
    for (let i = 0; i < 10; i++) {
      this.y += -10;
      yield;
    }
    this.visible = false;
  }

  *whenGreenFlagClicked() {
    this.stage.vars.boss = 0;
    this.stage.watchers.carEricsHealth.visible = false;
    this.visible = false;
  }

  *startAsClone() {
    if (this.stage.vars.boss == 1) {
      for (let i = 0; i < 7; i++) {
        yield* this.startSound("Alert");
        yield* this.wait(0.1);
        this.goto(this.sprites["Sprite4"].x, this.sprites["Sprite4"].y);
        yield* this.startSound("Alert");
        yield* this.wait(0.1);
        yield;
      }
      this.deleteThisClone();
    }
  }

  *whenIReceiveBossBattleCutP2() {
    this.audioEffects.pitch = 0;
    this.stage.watchers.carEricsHealth.visible = true;
    yield* this.wait(1);
    this.visible = true;
    this.goto(335, 86);
    yield* this.glide(1, -335, 86);
    this.visible = false;
    yield* this.wait(1);
    this.visible = true;
    this.effects.ghost = 100;
    this.goto(0, 200);
    for (let i = 0; i < 13; i++) {
      this.y += -11;
      this.effects.ghost += -7;
      yield;
    }
    for (let i = 0; i < 3; i++) {
      this.y += 1;
      yield;
    }
    this.stage.vars.bulletsShot = 0;
    while (true) {
      if (this.stage.vars.carEricsHealth > 0) {
        yield* this.glide(0.2, this.random(-240, 240), this.random(-180, 180));
      } else {
        this.broadcast("Car eric ded");
        this.audioEffects.pitch = -160;
        yield* this.playSoundUntilDone(
          "270332__littlerobotsoundfactory__hit-03"
        );
        this.audioEffects.pitch = 0;
        for (let i = 0; i < 10; i++) {
          this.effects.ghost += -10;
          yield;
        }
        this.visible = false;
        return;
      }
      yield;
    }
  }

  *whenIReceiveCarEricHit() {
    this.stage.vars.carEricsHealth += -10;
    this.stage.vars.bossPitchCar += -10;
    if (this.stage.vars.carEricsHealth > 9) {
      yield* this.playSoundUntilDone("270332__littlerobotsoundfactory__hit-03");
    }
  }
}
