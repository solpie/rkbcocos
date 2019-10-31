import { Timer } from "../../com/timer";
import { getWsUrl, loadImg64, get_basescore, loadImg64ByNode } from '../../web';
import { WSEvent } from '../../api';
import { setText, ccType } from '../../__c';
import { get_auto_timer } from "../../com/autoTimer";
import { SideBloodView } from "../ww3/side_blood/SideBloodView";

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
    hint_score_L: cc.Animation
    hint_score_R: cc.Animation
    hint_foul_L: cc.Animation
    hint_foul_R: cc.Animation

    blood_bar_L: cc.Node
    blood_bar_R: cc.Node

    node_hint_score_L: cc.Node
    node_hint_score_R: cc.Node

    player_name_L: cc.Label
    player_name_R: cc.Label
    onload() {
        // this.gameTimer.initTimer(this, 'txt_timer')
    }
    start() {
        if (window['no_timer']) {
            cc.find('front_panel/txt_timer', this.node).opacity = 0
        }
        else {
            this.gameTimer.initTimer(this, 'txt_timer')
            //init game timer
            this.gameTimer.isMin = false
            this.gameTimer.resetTimer()
        }
        this.setPlayer(false, { name: '' })
        this.setPlayer(true, { name: '' })

        this.avt_L = this.node.getChildByName('mask_L').getChildByName("avt_L").getComponent(cc.Sprite)
        this.avt_R = this.node.getChildByName('mask_R').getChildByName("avt_R").getComponent(cc.Sprite)

        this.is_ww3 = window['panel_name'] == 'benxi_ww3'

        this.node_hint_score_L = cc.find('hint_score_L', this.node)
        this.hint_score_L = this.node_hint_score_L.getComponent(cc.Animation)
        this.node_hint_score_R = cc.find('hint_score_R', this.node)
        this.hint_score_R = this.node_hint_score_R.getComponent(cc.Animation)

        this.hint_foul_L = cc.find('hint_foul_L', this.node).getComponent(cc.Animation)
        this.hint_foul_R = cc.find('hint_foul_R', this.node).getComponent(cc.Animation)

        this.player_name_L = cc.find('front_panel/txt_player_L', this.node).getComponent(cc.Label)
        this.player_name_R = cc.find('front_panel/txt_player_R', this.node).getComponent(cc.Label)
        this.player_name_L.string = this.player_name_R.string = ''
        if (this.is_ww3) {//邀请赛
            this.node_hint_score_L.active = false
            this.node_hint_score_R.active = false
            this.blood_bar_L = cc.find('bloodbar/mask_L/bar', this.node)
            this.blood_bar_R = cc.find('bloodbar/mask_R/bar', this.node)
            BAR_INIT_Y_L = this.blood_bar_L.y
            BAR_INIT_Y_R = this.blood_bar_R.y
            this.setFoul_L(0)
            this.setFoul_R(0)
            if (!CC_BUILD) {
                setText('txt_score_L', 3)
                this.blood_bar_L.y = BAR_INIT_Y_L - (1 - 3 / 9) * BAR_HEIGHT
                this.hint_foul_L.play('foul_hint')
            }
            this.initWS_ww3()
        }
        else {//冠军排位赛

            cc.find('bloodbar', this.node).active = false
            this.get_basescore2()
            this.initWS_rank0()
        }

    }
    initWS_rank0() {
        let ws = getWsUrl()
        io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })

            .on(WSEvent.sc_timerEvent, data => {
                cc.log('sc_timerEvent', data)
                this.gameTimer.setTimerEvent(data)
            })

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
            .on(WSEvent.sc_setPlayer, data => {
                cc.log('sc_setPlayer', data)
                let _set_player = (data) => {
                    this.setPlayer(0, data.leftPlayer)
                    this.setPlayer(1, data.rightPlayer)

                    let blood = data.leftPlayer.blood
                    setText('txt_score_L', blood)
                    if (blood < 0)
                        blood = 0
                    if (blood > data.leftPlayer.init_blood)
                        blood = data.leftPlayer.init_blood
                    this.blood_bar_L.y = BAR_INIT_Y_L - (1 - blood / data.leftPlayer.init_blood) * BAR_HEIGHT

                    blood = data.rightPlayer.blood
                    setText('txt_score_R', blood)
                    if (blood < 0)
                        blood = 0
                    if (blood > data.rightPlayer.init_blood)
                        blood = data.rightPlayer.init_blood
                    this.blood_bar_R.y = BAR_INIT_Y_R - (1 - blood / data.rightPlayer.init_blood) * BAR_HEIGHT

                    if (data.isRestFoul) {
                        this.setFoul_L(0)
                        this.setFoul_R(0)
                    }
                }
                _set_player(data)
                let sbv: SideBloodView = _c_['SideBloodView']
                if (sbv) {
                    sbv.set_player(data)
                }
            })
            .on(WSEvent.sc_timerEvent, data => {
                cc.log('sc_timerEvent', data)
                this.gameTimer.setTimerEvent(data)
            })
    }
    _set_blood(data) {
        let player_L = data.vsPlayerArr[0]
        let player_R = data.vsPlayerArr[1]
        for (let p of data.lTeam) {
            if (p.player_id == player_L) {
                setText('txt_score_L', p.blood)
                if (this.last_score_L != p.blood)
                    this.hint_score_L.play('foul_hint')
                this.last_score_L = p.blood
                let blood = p.blood
                if (blood < 0)
                    blood = 0
                if (blood > p.init_blood)
                    blood = p.init_blood
                this.blood_bar_L.y = BAR_INIT_Y_L - (1 - blood / p.init_blood) * BAR_HEIGHT
            }
        }
        for (let p of data.rTeam) {
            if (p.player_id == player_R) {
                setText('txt_score_R', p.blood)
                if (this.last_score_R != p.blood)
                    this.hint_score_R.play('foul_hint')
                this.last_score_R = p.blood
                let blood = p.blood
                if (blood < 0)
                    blood = 0
                if (blood > p.init_blood)
                    blood = p.init_blood
                this.blood_bar_R.y = BAR_INIT_Y_R - (1 - blood / p.init_blood) * BAR_HEIGHT
            }
        }
    }
    get_basescore2() {
        get_basescore(data => {
            setTimeout(_ => {
                this.get_basescore2()
            }, 1000)

            cc.log(data)
            if (data.length) {
                let doc = data[0]
                this.setFoul_L(doc.foul_L)
                this.setFoul_R(doc.foul_R)
                this.set_score(doc)
                if (doc.avatar_L)
                    loadImg64ByNode(this.avt_L, doc.avatar_L)
                if (doc.avatar_R)
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

            }
        })
    }

    setPlayer(isR, player) {
        cc.log('setPlayer', player)
        let nm1 = isR ? 'txt_player_R' : 'txt_player_L';
        setText(nm1, player.name)

        if (player.avatar) {
            let sp = isR ? 'avt_R' : 'avt_L';
            loadImg64(sp, player.avatar)
        }
    }

    foulToFT: number = 3
    setFoul_L(foul, foulToFT?) {
        if (foulToFT)
            this.foulToFT = foulToFT
        setText('txt_foul_L', foul)
        if (this.last_foul_L != foul)
            this.hint_foul_L.play('foul_hint')
        this.last_foul_L = foul
    }
    last_score_L = -1
    last_score_R = -1
    set_score(doc) {
        setText('txt_score_L', doc.score_L)
        setText('txt_score_R', doc.score_R)
        if (this.last_score_L != doc.score_L)
            this.hint_score_L.play('foul_hint')
        this.last_score_L = doc.score_L
        if (this.last_score_R != doc.score_R)
            this.hint_score_R.play('foul_hint')
        this.last_score_R = doc.score_R
        this.player_name_L.string = doc.player_L
        this.player_name_R.string = doc.player_R

        // setText('txt_player_L', doc.player_L)
        // setText('txt_player_R', doc.player_R)
    }
    last_foul_L = -1
    last_foul_R = -1
    setFoul_R(foul, foulToFT?) {
        if (foulToFT)
            this.foulToFT = foulToFT
        setText('txt_foul_R', foul)
        if (this.last_foul_R != foul)
            this.hint_foul_R.play('foul_hint')
        this.last_foul_R = foul
    }
    // update (dt) {}
}
