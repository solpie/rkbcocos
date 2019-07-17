import { InjectCls } from '../../__c';
const { ccclass, property } = cc._decorator;

@ccclass
export default class GroupListGroup0 extends InjectCls {
    onLoad() {
        this.regist_this_node()
    }
    start() {
        this.setData({
            lScore: 0, rScore: 0,
            player:["",""],
           gameIdx: -1
        })
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
            // idx = String.fromCharCode(Number(data.gameIdx) + 64)
        }
        // this.setNodeLabel('txt_idx', idx)
        // this.setNodeLabel('txt_score_L', lScore)
        // this.setNodeLabel('txt_score_R', rScore)
        // let win_L = this.getNode('win_L')
        // let win_R = this.getNode('win_R')
        // if (win_L)
        //     if (lScore != 0 || rScore != 0) {
        //         if (lScore > rScore) {
        //             win_L.active = true
        //         }
        //         win_R.active = !win_L.active
        //     }
        //     else {
        //         win_L.active = false
        //         win_R.active = false
        //     }
        this.setNodeLabel('txt_player_L', data.player[0])
        this.setNodeLabel('txt_player_R', data.player[1])
    }
}
