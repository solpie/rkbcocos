import { getWs, loadImg64 } from '../../web';
import { WSEvent } from '../../api';
import { setText } from '../../__c';

const { ccclass } = cc._decorator;
let baseUrl = 'http://rtmp.icassi.us:8092/img/player/0629/'
@ccclass
export default class BigScore extends cc.Component {
    player_id_L = ''
    player_id_R = ''
    start() {
        setText('txt_player_L', '')
        setText('txt_player_R', '')
        this.setScore({ lScore: 0, rScore: 0 })
        this.setFoul({ lFoul: 0, rFoul: 0 })

        getWs()
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })
            .on(WSEvent.sc_setPlayer, data => {
                cc.log('sc_setPlayer', data)
                let leftPlayer = data.leftPlayer
                let rightPlayer = data.rightPlayer
                this.player_id_L = leftPlayer.playerId
                this.player_id_R = rightPlayer.playerId
                setText('txt_player_L', leftPlayer.name)
                setText('txt_player_R', rightPlayer.name)
                loadImg64('avt_L', leftPlayer.avatar)
                loadImg64('avt_R', rightPlayer.avatar)
            })
            .on(WSEvent.sc_setFoul, data => {
                cc.log('sc_setFoul', data)
                this.setFoul(data)
            })
            .on(WSEvent.sc_setBlood, data => {
                cc.log('sc_setBlood', data)
                this.setScore(data)
            })
    }
    setScore(data) {
        setText('txt_score_L', data.lScore)
        setText('txt_score_R', data.rScore)
    }
    setFoul(data) {
        setText('txt_foul_L', data.lFoul)
        setText('txt_foul_R', data.rFoul)
    }
}
