import { SideBloodView } from "./SideBloodView";

const { ccclass, property } = cc._decorator;
declare let _c_;

@ccclass
export default class SideBlood extends cc.Component {

    onLoad() { }

    start() {
        if (!_c_['SideBloodView']) {
            _c_['SideBloodView'] = new SideBloodView()
        }
        let sbv: SideBloodView = _c_['SideBloodView']
        for (let i = 0; i < 5; i++) {
            let sb_name = 'side_blood_' + (i + 1)
            let sb = this.node.getChildByName(sb_name)
            if (sb) {
                sbv.add_side_row(sb_name, sb)
                break;
            }
        }
    }

    // update (dt) {}
}
