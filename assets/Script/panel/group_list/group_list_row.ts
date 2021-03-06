import { InjectCls } from '../../__c';
const { ccclass, property } = cc._decorator;

@ccclass
export default class GroupListRow extends InjectCls {
    onLoad() {
        this.regist_this_node()
    }

    init_row2() {
        if (this.node.name == 'row2_2' || this.node.name == 'row2_4') {
            let score_L = this.getNode('txt_score_L')
            let score_R = this.getNode('txt_score_R')
            score_L.x =
                score_R.x = -539
        }
    }
    start() {
        this.init_row2()
        this.setData({ lScore: 0, rScore: 0, lPlayer: "", rPlayer: "", gameIdx: -1 })
    }
    setData(data) {
        cc.log('row set data', data)
        let lScore = Number(data.lScore)
        let rScore = Number(data.rScore)
        let idx = ''
        if(data.gameIdx<0)
        {

        }
        else {
            
            idx = String.fromCharCode(Number(data.gameIdx) + 64)
        }
        this.setNodeLabel('txt_idx', idx)
        this.setNodeLabel('txt_score_L', lScore)
        this.setNodeLabel('txt_score_R', rScore)
        let win_L = this.getNode('win_L')
        let win_R = this.getNode('win_R')
        if (win_L)
            if (lScore != 0 || rScore != 0) {
                if (lScore > rScore) {
                    win_L.active = true
                }
                win_R.active = !win_L.active
            }
            else {
                win_L.active = false
                win_R.active = false
            }
        this.setNodeLabel('txt_player_L', data.lPlayer)
        this.setNodeLabel('txt_player_R', data.rPlayer)
    }
}
