import { conf, WSEvent } from '../api';
import { setText } from '../__c';
import { ccType } from './../__c';
import { loadImg64 } from '../web';
import { Timer } from '../com/timer';
const { ccclass } = cc._decorator;
declare let io;
declare let axios;
declare let _c_;
const nm = {//value is the name in creator
    txt_team_score: 'txt_team_score',
    txt_team_left: 'txt_team_left',
    txt_team_right: 'txt_team_right',
    txt_player_left: 'txt_player_left',
    txt_player_right: 'txt_player_right',
    txt_blood_L: 'txt_blood_L',
    txt_blood_R: 'txt_blood_R',
    sp_avt_L: 'avt_L',
}
@ccclass
export default class Worldwar3 extends cc.Component {
    gameTimer: Timer = new Timer()
    onLoad() {
        console.log('onLoad Worldwar3')
        this.gameTimer.initTimer(this, 'txt_timer')
    }

    start() {
        // init logic
        console.log('start worldwar3')

        //init game timer
        this.gameTimer.isMin = false
        this.gameTimer.resetTimer()


        this.initWS()
        this.test()

    }

    initTimer() {
        this.schedule(_ => {
            setText('1', "1")
        }, 1, Infinity)
    }
    test() {
        // setText(nm.txt_player_left, 'Tade wade')
        // _c_.emit(ccType.Sp   rite, { name: nm.sp_avt_L, img64: img64 })

        setTimeout(() => {
            let url = 'http://rtmp.icassi.us:8092/img/player/0323/p1.png'
            loadImg64(nm.sp_avt_L, url)
            setText(nm.txt_team_score, '0 - 0')
            setText(nm.txt_blood_L, '2')
            setText(nm.txt_player_right, '马克')

            this.setPlayerDot(true, 3)
            this.setPlayerDot(false, 3, true)
        }, 2000);
    }
    setPlayerDot(isRight, count, isOn?) {
        let side = isRight ? 'R' : 'L'
        let prefix = 'player_dot_off_' + side;
        let total = this.foulToFT
        let clipName = isOn ? 'player_dot_on' : 'player_dot_off'
        function delayEmitOff(time, idx) {
            let compName = prefix + idx
            setTimeout(() => {
                _c_.emit(ccType.Animation, { name: compName, play: clipName })
            }, time);
        }
        for (let i = 0; i < total - count; i++) {
            let idx = isOn ? total - i : i + 1
            delayEmitOff(250 * i, idx)
        }
    }
    testPlayerDot() {
        cc.log('testPlayerDot..')
        setTimeout(() => {
            //all on
            this.setPlayerDot(false, 0, false)
            this.setPlayerDot(true, 0, false)
        }, 1);
        setTimeout(() => {
            //all on
            this.setPlayerDot(false, 0, true)
            this.setPlayerDot(true, 0, true)
        }, 2000);

        function testBloodText(time, text) {
            setTimeout(() => {
                setText(nm.txt_blood_L, text)
                setText(nm.txt_blood_R, text)
            }, time);
        }
        for (let i = 0; i < 11; i++) {
            testBloodText(i * 80, i)
        }


        let testFoulBar = (time, p) => {
            setTimeout(() => {
                this.setFoul_L(p)
                this.setFoul_R(p)
                // this.setFoulBar(true, p)
                // this.setFoulBar(false, p)
                this.setBloodBar(false, p * 15 / 100)
                this.setBloodBar(true, (p+1) * 15 / 100)
            }, time);
        }

        for (let i = 0; i < 6; i++) {
            testFoulBar(i * 280, i)
        }
        //test blood bar
        // _c_.emit(ccType.Sprite, { name: 'blood_bar_cursor_L', x: -200 })
    }

    foulToFT: number = 5
    setFoul_L(foul, foulToFT?) {
        if (foulToFT)
            this.foulToFT = foulToFT
        setText('txt_foul_L', foul)
        let progress = foul / this.foulToFT
        this.setFoulBar(false, progress)
    }
    setBloodBar(isR, perc) {
        //-495 -100
        let flag = isR ? -1 : 1
        let nm = isR ? 'blood_bar_cursor_R' : 'blood_bar_cursor_L'
        let max = -495//see left bar curso position in editor
        let min = -100
        let offs = (max - (max - min) * perc) * flag
        _c_.emit(ccType.Sprite, { name: nm, x: offs })
    }
    setFoul_R(foul, foulToFT?) {
        if (foulToFT)
            this.foulToFT = foulToFT
        setText('txt_foul_R', foul)
        let progress = foul / this.foulToFT
        this.setFoulBar(true, progress)
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

    initWS() {
        let ws = CC_BUILD ? conf.localWS : 'http://127.0.0.1/rkb';
        io(ws)
            .on('connect', function (msg) {
                cc.log('socketio.....localWS')
            })
            .on(WSEvent.sc_teamScore, data => {
                cc.log('sc_teamScore', data)
                setText(nm.txt_team_score, data.lScore + ' - ' + data.rScore)
            })
            .on(WSEvent.sc_timerEvent, data => {
                cc.log('sc_timerEvent', data)
                this.gameTimer.setTimerEvent(data)
            })
            .on(WSEvent.sc_setFoul, data => {
                cc.log('sc_setFoul', data)
                this.setFoul_L(data.lFoul)
                this.setFoul_R(data.rFoul)
            })
    }

}
