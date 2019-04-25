import { BloodBar } from './bloodBar';
import { showPlayerInfo } from './ww3_fx';
import { Timer, TimerEvent } from '../../com/timer';
import { setText, ccType } from '../../__c';
import { loadImg64, getPanelConf } from '../../web';
import { conf, WSEvent } from '../../api';
const { ccclass } = cc._decorator;
declare let io;
declare let _c_;
export const _nm_ = {//value is the name in creator
    txt_team_score: 'txt_team_score',
    txt_team_left: 'txt_team_left',
    txt_team_right: 'txt_team_right',
    txt_player_left: 'txt_player_left',
    txt_player_right: 'txt_player_right',
    txt_blood_L: 'txt_blood_L',
    txt_blood_R: 'txt_blood_R',
    txt_foul_L: 'txt_foul_L',
    txt_foul_R: 'txt_foul_R',
    sp_avt_L: 'avt_L',
    sp_avt_R: 'avt_R',

}
@ccclass
export default class Worldwar3 extends cc.Component {
    gameTimer: Timer = new Timer()
    bloodBar_L: BloodBar
    bloodBar_R: BloodBar
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
        //init blood bar
        this.bloodBar_L = new BloodBar(0)
        this.bloodBar_R = new BloodBar(1)
        this.bloodBar_L.reset()
        this.bloodBar_R.reset()
        this.setFoul_L(0)
        this.setFoul_R(0)
        //隐藏 info_bg
        setText('txt_info_L', '')
        setText('txt_info_R', '')
        setText(_nm_.txt_player_left, '')
        setText(_nm_.txt_player_right, '')
        _c_.emit(ccType.Node, { name: 'info_bg', active: false })
        setText(_nm_.txt_team_score, '0 - 0')

        this.initState()
        this.initWS()
        if (!CC_BUILD)
            this.test()
        else {
            _c_.emit(ccType.Node, { name: 'test_layer', active: false })
        }
    }

    test() {
        // _c_.emit(ccType.Node, { name: 'test_layer', active: false, opacity: 255 })
        setTimeout(() => {
            let url = 'http://rtmp.icassi.us:8092/img/player/0323/p1.png'
            loadImg64(_nm_.sp_avt_L, url)
            setText(_nm_.txt_team_score, '0 - 0')
            setText(_nm_.txt_blood_L, '2')
            setText(_nm_.txt_player_left, '李胜俊')
            setText(_nm_.txt_player_right, '马克')

            this.setPlayerDot(1, 3, false)
            this.setPlayerDot(0, 3, true)
            // this.setBloodBar(0,0.3)
        }, 2000);
    }
    playerDocTotal: number = 5
    setPlayerDot(isR, count, isOn?) {
        let side = isR ? 'R' : 'L'
        let prefix = 'player_dot_off_' + side;
        let total = this.playerDocTotal
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
        // setTimeout(() => {
        //     //all off
        //     this.setPlayerDot(false, 0, false)
        //     this.setPlayerDot(true, 0, false)
        // }, 1);
        // setTimeout(() => {
        //     //all on
        //     this.setPlayerDot(false, 0, true)
        //     this.setPlayerDot(true, 0, true)
        // }, 2000);
        this.setPlayerDot(1, 2, false)

        function testBloodText(time, text) {
            setTimeout(() => {
                setText(_nm_.txt_blood_L, text)
                setText(_nm_.txt_blood_R, text)
            }, time);
        }
        for (let i = 0; i < 11; i++) {
            testBloodText(i * 80, i)
        }

        this.bloodBar_L.setBlood(9)
        this.bloodBar_R.setBlood(8)

        let testFoulBar = (time, p) => {
            setTimeout(() => {
                this.setFoul_L(p)
                this.setFoul_R(p)
                // this.setFoulBar(true, p)
                // this.setFoulBar(false, p)
                this.bloodBar_L.setBloodByDtScore(5)
                this.bloodBar_R.setBloodByDtScore(1)
                // this.setBloodBar(false, p * 15 / 100)
                // this.setBloodBar(true, (p + 1) * 15 / 100)
            }, time);
        }

        for (let i = 0; i < 6; i++) {
            testFoulBar(i * 280, i)
        }
        //test blood bar
        // _c_.emit(ccType.Sprite, { name: 'blood_bar_cursor_L', x: -200 })
    }
    foulToFT: number = 3
    setFoul_L(foul, foulToFT?) {
        if (foulToFT)
            this.foulToFT = foulToFT
        setText(_nm_.txt_foul_L, foul)
        let progress = foul / this.foulToFT
        this.setFoulBar(false, progress)
    }

    setFoul_R(foul, foulToFT?) {
        if (foulToFT)
            this.foulToFT = foulToFT
        setText(_nm_.txt_foul_R, foul)
        // setText('txt_foul_R', foul)
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

    setPlayer(isR, player) {
        cc.log('setPlayer', player)
        let nm1 = isR ? _nm_.txt_player_right : _nm_.txt_player_left;
        setText(nm1, player.name)
        if (player.avatar) {
            let sp = isR ? _nm_.sp_avt_R : _nm_.sp_avt_L;
            loadImg64(sp, player.avatar)
        }
        if (player.blood != null) {
            let bloodBar = isR ? this.bloodBar_R : this.bloodBar_L
            bloodBar.setBlood(player.blood)
        }
        let txt_hw = isR ? 'txt_hw_R' : 'txt_hw_L';
        let hw = player.hwa[0] + 'cm/' + player.hwa[1] + 'kg'
        setText(txt_hw, hw)

        //球员简介

        let txt_info = isR ? 'txt_info_R' : 'txt_info_L';
        let player_info = player.info
        // player_info = '一二三十万六七八九十一二三十万六七八九十一二三十万六七八九十'

        setText(txt_info, player_info)
    }
    initState() {
        getPanelConf('ww3', res => {
            cc.log('get panel conf', res)
            let conf = res.data[0]
            setText(_nm_.txt_team_left, conf['team_L'])
            setText(_nm_.txt_team_right, conf['team_R'])
        })
    }

    initWS() {
        let ws = CC_BUILD ? conf.localWS : 'http://127.0.0.1/rkb';
        io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })
            .on(WSEvent.sc_teamScore, data => {
                cc.log('sc_teamScore', data)
                setText(_nm_.txt_team_score, data.lScore + ' - ' + data.rScore)
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
            .on(WSEvent.sc_setBlood, data => {
                cc.log('sc_setBlood', data)
                if (data.isSetBlood) {
                    let bb = data.isR ? this.bloodBar_R : this.bloodBar_L;
                    let blood = data.isR ? data.rBlood : data.lBlood;
                    bb.setBloodByCurBlood(blood)
                }
                else {
                    let isLeftBloodBar = !data.isLeft//left score right lose blood
                    let bb = isLeftBloodBar ? this.bloodBar_L : this.bloodBar_R;
                    bb.setBloodByDtScore(data.score)
                }
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
            .on(WSEvent.sc_setPlayerDot, data => {
                cc.log('sc_setPlayerDot', data)
                let playerDot_L = data.playerDot_L
                let playerDot_R = data.playerDot_R
                if (data.isOn) {
                    playerDot_L = this.playerDocTotal - playerDot_L
                    playerDot_R = this.playerDocTotal - playerDot_R
                }
                this.setPlayerDot(0, playerDot_L, data.isOn)
                this.setPlayerDot(1, playerDot_R, data.isOn)
                // this.setPlayerDot(data.isR, data.count, false)
            })
            .on(WSEvent.sc_showWW3PlayerInfo, data => {
                showPlayerInfo(data.visible, data.playerArr)
            })
            .on(WSEvent.sc_start_ww3_game, data => {
                this.setFoul_L(0)
                this.setFoul_R(0)
                this.gameTimer.setTimerEvent({ event: TimerEvent.RESET })
            })
    }
}