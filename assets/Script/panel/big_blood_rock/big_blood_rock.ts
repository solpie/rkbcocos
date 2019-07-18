import { WSEvent } from '../../api';
import { getWsUrl, loadImg64 } from '../../web';
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
    onLoad() {
        cc.log('BigBloodRock on loaded')
    }

    start() {
        getNode('4v4', node => {
            cc.log('4v4 node', node)
        })

        setText('txt_player_name_L', '')
        setText('txt_player_name_R', '')

        this.initWS()
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
                if (data.isRestFoul) {
                    setText('txt_player_foul_L', 0)
                    setText('txt_player_foul_R', 0)
                }
                let leftPlayer = data.leftPlayer
                let rightPlayer = data.rightPlayer
                // leftPlayer.avatar = baseUrl + leftPlayer.playerId + '.png'
                // rightPlayer.avatar = baseUrl + rightPlayer.playerId + '.png'
                this.player_id_L = leftPlayer.player_id
                this.player_id_R = rightPlayer.player_id
                setText('txt_player_name_L', leftPlayer.name)
                setText('txt_player_name_R', rightPlayer.name)
                setText('txt_player_blood_L', leftPlayer.blood)
                setText('txt_player_blood_R', rightPlayer.blood)
                loadImg64('avt_L', leftPlayer.avatar)
                loadImg64('avt_R', rightPlayer.avatar)

                let leftTeam = data.lTeam
                let leftTeamMap = {}
                let is5v5 = leftTeam.length == 5
                let row_idx_L = 0, row_idx_R = 0
                for (let i = 0; i < leftTeam.length; i++) {
                    let p = leftTeam[i];
                    let pid = p.player_id
                    if (is5v5 && pid == leftPlayer.player_id) { continue; }
                    // p.avatar = baseUrl + pid + '.png'
                    leftTeamMap['L' + (row_idx_L + 1)] = p
                    row_idx_L++
                }
                _c_.emit(EVENT_PLAYER_BAR_4V4, leftTeamMap)
                this.leftTeamMap = leftTeamMap
                let rightTeam = data.rTeam
                let rightTeamMap = {}
                for (let i = 0; i < rightTeam.length; i++) {
                    let p = rightTeam[i];
                    let pid = p.player_id
                    if (is5v5 && pid == rightPlayer.player_id) {
                        continue;
                    }
                    // p.avatar = baseUrl + pid + '.png'
                    rightTeamMap['R' + (row_idx_R + 1)] = p
                    row_idx_R++
                }
                this.rightTeamMap = rightTeamMap
                _c_.emit(EVENT_PLAYER_BAR_4V4, rightTeamMap)
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
        let timeout_L = Number(data.timeout_L)
        let timeout_R = Number(data.timeout_R)
        getNode('timeout_mask_L1', node => {
            node.active = timeout_L < 2
        })
        getNode('timeout_mask_L2', node => {
            node.active = timeout_L < 1
        })
        getNode('timeout_mask_R1', node => {
            node.active = timeout_R < 2
        })
        getNode('timeout_mask_R2', node => {
            node.active = timeout_R < 1
        })
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
