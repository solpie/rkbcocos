import { Timer } from "../../com/timer";
import { getWsUrl, loadImg64, get_basescore, loadImg64ByNode } from '../../web';
import { WSEvent } from '../../api';
import { setText, ccType } from '../../__c';
import { get_auto_timer } from "../../com/autoTimer";

const { ccclass, property } = cc._decorator;
declare let io;
declare let _c_;
@ccclass
export default class Rank0 extends cc.Component {
    id: string//同步的时候区分自己
    gameTimer: Timer = new Timer()
    avt_L: cc.Sprite
    avt_R: cc.Sprite
    auto_timer_url: string = ''
    onload() {
        this.gameTimer.initTimer(this, 'txt_timer')
    }
    start() {
        //init game timer
        this.gameTimer.isMin = false
        this.gameTimer.resetTimer()
        this.avt_L = this.node.getChildByName('mask_L').getChildByName("avt_L").getComponent(cc.Sprite)
        this.avt_R = this.node.getChildByName('mask_R').getChildByName("avt_R").getComponent(cc.Sprite)

        // this.initWS()
        this.get_basescore2()
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
                    this.gameTimer.pauseTimer()
                    get_auto_timer(doc.auto_timer_url, res => {
                        let min = res.getElementsByTagName('min')[0]
                        let sec = res.getElementsByTagName('sec')[0]
                        let text = res.getElementsByTagName('text')[0]
                        min = Number(min.textContent)
                        sec = Number(sec.textContent)
                        if (text) {
                            this.gameTimer.setTimeBySec(text)
                        }
                        else{
                            this.gameTimer.setTimeBySec(sec + min * 60)

                        }
                    })
                }
                setTimeout(_ => {
                    this.get_basescore2()
                }, 1000)
            }
        })
    }
    get_auto_timer() {
        get_timer(res => {
            let min = res.getElementsByTagName('min')[0]
            let sec = res.getElementsByTagName('sec')[0]
            min = Number(min.textContent)
            sec = Number(sec.textContent)
            // console.log(min, sec)
            if (this.worldWar.timer)
                this.worldWar.timer.setTimeBySec(min * 60 + sec)
        })
    }
    initWS() {
        let ws = getWsUrl()
        // io(ws)
        //     .on('connect', _ => {
        //         cc.log('socketio.....localWS')
        //     })
        //     .on(WSEvent.sc_setFoul, data => {
        //         cc.log('sc_setFoul', data)
        //         this.setFoul_L(data.lFoul)
        //         this.setFoul_R(data.rFoul)
        //     })
        //     .on(WSEvent.sc_setPlayer, data => {
        //         cc.log('sc_setPlayer', data)
        //         this.setPlayer(0, data.leftPlayer)
        //         this.setPlayer(1, data.rightPlayer)
        //         if (data.isRestFoul) {
        //             this.setFoul_L(0)
        //             this.setFoul_R(0)
        //         }
        //     })
    }
    setPlayer(isR, player) {
        cc.log('setPlayer', player)
        let nm1 = isR ? 'txt_player_right' : 'txt_player_left';
        setText(nm1, player.name)
        if (player.avatar) {
            let sp = isR ? 'avt_R' : 'avt_L';
            loadImg64(sp, player.avatar)
        }
        let txt_hw = isR ? 'txt_hw_R' : 'txt_hw_L';
        let hw = player.height + 'cm/' + player.weight + 'kg'
        setText(txt_hw, hw)

        //球员简介

        // let txt_info = isR ? 'txt_info_R' : 'txt_info_L';
        // let player_info = player.info
        // // player_info = '一二三十万六七八九十一二三十万六七八九十一二三十万六七八九十'

        // setText(txt_info, player_info)
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
