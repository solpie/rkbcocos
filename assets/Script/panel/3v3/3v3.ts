import { Timer } from '../../com/timer';
import { setText, getNode, ccType } from '../../__c';
import { WSEvent } from '../../api';
import { getWsUrl, loadImg64, get_basescore_com } from '../../web';
import { BaseGame } from '../ww3/ww3_op';

const { ccclass, property } = cc._decorator;
declare let io;
declare let _c_;
declare let axios;
function getGame3v3(): BaseGame {
    return window['game3v3']
}

export function get_now_sec_1970() {
    return Math.floor((new Date()).getTime() / 1000)
}
@ccclass
export default class Game3v3 extends cc.Component {
    id: string//同步的时候区分自己
    gameTimer: Timer = new Timer()


    _node_bg2_4v4: cc.Node
    _node_bg2_1v1: cc.Node

    dot_1: cc.Sprite
    dot_2: cc.Sprite
    dot_3: cc.Sprite
    dot_tex = {}

    col_map = { '1': cc.color(1, 159, 247), '2': cc.color(2, 205, 128), '3': cc.color(174, 102, 241) }

    team_name_L: cc.Node
    team_name_R: cc.Node

    delay_cache = []
    is_init = false

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
        if (window['no_timer']) {
            cc.find('txt_timer', this.node).opacity = 0
        }
        this.setScore({ lScore: 0, rScore: 0 })
        this.setFoul_L(0)
        this.setFoul_R(0)
        this.gameTimer.resetTimer()

        setText('txt_team_L', '')
        setText('txt_team_R', '')

        this.dot_1 = cc.find('dot_1', this.node).getComponent(cc.Sprite)
        this.dot_2 = cc.find('dot_2', this.node).getComponent(cc.Sprite)
        this.dot_3 = cc.find('dot_3', this.node).getComponent(cc.Sprite)

        this.team_name_L = cc.find('txt_team_L', this.node)//.getComponent(cc.Label)
        this.team_name_R = cc.find('txt_team_R', this.node)//.getComponent(cc.Label)

        this.dot_tex['dot_1'] = this.dot_1.spriteFrame
        this.dot_tex['dot_2'] = this.dot_2.spriteFrame
        this.dot_tex['dot_3'] = this.dot_3.spriteFrame

        this.team_name_L.color = this.col_map['1']
        this.team_name_R.color = this.col_map['2']

        this.gameTimer.isMin = true
        // this.initWS()
        _c_.emit(ccType.Node, { name: 'bg2_4v4', active: false })

        if (!CC_BUILD) {
            this.test()
        }
        // this.set4v4Icon({ is4v4: true })
        this.auto_basescore()
    }



    auto_basescore() {
        get_basescore_com(data => {
            setTimeout(_ => {
                this.auto_basescore()
            }, 1000)

            cc.log(data)
            if (data.length) {
                let doc = data[0]
                if (Number(doc.delay) > 0) {

                    if (this.is_init) {
                        this.delay_cache.push({ timestamp: doc.timestamp, doc: doc })
                        let now = get_now_sec_1970()
                        let a = []
                        for (let i = 0; i < this.delay_cache.length; i++) {
                            let item = this.delay_cache[i]
                            let timestamp = item.timestamp
                            if (now - Number(doc.delay) > timestamp) {
                                this.set_basescore(item.doc)
                            }
                            else {
                                a.push(item)
                            }
                        }
                        this.delay_cache = a
                    }
                    else {
                        this.is_init = true
                        this.set_basescore(doc)
                    }
                }
                else
                    this.set_basescore(doc)
                // this.setFoul_L(doc.foul_L)
                // this.setFoul_R(doc.foul_R)
                // this.set_score(doc)
                // if (doc.auto_timer_url != this.auto_timer_url) {
                //     this.auto_timer_url = doc.auto_timer_url
                //     let url = 'http://192.168.1.196:8090/results.xml'
                //     get_auto_timer(this.auto_timer_url, doc => {
                //         let text = doc.children[0].getElementsByTagName('text')[0].textContent
                //         if (text) {
                //             setText('txt_timer', text)
                //         }
                //     })
                // }

            }
        })
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

    timestamp: string
    set_basescore(param) {
        // axios.get(param.url)
        //     .then((res) => {
        // setTimeout(_ => {
        //     this.get_basescore2()
        // }, 1000)

        let doc = param
        this.setScore({ lScore: doc.score_L, rScore: doc.score_R })
        this.setFoul_L(doc.foul_L)
        this.setFoul_R(doc.foul_R)
        this.set_player(doc)

        if (doc.rec != '') {
            let a = doc.rec.split('_')
            if (a.length == 2) {
                this.dot_1.spriteFrame = this.dot_tex['dot_' + a[0]]
                this.dot_2.spriteFrame = this.dot_tex['dot_' + a[1]]

                this.team_name_L.color = this.col_map[a[0]]
                this.team_name_R.color = this.col_map[a[1]]

            }
        }

        let timer_state: string = doc.timer_state
        if (timer_state.search('start') > -1) {
            this.gameTimer.startTimer()
        }
        else if (timer_state.search('pause') > -1) {
            this.gameTimer.pauseTimer()
        }
        else if (timer_state.search('setting') > -1) {
            let timestamp = timer_state.replace('setting', '')
            if (this.timestamp != timestamp) {
                this.timestamp = timestamp
                this.gameTimer.setTimeBySec(doc.timer_param)
            }
        }
        // basescore: {
        //     player_L: 0,
        //     player_R: 0,
        //     score_L: 0,
        //     score_R: 0,
        //     foul_L: 0,
        //     foul_R: 0
        // }
        // })
    }

    set_player(data) {
        setText('txt_team_L', data.player_L)
        setText('txt_team_R', data.player_R)
    }

    initWS() {
        let ws = getWsUrl()
        io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })
            .on(WSEvent.sc_update_basescore, data => {
                cc.log('sc_update_basescore', data)
                this.set_basescore(data)
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
            .on(WSEvent.sc_set_player, data => {
                cc.log('sc_setPlayer', data)
                this.set_player(data)
            })
            .on(WSEvent.sc_updateScore, data => {
                cc.log('sc_updateScore', data)
                if (this.delay > 0 && window['isDelay']) {
                    setTimeout(() => {
                        this.setScore(data)
                    }, this.delay);
                }
                else
                    this.setScore(data)
            })
            .on(WSEvent.sc_updateFoul, data => {
                cc.log('sc_updateFoul', data)
                if (this.delay > 0 && window['isDelay']) {//main.js
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
            .on(WSEvent.sc_set_delay, data => {
                cc.log('sc_set_delay', data)
                if (data.delay >= 0) {
                    this.delay = data.delay * 1000
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
