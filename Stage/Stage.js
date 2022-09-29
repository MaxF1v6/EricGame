/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("pixil-frame-0", "./Stage/costumes/pixil-frame-0.svg", {
        x: 242.28298,
        y: 235.28287
      }),
      new Costume("old", "./Stage/costumes/old.svg", {
        x: 251.06598424939585,
        y: 204.88049316580367
      }),
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240.71463847110002,
        y: 180.50025386430002
      }),
      new Costume("backdrop2", "./Stage/costumes/backdrop2.svg", {
        x: 240.71463847110002,
        y: 207.5
      }),
      new Costume("backdrop3", "./Stage/costumes/backdrop3.svg", {
        x: 295.2942942942943,
        y: 201.4504504504504
      }),
      new Costume("backdrop4", "./Stage/costumes/backdrop4.svg", {
        x: 256.75,
        y: 205.26351351351352
      }),
      new Costume("backdrop5", "./Stage/costumes/backdrop5.svg", {
        x: 247.63356,
        y: 189.10199
      }),
      new Costume("backround", "./Stage/costumes/backround.svg", {
        x: 250.9661654411765,
        y: 186.79293995098035
      }),
      new Costume("pixil-frame-2", "./Stage/costumes/pixil-frame-2.svg", {
        x: 242.2829895019531,
        y: 235.2829895019533
      }),
      new Costume(
        "pixil-frame-0 (1)",
        "./Stage/costumes/pixil-frame-0 (1).svg",
        { x: 0, y: 0 }
      ),
      new Costume("backdrop6", "./Stage/costumes/backdrop6.svg", {
        x: -20,
        y: 176.5
      }),
      new Costume(
        "pixil-frame-0 (2)",
        "./Stage/costumes/pixil-frame-0 (2).svg",
        { x: 10, y: 20 }
      ),
      new Costume("backdrop7", "./Stage/costumes/backdrop7.svg", {
        x: 252.95883,
        y: 184.54587
      })
    ];

    this.sounds = [
      new Sound("pop", "./Stage/sounds/pop.wav"),
      new Sound(
        "Game_Over_Voice_-_Sound_Effect_HD_(getmp3",
        "./Stage/sounds/Game_Over_Voice_-_Sound_Effect_HD_(getmp3.wav"
      ),
      new Sound(
        "xDeviruchi - The Final of The Fantasy",
        "./Stage/sounds/xDeviruchi - The Final of The Fantasy.wav"
      )
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "intro over" },
        this.whenIReceiveIntroOver
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Shop" }, this.whenIReceiveShop),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss Battle cut" },
        this.whenIReceiveBossBattleCut
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Over" },
        this.whenIReceiveGameOver
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Car eric ded" },
        this.whenIReceiveCarEricDed
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "game start" },
        this.whenIReceiveGameStart
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "endless mode" },
        this.whenIReceiveEndlessMode
      )
    ];

    this.vars.myVariable = 81.70679286326198;
    this.vars.intro = 4;
    this.vars.clone = 3;
    this.vars.list = "Click to Drive";
    this.vars.listsBrain = "Click to Drive";
    this.vars.carx = 10;
    this.vars.bulletsShot = 0;
    this.vars.carSpeed = 0;
    this.vars.carEricsHealth = 0;
    this.vars.ui = 0;
    this.vars.uiLock = 2;
    this.vars.bossPitchCar = -1884;
    this.vars.chaptersMenu = 0;
    this.vars.boss = 1;
    this.vars.hitMini = 0;
    this.vars.ericTracker = 0;
    this.vars.bosscarcutover2 = 3;

    this.watchers.carEricsHealth = new Watcher({
      label: "car erics health",
      style: "normal",
      visible: false,
      value: () => this.vars.carEricsHealth,
      x: 408,
      y: 180
    });
  }

  *whenIReceiveIntroOver() {
    yield* this.wait(0.4);
    for (let i = 0; i < 10; i++) {
      this.effects.brightness += 10;
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.audioEffects.volume = 100;
  }

  *whenIReceiveShop() {
    this.effects.brightness = -100;
  }

  *whenIReceiveBossBattleCut() {
    while (true) {
      this.costume = "backdrop1";
      yield* this.wait(0.01);
      this.costumeNumber += 1;
      yield* this.wait(0.01);
      yield;
    }
  }

  *whenIReceiveGameOver() {
    yield* this.startSound("Game_Over_Voice_-_Sound_Effect_HD_(getmp3");
    this.costume = "backdrop3";
  }

  *whenIReceiveCarEricDed() {
    this.watchers.carEricsHealth.visible = false;
    this.vars.intro = 4;
    for (let i = 0; i < 50; i++) {
      this.effects.brightness += -2;
      yield;
    }
    this.costume = "backdrop4";
    for (let i = 0; i < 10; i++) {
      this.effects.brightness += 10;
      yield;
    }
    yield* this.wait(1.3);
    this.audioEffects.volume = 0;
    yield* this.startSound("xDeviruchi - The Final of The Fantasy");
    for (let i = 0; i < 100; i++) {
      this.audioEffects.volume += 1;
      yield;
    }
    yield* this.wait(1);
    for (let i = 0; i < 10; i++) {
      this.effects.brightness += -10;
      this.audioEffects.volume += -10;
      yield;
    }
    this.stopAllSounds();
    this.costume = "backdrop5";
    this.audioEffects.volume = 100;
    for (let i = 0; i < 10; i++) {
      this.effects.brightness += 10;
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    this.costume = "backdrop7";
  }

  *whenIReceiveGameStart() {
    this.costume = "pixil-frame-0";
  }

  *whenIReceiveEndlessMode() {
    this.costume = "pixil-frame-2";
  }
}
