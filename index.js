import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Sprite2 from "./Sprite2/Sprite2.js";
import MouseSettings from "./MouseSettings/MouseSettings.js";
import Sprite3 from "./Sprite3/Sprite3.js";
import Sprite4 from "./Sprite4/Sprite4.js";
import CarBossEric from "./CarBossEric/CarBossEric.js";
import Battle from "./Battle/Battle.js";
import McsTracker from "./McsTracker/McsTracker.js";

const stage = new Stage({ costumeNumber: 3 });

const sprites = {
  Sprite2: new Sprite2({
    x: -145,
    y: 78,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 3
  }),
  MouseSettings: new MouseSettings({
    x: 10,
    y: -120,
    direction: 90,
    costumeNumber: 3,
    size: 350,
    visible: false,
    layerOrder: 2
  }),
  Sprite3: new Sprite3({
    x: -164,
    y: 130,
    direction: 90,
    costumeNumber: 1,
    size: 45,
    visible: false,
    layerOrder: 4
  }),
  Sprite4: new Sprite4({
    x: 10,
    y: -120,
    direction: 90,
    costumeNumber: 2,
    size: 50,
    visible: false,
    layerOrder: 5
  }),
  CarBossEric: new CarBossEric({
    x: -24,
    y: 129,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  Battle: new Battle({
    x: -229,
    y: 180,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 6
  }),
  McsTracker: new McsTracker({
    x: -120,
    y: 0,
    direction: 90,
    costumeNumber: 12,
    size: 100,
    visible: false,
    layerOrder: 7
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
