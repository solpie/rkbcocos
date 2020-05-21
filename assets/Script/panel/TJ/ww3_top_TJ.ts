// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class WW3TopTJ extends cc.Component {
  @property(cc.Label) //
  label_team_L: cc.Label = null;

  @property(cc.Label) //
  label_team_R: cc.Label = null;

  @property(cc.Label) //
  label_blood_L: cc.Label = null;

  @property(cc.Label) //
  label_blood_R: cc.Label = null;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    this.label_team_L.string = "team L";
    this.label_blood_L.string = "4";

    this.label_team_R.string = "team R";
    this.label_blood_R.string = "24";
  }

  // update (dt) {}
}
