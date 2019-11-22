import { getWsUrl, auto_doc } from '../../web';
import { WSEvent } from '../../api';

const { ccclass, property } = cc._decorator;
declare let io;

@ccclass
export default class Bracket16 extends cc.Component {
    label_map = {}
    start() {
        for (let i = 0; i < 15; i++) {
            let group_node: cc.Node = cc.find('group_' + (i + 1), this.node)
            if (group_node) {
                let p1:cc.Label = cc.find('txt_team_1_1',group_node).getComponent(cc.Label)
                this.label_map['p_'+(i+1)+'_1'] = p1
                let p2:cc.Label = cc.find('txt_team_1_2',group_node).getComponent(cc.Label)
                this.label_map['p_'+(i+1)+'_2'] = p2
                p1.string = p2.string = ''
            }
        }

        auto_doc('http://rtmp.icassi.us:8090/basebracket/?idx=rank16', res => {
            if (res && res.length == 1) {
                let doc = res[0]
                // cc.log(this.label_map,doc)
                for(let k in this.label_map)
                {
                    let label:cc.Label = this.label_map[k]
                    if(doc[k])
                    {
                        label.string = doc[k]
                    }
                }
            }
        })
    }
}
