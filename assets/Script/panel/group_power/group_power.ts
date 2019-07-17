import { getWs } from "../../web";
import { WSEvent } from '../../api';
import { injectCls, IInjectCls } from '../../__c';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GroupPower extends cc.Component {
    gp_list: Array<any>
    start() {
        injectCls(this.node)
        getWs()
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })
            .on(WSEvent.sc_rec, data => {
                for (let i = 0; i < 7; i++) {
                    let rec = data.rec_arr[i]
                    let gp = this.gp_list[i] as IInjectCls
                    gp.setNodeLabel('txt_player_L', rec.lPlayer);
                    gp.setNodeLabel('txt_player_R', rec.rPlayer);
                    let lScore = rec.lScore, rScore = rec.rScore;
                    if (i == 6) {
                        if (lScore != 0 || rScore != 0) {
                            if (lScore > rScore) {
                                this.node['setNodeLabel']('txt_winner_' + (i + 1), rec.lPlayer)
                            }
                            else {
                                this.node['setNodeLabel']('txt_winner_' + (i + 1), rec.rPlayer)
                            }
                        }
                        else {
                            this.node['setNodeLabel']('txt_winner_' + (i + 1), '')
                        }
                    }
                }
            })
        this.gp_list = []
        for (let i = 0; i < 7; i++) {
            let group = this.node.getChildByName('gp_' + (i + 1))
            injectCls(group)
            this.gp_list.push(group)
            // console.log('group', group)
        }
    }
    // update (dt) {}
}
