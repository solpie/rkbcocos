import { InjectCls } from '../../__c';
const { ccclass, property } = cc._decorator;

@ccclass
export default class GroupListRow extends InjectCls {
    onLoad() {
        this.regist_this_node()
    }
    start() {
        this.setData({ lScore: 0, rScore: 0, lPlayer: "", rPlayer: "" ,gameIdx:0})
    }
    setData(data) {
        cc.log('row set data',data)
        let lScore = Number(data.lScore)
        let rScore = Number(data.rScore)
        this.setNodeLabel('txt_idx', data.gameIdx)
        this.setNodeLabel('txt_score_L', lScore)
        this.setNodeLabel('txt_score_R', rScore)
        let win_L = this.getNode('win_L')
        let win_R = this.getNode('win_R')

        if (lScore != 0 || rScore != 0) {
            if(lScore>rScore)
            {
                win_L.active  = true
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
