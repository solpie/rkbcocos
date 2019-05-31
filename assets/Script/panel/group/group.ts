import { InjectCls } from '../../__c';
import { getWsUrl } from '../../web';

const { ccclass, property } = cc._decorator;
declare let _c_;
declare let io;
@ccclass
export default class Big_group_rock extends InjectCls {

    @property(cc.Node)
    row1: cc.Node = null;
    @property(cc.Node)
    row2: cc.Node = null;
    @property(cc.Node)
    row3: cc.Node = null;
    @property(cc.Node)
    row4: cc.Node = null;
    row_arr: any
    rank_pos: any
    start() {
        //txt_win_count
        // this.setRowNodeLabel(this.row1, 'txt_win_count', '1')
        this.rank_pos = {}
        this.row_arr = [this.row1, this.row2, this.row3, this.row4]
        this.rank_pos['1'] = this.row1.y
        this.rank_pos['2'] = this.row2.y
        this.rank_pos['3'] = this.row3.y
        this.rank_pos['4'] = this.row4.y

        this.row1['idx'] = 1
        this.row2['idx'] = 2
        this.row3['idx'] = 3
        this.row4['idx'] = 4
        this.initWS()
    }

    setRowNodeLabel(node, nodeName, text) {
        let pn = node.getChildByName(nodeName)
        if (pn) {
            let pnLabel = pn.getComponent(cc.Label)
            pnLabel.string = text
        }
    }

    getTeamName(row) {
        let pn = row.getChildByName('txt_player_name_L')
        if (pn) {
            let pnLabel = pn.getComponent(cc.Label)
            return pnLabel.string
        }
        return ''

    }
    initWS() {
        let ws = getWsUrl()
        io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })
            .on('sc_game4v4rec', data => {
                cc.log('sc_game4v4rec', data)
                for (let team of data.game4v4rec) {
                    for (let row of this.row_arr) {
                        if (this.getTeamName(row) == team.name) {

                            this.setRowNodeLabel(row, 'txt_win_count', team.win)
                            this.setRowNodeLabel(row, 'txt_lose_count', team.lose)
                            this.setRowNodeLabel(row, 'txt_score', team.score)
                            this.setRowNodeLabel(row, 'txt_total_score', team.total_score)
                            if (Number(team.rank) != -1) {
                                row.y = this.rank_pos[team.rank]
                            }
                        }
                    }
                }
            })

    }
    // update (dt) {}
}
