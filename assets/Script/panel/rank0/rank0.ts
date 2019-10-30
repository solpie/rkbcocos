import { Timer } from "../../com/timer";
import { getWsUrl, loadImg64, get_basescore, loadImg64ByNode } from '../../web';
import { WSEvent } from '../../api';
import { setText, ccType } from '../../__c';
import { get_auto_timer } from "../../com/autoTimer";

const { ccclass, property } = cc._decorator;
declare let io;
declare let _c_;
let BAR_INIT_Y_L, BAR_INIT_Y_R
const BAR_HEIGHT = 98
@ccclass
export default class Rank0 extends cc.Component {
    id: string//同步的时候区分自己
    gameTimer: Timer = new Timer()
    avt_L: cc.Sprite
    avt_R: cc.Sprite
    auto_timer_url: string = ''
    is_ww3 = false
    hint_score_L: cc.Node
    hint_score_R: cc.Node
    hint_foul_L: cc.Node
    hint_foul_R: cc.Node

    blood_bar_L: cc.Node
    blood_bar_R: cc.Node
    onload() {
        // this.gameTimer.initTimer(this, 'txt_timer')
    }
    start() {
        if (window['no_timer']) {
            cc.find('front_panel/txt_timer', this.node).opacity = 0
        }
        this.avt_L = this.node.getChildByName('mask_L').getChildByName("avt_L").getComponent(cc.Sprite)
        this.avt_R = this.node.getChildByName('mask_R').getChildByName("avt_R").getComponent(cc.Sprite)

        this.is_ww3 = window['panel_name'] == 'benxi_ww3'

        this.hint_score_L = cc.find('hint_score_L', this.node)
        this.hint_score_R = cc.find('hint_score_R', this.node)

        this.hint_foul_L = cc.find('hint_foul_L', this.node)
        this.hint_foul_R = cc.find('hint_foul_R', this.node)

        if (this.is_ww3) {//邀请赛
            this.hint_score_L.active = false
            this.hint_score_R.active = false
            this.blood_bar_L = cc.find('bloodbar/mask_L/bar', this.node)
            this.blood_bar_R = cc.find('bloodbar/mask_R/bar', this.node)
            BAR_INIT_Y_L = this.blood_bar_L.y
            BAR_INIT_Y_R = this.blood_bar_R.y
            if (!CC_BUILD) {
                setText('txt_score_L', 3)
                this.blood_bar_L.y = BAR_INIT_Y_L - (1 - 3 / 9) * BAR_HEIGHT
            }
            this.initWS_ww3()
        }
        else {//冠军排位赛
            cc.find('bloodbar', this.node).active = false
            this.get_basescore2()
        }

    }
    initWS_ww3() {
        let ws = getWsUrl()
        io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })
            .on(WSEvent.sc_manual_blood, data => {
                cc.log('sc_manual_blood', data)
                this._set_blood(data)
                // let sbv: SideBloodView = _c_['SideBloodView']
                // if (sbv) {
                //     sbv.set_vs_player(data)
            })
            .on(WSEvent.sc_setFoul, data => {
                cc.log('sc_setFoul', data)
                this.setFoul_L(data.lFoul)
                this.setFoul_R(data.rFoul)
            })
    }
    _set_blood(data) {
        let player_L = data.vsPlayerArr[0]
        let player_R = data.vsPlayerArr[1]
        for (let p of data.lTeam) {
            if (p.player_id == player_L) {
                setText('txt_score_L', p.blood)
                this.blood_bar_L.y = BAR_INIT_Y_L - (1 - p.blood / p.init_blood) * BAR_HEIGHT
            }
        }
        for (let p of data.rTeam) {
            if (p.player_id == player_R) {
                setText('txt_score_R', p.blood)
                this.blood_bar_R.y = BAR_INIT_Y_R - (1 - p.blood / p.init_blood) * BAR_HEIGHT
            }
        }
    }
    get_basescore2() {
        get_basescore(data => {
            cc.log(data)
            if (data.length) {
                let doc = data[0]
                this.setFoul_L(doc.foul_L)
                this.setFoul_R(doc.foul_R)
                this.set_score(doc)
                loadImg64ByNode(this.avt_L, doc.avatar_L)
                loadImg64ByNode(this.avt_R, doc.avatar_R)
                if (doc.auto_timer_url != this.auto_timer_url) {
                    this.auto_timer_url = doc.auto_timer_url
                    let url = 'http://192.168.1.196:8090/results.xml'
                    get_auto_timer(this.auto_timer_url, doc => {
                        let text = doc.children[0].getElementsByTagName('text')[0].textContent
                        if (text) {
                            setText('txt_timer', text)
                        }
                    })
                }
                setTimeout(_ => {
                    this.get_basescore2()
                }, 1000)
            }
        })
    }
    setPlayer(isR, player) {
        cc.log('setPlayer', player)
        let nm1 = isR ? 'txt_player_right' : 'txt_player_left';
        setText(nm1, player.name)
        if (player.avatar) {
            let sp = isR ? 'avt_R' : 'avt_L';
            loadImg64(sp, player.avatar)
        }
        // let txt_hw = isR ? 'txt_hw_R' : 'txt_hw_L';
        // let hw = player.height + 'cm/' + player.weight + 'kg'
        // setText(txt_hw, hw)
    }
    foulToFT: number = 3
    setFoul_L(foul, foulToFT?) {
        if (foulToFT)
            this.foulToFT = foulToFT
        setText('txt_foul_L', foul)
    }

    set_score(doc) {
        setText('txt_score_L', doc.score_L)
        setText('txt_score_R', doc.score_R)
        setText('txt_player_L', doc.player_L)
        setText('txt_player_R', doc.player_R)
    }

    setFoul_R(foul, foulToFT?) {
        if (foulToFT)
            this.foulToFT = foulToFT

        setText('txt_foul_R', foul)
    }
    // update (dt) {}
}
