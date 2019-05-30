import { WSEvent } from '../../api';
import { getWsUrl, loadImg64 } from '../../web';
import { getNode, setText, ccType } from '../../__c';
import { EVENT_PLAYER_BAR_4V4 } from './BBR_player_bar';
const { ccclass, property } = cc._decorator;
declare let _c_;
declare let io;
declare let axios;
let baseUrl = 'http://rtmp.icassi.us:8092/img/player/0602/'

@ccclass
export default class BigBloodRock extends cc.Component {
    playerMap: any
    eventDoc: any
    leftTeamMap: any
    rightTeamMap: any
    onLoad() {
        cc.log('BigBloodRock on loaded')
        let pUrl = 'http://rtmp.icassi.us:8090/event?idx=0602'
        // axios.get(pUrl)
        //     .then(res => {
        //         if (res.data.length == 1) {
        //             let doc = res.data[0]
        //             // cc.log('event doc', doc)
        //             doc.doc = JSON.parse(doc.doc)
        //             this.eventDoc = doc.doc
        //             this.playerMap = doc.doc.playerMap
        //             for (let pid in this.playerMap) {
        //                 let p = this.playerMap[pid]
        //                 p.avatar = doc.doc.avatar_url + pid + '.png'
        //             }
        //             cc.log('playerMap', this.playerMap)
        //         }
        //     })
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
                cc.log('sc_setPlayer', data)

                let leftPlayer = data.leftPlayer
                let rightPlayer = data.rightPlayer
                leftPlayer.avatar = baseUrl + leftPlayer.playerId + '.png'
                rightPlayer.avatar = baseUrl + rightPlayer.playerId + '.png'
                this.player_id_L = leftPlayer.playerId
                this.player_id_R = rightPlayer.playerId
                setText('txt_player_name_L', leftPlayer.name)
                setText('txt_player_name_R', rightPlayer.name)
                setText('txt_player_blood_L', leftPlayer.blood)
                setText('txt_player_blood_R', rightPlayer.blood)
                loadImg64('avt_L', leftPlayer.avatar)
                loadImg64('avt_R', rightPlayer.avatar)

                let leftTeam = data.leftTeam
                let leftTeamMap = {}
                for (let i = 0; i < leftTeam.length; i++) {
                    let p = leftTeam[i];
                    let pid = p.playerId
                    p.avatar = baseUrl + pid + '.png'
                    leftTeamMap['L' + (i + 1)] = p
                }
                _c_.emit(EVENT_PLAYER_BAR_4V4, leftTeamMap)
                this.leftTeamMap = leftTeamMap
                let rightTeam = data.rightTeam
                let rightTeamMap = {}
                for (let i = 0; i < rightTeam.length; i++) {
                    let p = rightTeam[i];
                    let pid = p.playerId
                    p.avatar = baseUrl + pid + '.png'
                    rightTeamMap['R' + (i + 1)] = p
                }
                this.rightTeamMap = rightTeamMap
                _c_.emit(EVENT_PLAYER_BAR_4V4, rightTeamMap)
            })
            .on(WSEvent.sc_timeOut, data => {
                cc.log('sc_timeOut', data)
                let lTimeOut = Number(data.lTimeOut)
                let rTimeOut = Number(data.rTimeOut)
                getNode('timeout_mask_L1', node => {
                    node.active = lTimeOut < 2
                })
                getNode('timeout_mask_L2', node => {
                    node.active = lTimeOut < 1
                })
                getNode('timeout_mask_R1', node => {
                    node.active = rTimeOut < 2
                })
                getNode('timeout_mask_R2', node => {
                    node.active = rTimeOut < 1
                })
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
                    let lPlayer = this.findPlayerOnBar(p.playerId)
                    if (lPlayer)
                        lPlayer.blood = p.blood
                    if (lPlayer.playerId == this.player_id_L) {
                        setText('txt_player_blood_L', lPlayer.blood)
                    }
                }
                for (let p of data.rTeam) {
                    let rPlayer = this.findPlayerOnBar(p.playerId)
                    if (rPlayer)
                        rPlayer.blood = p.blood
                    if (rPlayer.playerId == this.player_id_R) {
                        setText('txt_player_blood_R', rPlayer.blood)
                    }
                }
                _c_.emit(EVENT_PLAYER_BAR_4V4, this.leftTeamMap)
                _c_.emit(EVENT_PLAYER_BAR_4V4, this.rightTeamMap)
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
