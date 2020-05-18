import { WSEvent } from "../../api";
import { getWS3222 } from "../../web";
import { ccType } from "../../__c";

const { ccclass, property } = cc._decorator;
declare let io;
declare let _c_;
// cc.Node.prototype["find_play"] = function(nodeName, clipName) {
//   let gfx_01 = cc.find(nodeName, this.node);
//   let anim = gfx_01.getComponent(cc.Animation);
//   if (anim) {
//     console.log("find and play", nodeName);
//     anim.play(clipName);
//   }
// };
const pin_state = { pin_1: {} };
@ccclass
export default class Gfx extends cc.Component {
  onLoad() {
    var animation = this.getComponent(cc.Animation);

    cc.loader.loadRes("test_assets/atlas", cc.SpriteAtlas, (err, atlas) => {
      var spriteFrames = atlas.getSpriteFrames();

      var clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 10);
      clip.name = "run";
      clip.wrapMode = cc.WrapMode.Loop;

      animation.addClip(clip);
      animation.play("run");
    });
  }

  start() {
    this.initWS();
  }
  find_play({ nodeName, clipName, x, y }) {
    let gfx_node = cc.find(nodeName, this.node);
    console.log("find", nodeName);
    gfx_node.x = x;
    gfx_node.y = y;
    let anim = gfx_node.getComponent(cc.Animation);
    if (anim) {
      console.log("play clipName", clipName, x, y);
      anim.play(clipName);
    }
  }
  set_child_label(node, childNode, str) {
    let pname = node.getChildByName(childNode);
    pname.getComponent(cc.Label).string = str;
  }
  initWS() {
    console.log("initWS");
    let ws = getWS3222();
    io(ws)
      .on("gfx", event => {
        // if (event.state.nodeName === "gfx_01") {
        //   pin_state["gfx_01"] = event.state;
        //   let { x, y } = event.state.pos;
        //   let x1 = x - 960;
        //   let y1 = 540 - y;
        //   // anim.play("electric02");
        //   this.find_play({
        //     nodeName: "gfx_01",
        //     clipName: "electric02",
        //     x: x1,
        //     y: y1
        //   });
        // } else {

        // }
        let gfx = event.state;
        let { x, y } = gfx.pos;
        let x1 = x - 960;
        let y1 = 540 - y;
        this.find_play({
          nodeName: gfx.nodeName,
          clipName: gfx.clipName,
          x: x1,
          y: y1
        });
        // _c_.emit(ccType.Animation, { name: "gfx_01", play: "electric02" });
      })
      .on("pin_1", event => {
        let { x, y } = event.state;
        x = x - 960;
        y = 540 - y;
        let gfx_01_state = pin_state["gfx_01"];
        if (gfx_01_state && !gfx_01_state.isLock) {
          this.find_play({
            nodeName: "gfx_01",
            clipName: "electric02",
            x,
            y
          });
        }
        this.find_play({
          nodeName: "callout_06",
          clipName: "callout_06",
          x,
          y
        });
      })
      .on("connect", _ => {
        cc.log("socketio.....localWS");
        // let a = cc.find("gfx_01", this.node);
        // let a2 = cc.find("node2", this.node);
        let gfx_node = cc.find("callout_06", this.node);
        console.log("gfx_node", gfx_node);
        this.set_child_label(gfx_node, "player_name", "黄宇军");
        this.set_child_label(gfx_node, "player_title", "头盔哥");
      });
  }
}
