import { getWs, loadImg64 } from '../../web';
import { WSEvent } from '../../api';
import { setText } from '../../__c';
declare let axios;
const { ccclass } = cc._decorator;
@ccclass
export default class BigScore extends cc.Component {
    player_id_L = ''
    player_id_R = ''
    start() {
        setText('txt_player_L', '')
        setText('txt_player_R', '')
        this.setScore({ score_L: 0, score_R: 0 })
        this.setFoul({ foul_L: 0, foul_R: 0 })
        setInterval(_ => {
            this.sync_doc()
        }, 1000)
        // getWs()
        //     .on('connect', _ => {
        //         cc.log('socketio.....localWS')
        //     })
        //     .on(WSEvent.sc_setPlayer, data => {
        //         cc.log('sc_setPlayer', data)
        //         let leftPlayer = data.leftPlayer
        //         let rightPlayer = data.rightPlayer
        //         this.player_id_L = leftPlayer.player_id
        //         this.player_id_R = rightPlayer.player_id
        //         setText('txt_player_L', leftPlayer.name)
        //         setText('txt_player_R', rightPlayer.name)
        //         loadImg64('avt_L', leftPlayer.avatar)
        //         loadImg64('avt_R', rightPlayer.avatar)
        //     })
        //     .on(WSEvent.sc_setFoul, data => {
        //         cc.log('sc_setFoul', data)
        //         this.setFoul(data)
        //     })
        //     .on(WSEvent.sc_setBlood, data => {
        //         cc.log('sc_setBlood', data)
        //         this.setScore(data)
        //     })
    }
    sync_doc() {
        axios.get('http://rtmp.icassi.us:8090/basescore?idx=rank16')
            .then(res => {
                let base_score_doc = res.data[0]
                this.setScore(base_score_doc)
                this.setFoul(base_score_doc)
                setText('txt_player_L', base_score_doc.player_L)
                setText('txt_player_R', base_score_doc.player_R)
                loadImg64('avt_L', base_score_doc.avatar_L)
                loadImg64('avt_R', base_score_doc.avatar_R)
                console.log(base_score_doc)
            })
    }
    setScore(data) {
        setText('txt_score_L', data.score_L)
        setText('txt_score_R', data.score_R)
    }
    setFoul(data) {
        setText('txt_foul_L', data.foul_L)
        setText('txt_foul_R', data.foul_R)
    }
}
