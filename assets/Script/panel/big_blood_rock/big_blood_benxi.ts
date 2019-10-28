import { WSEvent } from '../../api';
import { getWsUrl, loadImg64, loadImg64ByNode } from '../../web';
import { getNode, setText, ccType } from '../../__c';
import { EVENT_PLAYER_BAR_4V4 } from './BBR_player_bar';
const { ccclass, property } = cc._decorator;
declare let _c_;
declare let io;
// let baseUrl = 'http://rtmp.icassi.us:8092/img/player/0602/'

@ccclass
export default class BigBloodRock extends cc.Component {
    playerMap: any
    eventDoc: any
    leftTeamMap: any
    rightTeamMap: any
    // timeout_dot_L = []
    // timeout_dot_R = []
    timeout_L:cc.Label
    timeout_R:cc.Label
    total_blood_L:cc.Label
    total_blood_R:cc.Label
    foul_L:cc.Label
    foul_R:cc.Label
    captain_blood_L:cc.Label
    captain_blood_R:cc.Label

    player_row_L = []
    player_row_R = []
    onLoad() {
        cc.log('Big blood benxi on loaded')
    }
    start() {

        let _Label = (name)=>{
            return cc.find(name,this.node).getComponent(cc.Label)
        }
        this.timeout_L = cc.find('txt_timeout_L',this.node).getComponent(cc.Label)
        this.timeout_R = cc.find('txt_timeout_R',this.node).getComponent(cc.Label)
        this.timeout_L.string = '2'
        this.timeout_R.string = '2'

        this.total_blood_L = _Label('txt_player_blood_L')
        this.total_blood_R = _Label('txt_player_blood_R')

        this.foul_L = _Label('txt_player_foul_L')
        this.foul_R = _Label('txt_player_foul_R')

        this.captain_blood_L = _Label('txt_captain_blood_L')
        this.captain_blood_R = _Label('txt_captain_blood_R')

        // let blood = _Label('player_bar_benxi_R1/txt_player_blood')
        // blood.string = '9'
        for (let i = 0; i < 4; i++) {
            let idx = (i+1)
            let blood_L = _Label(`player_bar_benxi_L${idx}/txt_player_blood`)
            let blood_R = _Label(`player_bar_benxi_R${idx}/txt_player_blood`)
            let avt_L = _Label(`player_bar_benxi_L${idx}/avt`)
            let avt_R = _Label(`player_bar_benxi_R${idx}/avt`)
            this.player_row_L.push({blood:blood_L,avatar:avt_L})
            this.player_row_R.push({blood:blood_R,avatar:avt_R})
            if(blood_L)
            {
                blood_L.string = '9'
                blood_R.string = '9'
            }
        }
        // this.initWS()
    }
    player_id_L = ''
    player_id_R = ''
    initWS() {
        let ws = getWsUrl()
        io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })
            .on(WSEvent.sc_setPlayer, data => {
                this.set_timeout(data)
                cc.log('sc_setPlayer', data)
                // if (data.isRestFoul) {
                //     setText('txt_player_foul_L', 0)
                //     setText('txt_player_foul_R', 0)
                // }
                this.foul_L.string = '0'
                this.foul_R.string = '0'

                let leftPlayer = data.leftPlayer
                let rightPlayer = data.rightPlayer

                this.player_id_L = leftPlayer.player_id
                this.player_id_R = rightPlayer.player_id
                // setText('txt_player_name_L', leftPlayer.name)
                // setText('txt_player_name_R', rightPlayer.name)
                // setText('txt_player_blood_L', leftPlayer.blood)
                // setText('txt_player_blood_R', rightPlayer.blood)
                // loadImg64('avt_L', leftPlayer.avatar)
                // loadImg64('avt_R', rightPlayer.avatar)

                let leftTeam = data.lTeam
                let leftTeamMap = {}
                let is5v5 = leftTeam.length == 5
                let row_idx_L = 0, row_idx_R = 0
                let captain_player_id_L,captain_player_id_R
                for (let i = 0; i < leftTeam.length; i++) {
                    let p = leftTeam[i];
                    let pid = p.player_id
                    if (is5v5 && pid == leftPlayer.player_id) { continue; }
                    let player_row = this.player_row_L[i]
                    player_row.blood.string = p.blood
                    loadImg64ByNode(player_row.avatar,p.avatar)
                }
                // _c_.emit(EVENT_PLAYER_BAR_4V4, leftTeamMap)
                // this.leftTeamMap = leftTeamMap
                // let rightTeam = data.rTeam
                // let rightTeamMap = {}
                // for (let i = 0; i < rightTeam.length; i++) {
                //     let p = rightTeam[i];
                //     let pid = p.player_id
                //     if (is5v5 && pid == rightPlayer.player_id) {
                //         continue;
                //     }
                //     // p.avatar = baseUrl + pid + '.png'
                //     rightTeamMap['R' + (row_idx_R + 1)] = p
                //     row_idx_R++
                // }
                // this.rightTeamMap = rightTeamMap
                // _c_.emit(EVENT_PLAYER_BAR_4V4, rightTeamMap)
            })
            .on(WSEvent.sc_timeOut, data => {
                cc.log('sc_timeOut', data)
                this.set_timeout(data)
            })
            .on(WSEvent.sc_setFoul, data => {
                setText('txt_player_foul_L', data.lFoul)
                setText('txt_player_foul_R', data.rFoul)

            })
            .on(WSEvent.sc_manual_blood, data => {
                cc.log('sc_manual_blood', data)
                setText('txt_player_blood_L', '')
                setText('txt_player_blood_R', '')
                for (let p of data.lTeam) {
                    let bar_player = this.findPlayerOnBar(p.player_id)
                    if (bar_player)
                        bar_player.blood = p.blood
                    if (p.player_id == data.vsPlayerArr[0])
                        setText('txt_player_blood_L', p.blood)
                }
                for (let p of data.rTeam) {
                    let bar_player = this.findPlayerOnBar(p.player_id)
                    if (bar_player)
                        bar_player.blood = p.blood
                    if (p.player_id == data.vsPlayerArr[1])
                        setText('txt_player_blood_R', p.blood)
                }
                _c_.emit(EVENT_PLAYER_BAR_4V4, this.leftTeamMap)
                _c_.emit(EVENT_PLAYER_BAR_4V4, this.rightTeamMap)
            })
    }
    set_timeout(data) {
        this.timeout_L.string = data.timeout_L
        this.timeout_R.string = data.timeout_R
    }
    findPlayerOnBar(pid) {
        for (let barIdx in this.leftTeamMap)//pos L1 L2
        {
            let player = this.leftTeamMap[barIdx]
            if (pid == player.playerId) {
                return player
            }
        }
        for (let barIdx in this.rightTeamMap)//pos L1 L2
        {
            let player = this.rightTeamMap[barIdx]
            if (pid == player.playerId) {
                return player
            }
        }
    }
}