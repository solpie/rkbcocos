import { Timer } from "../../com/timer";
import { TimerStack } from "../../com/TimerStack";
import {
  auto_doc,
  get_basescore,
  get_blood_map_url,
  loadImg64,
} from "../../web";
import { setText } from "../../__c";
import { on_get_blood_map_doc } from "./ww3doc_TJ";

const { ccclass, property } = cc._decorator;
declare let io;
declare let _c_;
let timer_stack = new TimerStack();

// let BAR_INIT_Y_L, BAR_INIT_Y_R
@ccclass
export default class Rank0TJ extends cc.Component {
  id: string; //同步的时候区分自己
  gameTimer: Timer = new Timer();
  // avt_L: cc.Sprite;
  // avt_R: cc.Sprite;
  auto_timer_url: string = "";
  // is_ww3 = false;
  hint_score_L: cc.Animation;
  hint_score_R: cc.Animation;
  hint_foul_L: cc.Animation;
  hint_foul_R: cc.Animation;

  blood_bar_L: cc.Node;
  blood_bar_R: cc.Node;

  node_hint_score_L: cc.Node;
  node_hint_score_R: cc.Node;

  player_name_L: cc.Label;
  player_name_R: cc.Label;

  BAR_INIT_Y_L;
  BAR_INIT_Y_R;
  BAR_HEIGHT = 98;

  @property(cc.Node) //
  node_timer: cc.Node = null;

  @property(cc.Node) //
  node_blood_bar_blue: cc.Node = null;

  @property(cc.Node) //
  node_blood_bar_red: cc.Node = null;

  @property(Boolean) //
  is_ww3_panel: Boolean = false;

  onload() {
    // this.gameTimer.initTimer(this, 'txt_timer')
  }
  start() {
    if (window["no_timer"]) {
      this.node_timer.opacity = 0;
    }
    this.gameTimer.initTimer(new cc.Component(), (cont) => {
      this.node_timer.getComponent(cc.Label).string = cont;
    });
    this.gameTimer.isMin = false;

    this.gameTimer.resetTimer();

    // this.avt_L = this.node
    //   .getChildByName("mask_L")
    //   .getChildByName("avt_L")
    //   .getComponent(cc.Sprite);
    // this.avt_R = this.node
    //   .getChildByName("mask_R")
    //   .getChildByName("avt_R")
    //   .getComponent(cc.Sprite);

    // this.is_ww3 = window["panel_name"] == "benxi_ww3";
    // this.is_ww3 = window["panel_name"] == "ww3";

    this.node_hint_score_L = cc.find("hint_score_L", this.node);
    this.hint_score_L = this.node_hint_score_L.getComponent(cc.Animation);
    this.node_hint_score_R = cc.find("hint_score_R", this.node);
    this.hint_score_R = this.node_hint_score_R.getComponent(cc.Animation);

    this.hint_foul_L = cc
      .find("hint_foul_L", this.node)
      .getComponent(cc.Animation);
    this.hint_foul_R = cc
      .find("hint_foul_R", this.node)
      .getComponent(cc.Animation);

    this.player_name_L = cc
      .find("front_panel/txt_player_L", this.node)
      .getComponent(cc.Label);
    this.player_name_R = cc
      .find("front_panel/txt_player_R", this.node)
      .getComponent(cc.Label);
    this.player_name_L.string = this.player_name_R.string = "";

    this.setPlayer(false, { name: "" });
    this.setPlayer(true, { name: "" });
    if (this.is_ww3_panel) {
      //邀请赛
      this.node_hint_score_L.active = false;
      this.node_hint_score_R.active = false;
      this.blood_bar_L = cc.find("bloodbar/mask_L/bar", this.node);
      this.blood_bar_R = cc.find("bloodbar/mask_R/bar", this.node);
      this.BAR_INIT_Y_L = this.blood_bar_L.y;
      this.BAR_INIT_Y_R = this.blood_bar_R.y;
      this.setFoul_L(0);
      this.setFoul_R(0);
      if (!CC_BUILD) {
        setText("txt_score_L", 3);
        this.blood_bar_L.y = this.BAR_INIT_Y_L - (1 - 3 / 9) * this.BAR_HEIGHT;
        this.hint_foul_L.play("foul_hint");
      }
      this.initWS_ww3();
      auto_doc(get_blood_map_url, (res) => {
        cc.log("auto_doc get_blood_map_url");
        if (res && res.length == 1) {
          let doc = res[0];
          cc.log("bloodmap", doc);
          on_get_blood_map_doc(doc, this);
          // this.set_timer(doc);
        }
      });
    } else {
      //冠军排位赛

      cc.find("bloodbar", this.node).active = false;
      this.get_basescore2();
      this.initWS_rank0();
    }
  }
  initWS_rank0() {
    // let ws = getWsUrl();
    // io(ws)
    //   .on("connect", _ => {
    //     console.log("socketio.....localWS");
    //     // console.log()
    //   })
    //   .on(WSEvent.sc_timerEvent, data => {
    //     cc.log("sc_timerEvent", data);
    //     this.gameTimer.setTimerEvent(data);
    //   });
  }
  set_timer(doc, is_cache = false) {
    timer_stack.set_stack(doc.timer_stack);
    let sec;
    if (Number(doc.delay) > 0)
      sec = timer_stack.get_time_sec(Number(doc.delay), is_cache);
    else sec = timer_stack.get_time_sec(0, is_cache);
    // if (Number(doc.delay) > 0)
    //     sec += Number(doc.delay)
    this.gameTimer.setTimeBySec(sec);
  }
  initWS_ww3() {
    // let ws = getWsUrl();
    // io(ws)
    //   .on("connect", _ => {
    //     cc.log("socketio.....localWS");
    //   })
    //   .on(WSEvent.sc_setPlayer, data => {})
    //   .on(WSEvent.sc_timerEvent, data => {
    //     cc.log("sc_timerEvent", data);
    //     this.gameTimer.setTimerEvent(data);
    //   });
  }
  _set_blood(data) {
    let player_L = data.vsPlayerArr[0];
    let player_R = data.vsPlayerArr[1];
    for (let p of data.lTeam) {
      if (p.player_id == player_L) {
        setText("txt_score_L", p.blood);
        if (this.last_score_L != p.blood) this.hint_score_L.play("foul_hint");
        this.last_score_L = p.blood;
        let blood = p.blood;
        if (blood < 0) blood = 0;
        if (blood > p.init_blood) blood = p.init_blood;
        this.blood_bar_L.y =
          this.BAR_INIT_Y_L - (1 - blood / p.init_blood) * this.BAR_HEIGHT;
      }
    }
    for (let p of data.rTeam) {
      if (p.player_id == player_R) {
        setText("txt_score_R", p.blood);
        if (this.last_score_R != p.blood) this.hint_score_R.play("foul_hint");
        this.last_score_R = p.blood;
        let blood = p.blood;
        if (blood < 0) blood = 0;
        if (blood > p.init_blood) blood = p.init_blood;
        this.blood_bar_R.y =
          this.BAR_INIT_Y_R - (1 - blood / p.init_blood) * this.BAR_HEIGHT;
      }
    }
  }

  get_basescore2() {
    get_basescore((data) => {
      setTimeout((_) => {
        this.get_basescore2();
      }, 1000);

      cc.log(data);
      if (data.length) {
        let doc = data[0];
        this.setFoul_L(doc.foul_L);
        this.setFoul_R(doc.foul_R);
        this.set_score(doc);
        // if (doc.avatar_L) {
        //   loadImg64ByNode(this.avt_L, doc.avatar_L, true);
        // }
        // if (doc.avatar_R) {
        //   loadImg64ByNode(this.avt_R, doc.avatar_R, true);
        // }
        this.set_timer(doc);

        if (doc.auto_timer_url != this.auto_timer_url) {
          this.auto_timer_url = doc.auto_timer_url;
          let url = "http://192.168.1.196:8090/results.xml";
          // get_auto_timer(this.auto_timer_url, doc => {
          //     let text = doc.children[0].getElementsByTagName('text')[0].textContent
          //     if (text) {
          //         setText('txt_timer', text)
          //     }
          // })
        }
      }
    });
  }

  setPlayer(isR, player) {
    cc.log("setPlayer", player);
    // let nm1 = isR ? "txt_player_R" : "txt_player_L";
    // setText(nm1, player.name);
    if (isR) {
      this.player_name_R.string = player.name;
    } else {
      this.player_name_L.string = player.name;
    }
    if (player.avatar) {
      // let sp = isR ? "avt_R" : "avt_L";
      // loadImg64(sp, player.avatar, true);
    }
  }

  foulToFT: number = 3;
  setFoul_L(foul, foulToFT?) {
    if (foulToFT) this.foulToFT = foulToFT;
    setText("txt_foul_L", foul);
    if (this.last_foul_L != foul) this.hint_foul_L.play("foul_hint");
    this.last_foul_L = foul;
  }
  last_score_L = -1;
  last_score_R = -1;
  set_score(doc) {
    setText("txt_score_L", doc.score_L);
    setText("txt_score_R", doc.score_R);
    if (this.last_score_L != doc.score_L) this.hint_score_L.play("foul_hint");
    this.last_score_L = doc.score_L;
    if (this.last_score_R != doc.score_R) this.hint_score_R.play("foul_hint");
    this.last_score_R = doc.score_R;
    this.player_name_L.string = doc.player_L;
    this.player_name_R.string = doc.player_R;

    // setText('txt_player_L', doc.player_L)
    // setText('txt_player_R', doc.player_R)
  }
  last_foul_L = -1;
  last_foul_R = -1;
  setFoul_R(foul, foulToFT?) {
    if (foulToFT) this.foulToFT = foulToFT;
    setText("txt_foul_R", foul);
    if (this.last_foul_R != foul) this.hint_foul_R.play("foul_hint");
    this.last_foul_R = foul;
  }
  // update (dt) {}
}
