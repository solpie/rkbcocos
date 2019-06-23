import { Timer } from '../../com/timer';
import { setText, getNode, ccType } from '../../__c';
import { WSEvent } from '../../api';
import { getWsUrl, loadImg64 } from '../../web';
import { BaseGame } from '../ww3/ww3_op';

const { ccclass, property } = cc._decorator;
declare let io;
declare let _c_;
function getGame3v3(): BaseGame {
    return window['game3v3']
}
@ccclass
export default class Game3v3 extends cc.Component {
    id: string//同步的时候区分自己
    gameTimer: Timer = new Timer()


    _node_bg2_4v4: cc.Node
    _node_bg2_1v1: cc.Node

    onLoad() {
        this.id = (new Date()).getTime().toString()
        this.gameTimer.initTimer(this, 'txt_timer')
    }
    isLoadOP = false
    delay: number = 0
    addOp() {
        if (!this.isLoadOP) {
            cc.loader.loadRes("prefab/op_3v3", cc.Prefab, (err, prefab) => {
                var newNode = cc.instantiate(prefab);
                cc.director.getScene().addChild(newNode);
                this.isLoadOP = true
            });
        }
    }
    start() {
        if (!CC_BUILD) {
            this.addOp()
        }

        this.setScore({ lScore: 0, rScore: 0 })
        this.setFoul_L(0)
        this.setFoul_R(0)
        this.gameTimer.resetTimer()

        setText('txt_team_L', '')
        setText('txt_team_R', '')
        this.gameTimer.isMin = true
        this.initWS()
        _c_.emit(ccType.Node, { name: 'bg2_4v4', active: false })

        if (!CC_BUILD) {
            this.test()
        }
    }

    test() {
        let url = 'http://rtmp.icassi.us:8092/img/player/0323/p1.png'
        loadImg64('player_info_avt', url)
    }

    foulToFT: number = 5
    setFoul_L(foul, foulToFT?) {
        let g3 = getGame3v3()
        g3.lFoul = Number(foul)
        setText('txt_foul_L', foul)
    }

    setFoul_R(foul, foulToFT?) {
        let g3 = getGame3v3()
        g3.rFoul = Number(foul)
        setText('txt_foul_R', foul)
    }

    setScore(data) {
        let g3 = getGame3v3()
        g3.lScore = Number(data.lScore)
        g3.rScore = Number(data.rScore)
        setText('txt_score_L', data.lScore)
        setText('txt_score_R', data.rScore)
    }

    set4v4Icon(data) {
        _c_.emit(ccType.Node, { name: 'bg2_4v4', active: data.is4v4 })
        _c_.emit(ccType.Node, { name: 'bg2_1v1', active: !data.is4v4 })
    }

    initWS() {
        let ws = getWsUrl()
        io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
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
            .on(WSEvent.sc_setTeam, data => {
                cc.log('sc_setPlayer', data)
                setText('txt_team_L', data.lPlayer)
                setText('txt_team_R', data.rPlayer)
            })
            .on(WSEvent.sc_updateScore, data => {
                cc.log('sc_updateScore', data)
                if (this.delay > 0&& window['isDelay']) {
                    setTimeout(() => {
                        this.setScore(data)
                    }, this.delay);
                }
                else
                    this.setScore(data)
            })
            .on(WSEvent.sc_updateFoul, data => {
                cc.log('sc_updateFoul', data)

                if (this.delay > 0&& window['isDelay']) {
                    setTimeout(() => {
                        this.setFoul_L(data.lFoul)
                        this.setFoul_R(data.rFoul)
                    }, this.delay);
                }
                else {
                    this.setFoul_L(data.lFoul)
                    this.setFoul_R(data.rFoul)
                }
            })
            .on(WSEvent.sc_set_4v4_icon, data => {
                cc.log('sc_set_4v4_icon', data)
                this.set4v4Icon(data)
            })
            .on(WSEvent.sc_set_4v4_delay, data => {
                cc.log('sc_set_4v4_delay', data)
                if (data.delay >= 0) {
                    this.delay = data.delay*1000
                }
            })

            .on(WSEvent.sc_sync_game, data => {
                cc.log('sc_sync_game', data)
                if (data.id != this.id) {
                    // this.setBaseGame(data)
                }
            })
    }
}
