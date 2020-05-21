import { Timer } from "../../com/timer";
import { setText, getNode, ccType } from "../../__c";
import { WSEvent } from "../../api";
import { getWsUrl, loadImg64, get_basescore_com } from "../../web";
import { BaseGame } from "../ww3/ww3_op";
import { TimerStack } from "../../com/TimerStack";
import { HboxView } from "./../utils/HboxView";
import { ToggleView } from "./../utils/ToggleView";

const { ccclass, property } = cc._decorator;
declare let io;
declare let _c_;
declare let axios;
let timer_stack = new TimerStack();
function getGame3v3(): BaseGame {
  return window["game3v3"];
}

export function get_now_sec_1970() {
  return Math.floor(new Date().getTime() / 1000);
}
@ccclass
export default class Game3v3 extends cc.Component {
  id: string; //同步的时候区分自己
  gameTimer: Timer = new Timer();

  @property(cc.Node) //
  node_timer: cc.Node = null;

  //   @property(cc.Node) //
  //   node_foul_bar_blue: cc.Node = null;

  //   @property(cc.Node) //
  //   node_foul_bar_red: cc.Node = null;

  @property(cc.Node) //
  node_foul_notice_L: cc.Node = null;

  @property(cc.Node) //
  node_foul_notice_R: cc.Node = null;

  @property(cc.Node) //
  node_game_process_num: cc.Node = null;

  @property(cc.Node) //
  node_game_process_flag: cc.Node = null;

  @property(cc.Node) //
  node_foul_dot_L: cc.Node = null;

  @property(cc.Node) //
  node_foul_dot_R: cc.Node = null;

  foul_dot_view_L: HboxView;
  foul_dot_view_R: HboxView;
  foul_notice_view_L: ToggleView;
  foul_notice_view_R: ToggleView;
  col_map = {
    "1": cc.color(1, 159, 247),
    "2": cc.color(2, 205, 128),
    "3": cc.color(174, 102, 241),
  };

  team_name_L: cc.Node;
  team_name_R: cc.Node;

  delay_cache = [];
  is_init = false;

  onLoad() {
    this.id = new Date().getTime().toString();
    // this.gameTimer.initTimer(this, 'txt_timer')
    this.gameTimer.initTimer(new cc.Component(), (cont) => {
      this.node_timer.getComponent(cc.Label).string = cont;
    });
    this.gameTimer.isMin = false;

    this.foul_dot_view_L = new HboxView({
      node: this.node_foul_dot_L,
      basename: "dot_",
      len: 5,
    });

    this.foul_dot_view_R = new HboxView({
      node: this.node_foul_dot_R,
      basename: "dot_",
      len: 5,
    });

    this.foul_notice_view_L = new ToggleView({
      node: this.node_foul_notice_L,
      path_arr: ["flag_tech_foul", "flag_volate"],
    });
    this.foul_notice_view_R = new ToggleView({
      node: this.node_foul_notice_R,
      path_arr: ["flag_tech_foul", "flag_volate"],
    });
    //   this.node_foul_dot.getComponent(cc.Sprite).spriteF
  }
  isLoadOP = false;
  delay: number = 0;
  addOp() {
    if (!this.isLoadOP) {
      //   cc.loader.loadRes("prefab/op_3v3", cc.Prefab, (err, prefab) => {
      //     var newNode = cc.instantiate(prefab);
      //     cc.director.getScene().addChild(newNode);
      //     this.isLoadOP = true;
      //   });
    }
  }
  start() {
    if (!CC_BUILD) {
      this.addOp();
    }
    if (window["no_timer"]) {
      this.node_timer.opacity = 0;
    }
    this.setScore({ lScore: 0, rScore: 0 });
    this.setFoul_L(0);
    this.setFoul_R(0);
    this.gameTimer.resetTimer();

    setText("txt_team_L", "");
    setText("txt_team_R", "");

    this.team_name_L = cc.find("txt_team_L", this.node); //.getComponent(cc.Label)
    this.team_name_R = cc.find("txt_team_R", this.node); //.getComponent(cc.Label)

    this.initWS();
    // _c_.emit(ccType.Node, { name: 'bg2_4v4', active: false })

    // this.set4v4Icon({ is4v4: true })
    this.auto_basescore();

    if (!CC_BUILD) {
      this.test();
    }
  }

  last_timestamp = -1;
  auto_basescore() {
    get_basescore_com((data) => {
      setTimeout((_) => {
        this.auto_basescore();
      }, 1000);

      if (data.length) {
        let doc = data[0];
        if (Number(doc.delay) > 0) {
          if (this.is_init) {
            if (this.last_timestamp != doc.timestamp)
              this.delay_cache.push({ timestamp: doc.timestamp, doc: doc });
            this.last_timestamp = doc.timestamp;
            let now = get_now_sec_1970();
            let a = [];
            let has_cache = false;
            for (let i = 0; i < this.delay_cache.length; i++) {
              let item = this.delay_cache[i];
              let timestamp = item.timestamp;
              if (now - Number(doc.delay) > timestamp) {
                this.set_basescore(item.doc);
                has_cache = true;
              } else {
                a.push(item);
              }
            }
            this.delay_cache = a;
            if (!has_cache) {
              cc.log("no cache");
              this.set_timer(doc, true);
            }
          } else {
            this.is_init = true;
            this.last_timestamp = doc.timestamp;
            this.set_basescore(doc);
          }
        } else this.set_basescore(doc);
      }
    });
  }

  test() {
    let url = "http://rtmp.icassi.us:8092/img/player/0323/p1.png";
    loadImg64("player_info_avt", url);
    this.node_game_process_num.getComponent(cc.Label).string = "2";
    this.node_game_process_flag.getComponent(cc.Label).string = "ND";
    this.foul_notice_view_L.show_child("flag_volate");
    this.foul_notice_view_R.show_child("flag_volate");
      setTimeout((_) => {
    this.foul_notice_view_L.show_child("");
    this.foul_notice_view_R.show_child("");
        
      // this.auto_basescore();
      //   this.foul_dot_view_L.show_num_children(3);
      //   this.foul_dot_view_R.show_num_children(2);
    }, 3000);
  }

  foul_num_pos_x = [-38, 0, 42, 80, 113, 156];
  foulToFT: number = 5;
  setFoul_L(foul, foulToFT?) {
    let g3 = getGame3v3();
    g3.lFoul = Number(foul);
    setText("txt_foul_L", foul);
    if (foul > 5) {
      foul = 5;
    }
    if (foul < 0) {
      foul = 0;
    }
    this.foul_dot_view_L.show_num_children(foul);
    // this.node_foul_bar_blue.x = this.foul_num_pos_x[foul];
  }

  setFoul_R(foul, foulToFT?) {
    let g3 = getGame3v3();
    g3.rFoul = Number(foul);
    setText("txt_foul_R", foul);

    if (foul > 5) {
      foul = 5;
    }
    if (foul < 0) {
      foul = 0;
    }
    this.foul_dot_view_R.show_num_children(foul);
  }

  setScore(data) {
    let g3 = getGame3v3();
    g3.lScore = Number(data.lScore);
    g3.rScore = Number(data.rScore);
    setText("txt_score_L", data.lScore);
    setText("txt_score_R", data.rScore);
  }

  set4v4Icon(data) {
    _c_.emit(ccType.Node, { name: "bg2_4v4", active: data.is4v4 });
    _c_.emit(ccType.Node, { name: "bg2_1v1", active: !data.is4v4 });
  }

  timestamp: string;
  set_basescore(param) {
    let doc = param;
    this.set_timer(doc);
    this.setScore({ lScore: doc.score_L, rScore: doc.score_R });
    this.setFoul_L(doc.foul_L);
    this.setFoul_R(doc.foul_R);
    this.set_player(doc);

    if (doc.rec != "") {
      let a = doc.rec.split("_");
      if (a.length == 2) {
        // this.dot_1.spriteFrame = this.dot_tex['dot_' + a[0]]
        // this.dot_2.spriteFrame = this.dot_tex['dot_' + a[1]]
        // this.team_name_L.color = this.col_map[a[0]]
        // this.team_name_R.color = this.col_map[a[1]]
      }
    }
  }

  set_timer(doc, is_cache = false) {
    // timer_stack.set_stack(doc.timer_stack);
    // let sec;
    // if (Number(doc.delay) > 0)
    //   sec = timer_stack.get_time_sec(Number(doc.delay), is_cache);
    // else sec = timer_stack.get_time_sec(0, is_cache);
    // // if (Number(doc.delay) > 0)
    // //     sec += Number(doc.delay)
    // this.gameTimer.setTimeBySec(sec);
  }
  set_player(data) {
    setText("txt_team_L", data.player_L);
    setText("txt_team_R", data.player_R);
  }

  initWS() {
    let ws = getWsUrl();
    io(ws)
      .on("connect", (_) => {
        cc.log("socketio.....localWS");
      })
      .on("LIVE_TIMER_EVENT", (data) => {
        if (data["param"]) {
          const jd = JSON.parse(data["param"]);
          cc.log("LIVE_TIMER_EVENT", jd);
          this.gameTimer.setTimerEvent(jd);
        }
      });
  }
}
