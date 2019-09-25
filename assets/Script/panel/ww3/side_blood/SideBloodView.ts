import { setText } from "../../../__c";
import { loadImg64ByNode } from "../../../web";

export class SideBloodView {
    side_row_map = {}
    add_side_row(name, node) {
        this.side_row_map[name] = node
        cc.log('add side row', name)
        this.set_name_L(node, '')
        this.set_name_R(node, '')
        this.set_blood_L(node, 8, 9)
        this.set_blood_R(node, 8, 9)
        // this.set_avt_L(node, 'http://rtmp.icassi.us:8092/img/player/0602/p1.png')
    }

    set_avt_L(node, url) {
        let sp: cc.Sprite = node.getChildByName('avt_L').getComponent(cc.Sprite)
        loadImg64ByNode(sp, url)
    }
    set_avt_R(node, url) {
        let sp: cc.Sprite = node.getChildByName('avt_R').getComponent(cc.Sprite)
        loadImg64ByNode(sp, url)
    }

    set_name_L(node, name) {
        let label: cc.Label = node.getChildByName('name_L').getComponent(cc.Label)
        label.string = name
    }
    set_name_R(node, name) {
        let label: cc.Label = node.getChildByName('name_R').getComponent(cc.Label)
        label.string = name
    }

    set_blood_L(node, blood, initBlood) {
        let label: cc.Label = node.getChildByName('blood_L').getComponent(cc.Label)
        label.string = blood
        let bar: cc.Node = node.getChildByName('mask').getChildByName('bar_L')
        bar.x = -781 - (1 - blood / initBlood) * 197
    }
    set_blood_R(node, blood, initBlood) {
        let label: cc.Label = node.getChildByName('blood_R').getComponent(cc.Label)
        label.string = blood
        let bar: cc.Node = node.getChildByName('mask').getChildByName('bar_R')
        bar.x = 781 + (1 - blood / initBlood) * 197
    }
    set_player(data) {
        let leftTeam = data.lTeam
        let rightTeam = data.rTeam
        for (let i = 0; i < 5; i++) {
            const p_L = leftTeam[i];
            const p_R = rightTeam[i];
            let sb: cc.Node = this.side_row_map['side_blood_' + (i + 1)]
            if (p_L) {
                sb.active = true
                this.set_name_L(sb, p_L.name)
                this.set_name_R(sb, p_R.name)
                this.set_blood_L(sb,p_L.blood,p_L.init_blood)
                this.set_blood_R(sb,p_R.blood,p_R.init_blood)
                this.set_avt_L(sb,p_L.avatar)
                this.set_avt_R(sb,p_R.avatar)
            }
            else {
                sb.active = false
            }
        }
    }
}
