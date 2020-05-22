import { WSEvent } from "../../api";
import {
  getWsUrl,
  loadImg64,
  loadImg64ByNode,
  auto_doc,
  get_blood_map_url,
} from "../../web";
import { getNode, setText, ccType } from "../../__c";
import { EVENT_PLAYER_BAR_4V4 } from "./BBR_player_bar";
import { on_blood_map_doc_big_blood } from "./big_blood_ww3doc";
const { ccclass, property } = cc._decorator;
declare let _c_;
declare let io;
// let baseUrl = 'http://rtmp.icassi.us:8092/img/player/0602/'
// let bar_width = 367
let bar_L_init = 0;
let bar_R_init = 0;
@ccclass
export default class BigBloodRock extends cc.Component {
  playerMap: any;
  eventDoc: any;
  leftTeamMap: any;
  rightTeamMap: any;
  // timeout_dot_L = []
  // timeout_dot_R = []
  timeout_L: cc.Label;
  timeout_R: cc.Label;
  total_blood_L: cc.Label;
  total_blood_R: cc.Label;
  foul_L: cc.Label;
  foul_R: cc.Label;
  cur_blood_L: cc.Label;
  cur_blood_R: cc.Label;
  cur_name_L: cc.Label;
  cur_name_R: cc.Label;

  player_row_L = [];
  player_row_R = [];

  avt_half_L: cc.Sprite;
  avt_half_R: cc.Sprite;
  onLoad() {
    cc.log("Big blood benxi on loaded");
  }
  start() {
    let _Label = (name) => {
      return cc.find(name, this.node).getComponent(cc.Label);
    };
    let _Sp = (name) => {
      return cc.find(name, this.node).getComponent(cc.Sprite);
    };

    this.timeout_L = cc.find("txt_timeout_L", this.node).getComponent(cc.Label);
    this.timeout_R = cc.find("txt_timeout_R", this.node).getComponent(cc.Label);

    this.timeout_L.string = "0";
    this.timeout_R.string = "0";

    this.total_blood_L = _Label("txt_player_blood_L");
    this.total_blood_R = _Label("txt_player_blood_R");

    this.foul_L = _Label("txt_player_foul_L");
    this.foul_R = _Label("txt_player_foul_R");

    this.cur_blood_L = _Label("txt_captain_blood_L");
    this.cur_blood_R = _Label("txt_captain_blood_R");

    this.cur_name_L = _Label("txt_player_name_L");
    this.cur_name_R = _Label("txt_player_name_R");

    this.cur_name_L.string = "";
    this.cur_name_R.string = "";

    this.avt_half_L = cc.find("avt_L", this.node).getComponent(cc.Sprite);
    this.avt_half_R = cc.find("avt_R", this.node).getComponent(cc.Sprite);

    if (!CC_BUILD) {
    //   let testNode = cc.find("team_dot_on", this.node).getComponent(cc.Sprite);
    //   cc.loader.loadRes("player/p1", cc.SpriteFrame, (err, spriteFrame) => {
    //     testNode.spriteFrame = spriteFrame;
    //   });

    //   loadImg64ByNode(
    //     testNode,
    //     "http://rtmp.icassi.us:8092/img/player/0926/p1_half.png"
    //   );
      // loadImg64ByNode(this.avt_half_L, 'http://rtmp.icassi.us:8092/img/player/0926/p1_half.png')
      // loadImg64ByNode(this.avt_half_R, 'http://rtmp.icassi.us:8092/img/player/0926/p1_half.png')
    }
    // let blood = _Label('player_bar_benxi_R1/txt_player_blood')
    // blood.string = '9'
    for (let i = 0; i < 5; i++) {
      let idx = i + 1;
      let blood_L = _Label(`player_bar_benxi_L${idx}/txt_player_blood`);
      let blood_R = _Label(`player_bar_benxi_R${idx}/txt_player_blood`);

      let avt_L = _Sp(`player_bar_benxi_L${idx}/avt`);
      let avt_R = _Sp(`player_bar_benxi_R${idx}/avt`);

      let name_L = _Label(`player_bar_benxi_L${idx}/txt_player_name`);
      let name_R = _Label(`player_bar_benxi_R${idx}/txt_player_name`);

      name_L.string = "";
      name_R.string = "";

      let bar_L: cc.Node = cc.find(
        `player_bar_benxi_L${idx}/bar_mask/bar`,
        this.node
      );
      let bar_R: cc.Node = cc.find(
        `player_bar_benxi_R${idx}/bar_mask/bar`,
        this.node
      );

      this.player_row_L.push({
        blood: blood_L,
        avatar: avt_L,
        player_id: "",
        bar: bar_L,
        name: name_L,
      });
      this.player_row_R.push({
        blood: blood_R,
        avatar: avt_R,
        player_id: "",
        bar: bar_R,
        name: name_R,
      });
      if (bar_L_init < 0) {
        bar_L_init = bar_L.x;
        bar_R_init = bar_R.x;
      }
      // if (!CC_BUILD) {
      //     blood_L.string = '9'
      //     blood_R.string = '9'
      //     bar_L.x = bar_L_init + (1 - 3 / 9) * bar_width
      //     bar_R.x = bar_R_init + (1 - 3 / 9) * bar_width
      // }
    }
    auto_doc(get_blood_map_url, (res) => {
      if (res && res.length == 1) {
        let doc = res[0];
        cc.log("bloodmap", doc);
        on_blood_map_doc_big_blood(doc, this);
      }
    });
  }
  player_id_L = "";
  player_id_R = "";
  initWS() {}
  set_timeout(data) {
    // this.timeout_L.string = data.timeout_L
    // this.timeout_R.string = data.timeout_R
  }
  findPlayerOnBar(pid) {
    for (let row of this.player_row_L) {
      if (pid == row.player_id) return row;
    }
    for (let row of this.player_row_R) {
      if (pid == row.player_id) return row;
    }
  }
}
