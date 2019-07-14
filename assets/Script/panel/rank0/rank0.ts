import { Timer } from "../../com/timer";
import { getWsUrl, loadImg64 } from '../../web';
import { WSEvent } from '../../api';
import { setText, ccType } from '../../__c';

const { ccclass, property } = cc._decorator;
declare let io;
declare let _c_;
@ccclass
export default class Rank0 extends cc.Component {
    id: string//同步的时候区分自己
    gameTimer: Timer = new Timer()
    onload() {
        this.gameTimer.initTimer(this, 'txt_timer')
    }
    start() {
        //init game timer
        this.gameTimer.isMin = false
        this.gameTimer.resetTimer()

        this.initWS()

    }

    initWS() {
        let ws = getWsUrl()
        io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })
            .on(WSEvent.sc_setFoul, data => {
                cc.log('sc_setFoul', data)
                this.setFoul_L(data.lFoul)
                this.setFoul_R(data.rFoul)
            })
            .on(WSEvent.sc_setPlayer, data => {
                cc.log('sc_setPlayer', data)
                this.setPlayer(0, data.leftPlayer)
                this.setPlayer(1, data.rightPlayer)
                if (data.isRestFoul) {
                    this.setFoul_L(0)
                    this.setFoul_R(0)
                }
            })
    }
    setPlayer(isR, player) {
        cc.log('setPlayer', player)
        let nm1 = isR ? 'txt_player_right' : 'txt_player_left';
        setText(nm1, player.name)
        if (player.avatar) {
            let sp = isR ? 'avt_R' :'avt_L';
            loadImg64(sp, player.avatar)
        }
        let txt_hw = isR ? 'txt_hw_R' : 'txt_hw_L';
        let hw = player.height + 'cm/' + player.weight + 'kg'
        setText(txt_hw, hw)

        //球员简介

        let txt_info = isR ? 'txt_info_R' : 'txt_info_L';
        let player_info = player.info
        // player_info = '一二三十万六七八九十一二三十万六七八九十一二三十万六七八九十'

        setText(txt_info, player_info)
    }
    foulToFT: number = 3
    setFoul_L(foul, foulToFT?) {
        if (foulToFT)
            this.foulToFT = foulToFT
        setText('txt_foul_L', foul)
        let progress = foul / this.foulToFT
        this.setFoulBar(false, progress)
    }

    setFoulBar(isRight, progress) {
        let foulBar = isRight ? 'foulBar_R' : 'foulBar_L'
        cc.log('setFoulBar', foulBar, progress)
        _c_.emit(ccType.ProgressBar, {
            name: foulBar, progress: progress, callbackMap: [
                [1, (node) => {
                    cc.log('on progress', node)
                    let anim: cc.Animation = node.getComponent(cc.Animation)
                    anim.play('foul_bar_max')
                }],
                [0, (node) => {
                    cc.log('on progress', node)
                    let anim: cc.Animation = node.getComponent(cc.Animation)
                    anim.stop('foul_bar_max')
                    anim.play('foul_bar_normal')
                }],
            ]
        })
    }

    setFoul_R(foul, foulToFT?) {
        if (foulToFT)
            this.foulToFT = foulToFT
        setText('txt_foul_R', foul)
        let progress = foul / this.foulToFT
        this.setFoulBar(true, progress)
    }
    // update (dt) {}
}
