import { Timer } from "../../com/timer";
import { setText } from "../../__c";
import { getWsUrl } from "../../web";
import { WSEvent } from "../../api";

const { ccclass, property } = cc._decorator;
export const _nm_ = {//value is the name in creator
    txt_team_score: 'txt_team_score',
    txt_team_left: 'txt_team_left',
    txt_team_right: 'txt_team_right',
    txt_player_L: 'txt_player_L',
    txt_player_R: 'txt_player_R',
    txt_score_L: 'txt_score_L',
    txt_score_R: 'txt_score_R',
    txt_foul_L: 'txt_foul_L',
    txt_foul_R: 'txt_foul_R',
    sp_avt_L: 'avt_L',
    sp_avt_R: 'avt_R',
}
declare let io;

@ccclass
export default class Benxi extends cc.Component {
    gameTimer: Timer = new Timer()

    onLoad() {
        this.gameTimer.initTimer(this, 'txt_timer')
    }

    start() {
        //init game timer
        this.gameTimer.isMin = false
        this.gameTimer.resetTimer()
    }
    set_foul(data) {
        setText(_nm_.txt_foul_L, data.lFoul)
        setText(_nm_.txt_foul_R, data.rFoul)
    }
    set_blood(data) {
        let player_L = data.vsPlayerArr[0]
        let player_R = data.vsPlayerArr[1]
        for (let p of data.lTeam) {
            if (p.player_id == player_L) {
                setText(_nm_.txt_score_L, p.blood)
            }
        }
        for (let p of data.rTeam) {
            if (p.player_id == player_R) {
                setText(_nm_.txt_score_R, p.blood)
            }
        }
    }
    set_player(data) {
        setText(_nm_.txt_player_L, data.player_L)
        setText(_nm_.txt_player_R, data.player_R)
    }
    initWS() {
        let ws = getWsUrl()
        io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })
            .on(WSEvent.sc_setFoul, data => {
                cc.log('sc_setFoul', data)
                this.set_foul(data)
            })
            .on(WSEvent.sc_manual_blood, data => {
                cc.log('sc_manual_blood', data)
                this.set_blood(data)
            })
            .on(WSEvent.sc_setPlayer, data => {
                cc.log('sc_setPlayer', data)
                this.set_player({
                    player_L: data.leftPlayer.name
                    , player_R: data.rightPlayer.name
                })
            })
            .on(WSEvent.sc_timerEvent, data => {
                cc.log('sc_timerEvent', data)
                this.gameTimer.setTimerEvent(data)
            })
    }
}
