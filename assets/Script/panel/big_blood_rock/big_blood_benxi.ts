import { WSEvent } from '../../api';
import { getWsUrl, loadImg64, loadImg64ByNode } from '../../web';
import { getNode, setText, ccType } from '../../__c';
import { EVENT_PLAYER_BAR_4V4 } from './BBR_player_bar';
const { ccclass, property } = cc._decorator;
declare let _c_;
declare let io;
// let baseUrl = 'http://rtmp.icassi.us:8092/img/player/0602/'
let bar_width = 248
let bar_L_init = 0
let bar_R_init = 0
@ccclass
export default class BigBloodRock extends cc.Component {
    playerMap: any
    eventDoc: any
    leftTeamMap: any
    rightTeamMap: any
    // timeout_dot_L = []
    // timeout_dot_R = []
    timeout_L: cc.Label
    timeout_R: cc.Label
    total_blood_L: cc.Label
    total_blood_R: cc.Label
    foul_L: cc.Label
    foul_R: cc.Label
    cur_blood_L: cc.Label
    cur_blood_R: cc.Label
    cur_name_L: cc.Label
    cur_name_R: cc.Label

    player_row_L = []
    player_row_R = []
    onLoad() {
        cc.log('Big blood benxi on loaded')
    }
    start() {

        let _Label = (name) => {
            return cc.find(name, this.node).getComponent(cc.Label)
        }
        let _Sp = (name) => {
            return cc.find(name, this.node).getComponent(cc.Sprite)
        }
        this.timeout_L = cc.find('txt_timeout_L', this.node).getComponent(cc.Label)
        this.timeout_R = cc.find('txt_timeout_R', this.node).getComponent(cc.Label)
        this.timeout_L.string = '2'
        this.timeout_R.string = '2'

        this.total_blood_L = _Label('txt_player_blood_L')
        this.total_blood_R = _Label('txt_player_blood_R')

        this.foul_L = _Label('txt_player_foul_L')
        this.foul_R = _Label('txt_player_foul_R')

        this.cur_blood_L = _Label('txt_captain_blood_L')
        this.cur_blood_R = _Label('txt_captain_blood_R')

        this.cur_name_L = _Label('txt_player_name_L')
        this.cur_name_R = _Label('txt_player_name_R')

        // let blood = _Label('player_bar_benxi_R1/txt_player_blood')
        // blood.string = '9'
        for (let i = 0; i < 4; i++) {
            let idx = (i + 1)
            let blood_L = _Label(`player_bar_benxi_L${idx}/txt_player_blood`)
            let blood_R = _Label(`player_bar_benxi_R${idx}/txt_player_blood`)

            let avt_L = _Sp(`player_bar_benxi_L${idx}/avt`)
            let avt_R = _Sp(`player_bar_benxi_R${idx}/avt`)

            let name_L = _Label(`player_bar_benxi_L${idx}/txt_player_name`)
            let name_R = _Label(`player_bar_benxi_R${idx}/txt_player_name`)

            let bar_L: cc.Node = cc.find(`player_bar_benxi_L${idx}/bar_mask/bar`, this.node)
            let bar_R: cc.Node = cc.find(`player_bar_benxi_R${idx}/bar_mask/bar`, this.node)

            this.player_row_L.push({ blood: blood_L, avatar: avt_L, player_id: '', bar: bar_L, name: name_L })
            this.player_row_R.push({ blood: blood_R, avatar: avt_R, player_id: '', bar: bar_R, name: name_R })
            if (bar_L_init < 0) {
                bar_L_init = bar_L.x
                bar_R_init = bar_R.x
            }
            if (!CC_BUILD) {
                blood_L.string = '9'
                blood_R.string = '9'
                bar_L.x = bar_L_init + (1 - 3 / 9) * bar_width
                bar_R.x = bar_R_init + (1 - 3 / 9) * bar_width
            }
        }
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
                this.foul_L.string = '0'
                this.foul_R.string = '0'

                let leftPlayer = data.leftPlayer
                let rightPlayer = data.rightPlayer

                this.player_id_L = leftPlayer.player_id
                this.player_id_R = rightPlayer.player_id

                let leftTeam = data.lTeam
                let leftTeamMap = {}
                let is5v5 = leftTeam.length == 5
                let row_idx_L = 0, row_idx_R = 0
                let captain_player_id_L, captain_player_id_R
                let total_blood_L = 0, total_blood_R = 0
                for (let i = 0; i < leftTeam.length; i++) {
                    let p = leftTeam[i];
                    let pid = p.player_id
                    total_blood_L += p.blood
                    if (is5v5 && pid == leftPlayer.player_id) {
                        this.cur_blood_L.string = p.blood
                        this.cur_name_L.string = p.name
                        continue;
                    }

                    let player_row = this.player_row_L[row_idx_L]
                    player_row.blood.string = p.blood
                    player_row.name.string = p.name
                    let blood = p.blood
                    if (blood < 0)
                        blood = 0
                    if (blood >  p.init_blood)
                        blood =  p.init_blood
                    player_row.bar.x = bar_L_init + (1 - blood / p.init_blood) * bar_width
                    player_row.player_id = pid
                    loadImg64ByNode(player_row.avatar, p.avatar)
                    row_idx_L++
                }
                let rightTeam = data.rTeam
                for (let i = 0; i < rightTeam.length; i++) {
                    let p = rightTeam[i];
                    let pid = p.player_id
                    total_blood_R += p.blood
                    if (is5v5 && pid == rightPlayer.player_id) {
                        this.cur_blood_R.string = p.blood
                        this.cur_name_R.string = p.name
                        continue;
                    }

                    let player_row = this.player_row_R[row_idx_R]
                    player_row.blood.string = p.blood
                    player_row.name.string = p.name
                    let blood = p.blood
                    if (blood < 0)
                        blood = 0
                    if (blood >  p.init_blood)
                        blood =  p.init_blood
                    player_row.bar.x = bar_R_init + (1 - blood / p.init_blood) * bar_width

                    player_row.player_id = pid
                    loadImg64ByNode(player_row.avatar, p.avatar)
                    row_idx_R++
                }
                this.total_blood_L.string = total_blood_L + ''
                this.total_blood_R.string = total_blood_R + ''
            })
            .on(WSEvent.sc_timeOut, data => {
                cc.log('sc_timeOut', data)
                this.set_timeout(data)
            })
            .on(WSEvent.sc_setFoul, data => {
                this.foul_L.string = data.lFoul
                this.foul_R.string = data.rFoul
            })
            .on(WSEvent.sc_manual_blood, data => {
                cc.log('sc_manual_blood', data)
                // setText('txt_player_blood_L', '')
                // setText('txt_player_blood_R', '')
                let total_blood_L = 0, total_blood_R = 0
                for (let p of data.lTeam) {
                    let bar_player = this.findPlayerOnBar(p.player_id)
                    total_blood_L += Number(p.blood)
                    if (bar_player) {
                        bar_player.blood.string = p.blood
                        bar_player.name.string = p.name

                        let blood = p.blood
                        if (blood < 0)
                            blood = 0
                        if (blood >  p.init_blood)
                            blood =  p.init_blood
                        bar_player.bar.x = bar_L_init + (1 - blood / p.init_blood) * bar_width
                    }
                    if (p.player_id == data.vsPlayerArr[0])
                        this.cur_blood_L.string = p.blood
                }
                for (let p of data.rTeam) {
                    total_blood_R += Number(p.blood)
                    let bar_player = this.findPlayerOnBar(p.player_id)
                    if (bar_player) {
                        bar_player.blood.string = p.blood
                        bar_player.name.string = p.name

                        let blood = p.blood
                        if (blood < 0)
                            blood = 0
                        if (blood >  p.init_blood)
                            blood =  p.init_blood
                        bar_player.bar.x = bar_R_init + (1 - blood / p.init_blood) * bar_width
                    }
                    if (p.player_id == data.vsPlayerArr[1])
                        this.cur_blood_R.string = p.blood
                }
                this.total_blood_L.string = total_blood_L + ''
                this.total_blood_R.string = total_blood_R + ''
            })
    }
    set_timeout(data) {
        this.timeout_L.string = data.timeout_L
        this.timeout_R.string = data.timeout_R
    }
    findPlayerOnBar(pid) {
        for (let row of this.player_row_L) {
            if (pid == row.player_id)
                return row
        }
        for (let row of this.player_row_R) {
            if (pid == row.player_id)
                return row
        }
    }
}
