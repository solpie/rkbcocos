import { setText } from "../../../__c";
import { loadImg64ByNode } from "../../../web";

export class SideBloodView {
    side_row_map = {}
    add_side_row(name, node: cc.Node, idx) {
        this.side_row_map[name] = node
        cc.log('add side row', name)
        this.set_name_L(node, '')
        this.set_name_R(node, '')
        this.set_blood_L(node, 8, 9)
        this.set_blood_R(node, 8, 9)
        node['idx'] = idx
        if (!CC_BUILD) {
            // this.fade_out()

        }
        else {

        }
    }

    show(data) {
        data.visible ? this.fade_in() : this.fade_out()
    }

    fade_out() {
        let _fo = (sb, idx) => {
            setTimeout(_ => {
                var anim = sb.parent.getComponent(cc.Animation);
                anim.play("side_blood_out");
            }, 250 * idx)
        }
        for (let i = 0; i < 5; i++) {
            let sb: cc.Node = this.side_row_map['side_blood_' + (i + 1)]
            if (sb) {
                let idx = sb['idx']
                _fo(sb, idx)
            }
        }
    }

    fade_in() {
        let _fo = (sb, idx) => {
            setTimeout(_ => {
                var anim = sb.parent.getComponent(cc.Animation);
                anim.play("side_blood_in");
            }, 250 * idx)
        }
        for (let i = 0; i < 5; i++) {
            let sb: cc.Node = this.side_row_map['side_blood_' + (i + 1)]
            if (sb) {
                let idx = sb['idx']
                _fo(sb, idx)
            }
        }
    }

    set_avt_L(node, url) {
        let sp: cc.Sprite = node.getChildByName('avt_L').getComponent(cc.Sprite)
        loadImg64ByNode(sp, url, true)
    }
    set_avt_R(node, url) {
        let sp: cc.Sprite = node.getChildByName('avt_R').getComponent(cc.Sprite)
        loadImg64ByNode(sp, url, true)
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
        let bar: cc.Node = node.getChildByName('mask_L').getChildByName('bar')
        if (this.BAR_INIT_X_L < 0)
            this.BAR_INIT_X_L = bar.x
        if (blood < 0)
            blood = 0
        if (blood > initBlood)
            blood = initBlood
        bar.x = this.BAR_INIT_X_L - (1 - blood / initBlood) * 204
    }
    BAR_INIT_X_L = -1
    BAR_INIT_X_R = -1
    set_blood_R(node, blood, initBlood) {
        let label: cc.Label = node.getChildByName('blood_R').getComponent(cc.Label)
        label.string = blood
        let bar: cc.Node = node.getChildByName('mask_R').getChildByName('bar')
        if (this.BAR_INIT_X_R < 0)
            this.BAR_INIT_X_R = bar.x
        if (blood < 0)
            blood = 0
        if (blood > initBlood)
            blood = initBlood
        bar.x = this.BAR_INIT_X_R + (1 - blood / initBlood) * 204
    }
    set_vs_player(data) {
        for (let p of data.lTeam) {
            let sb = this.find_side_blood_by_player_id(p.player_id)
            this.set_blood_L(sb, p.blood, p.init_blood)
        }
        for (let p of data.rTeam) {
            let sb = this.find_side_blood_by_player_id(p.player_id)
            this.set_blood_R(sb, p.blood, p.init_blood)
        }
    }
    find_side_blood_by_player_id(player_id) {
        for (let i = 0; i < 5; i++) {
            let sb: cc.Node = this.side_row_map['side_blood_' + (i + 1)]
            if (sb['player_id_L'] == player_id) {
                return sb
            }
            if (sb['player_id_R'] == player_id) {
                return sb
            }
        }
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
                sb['player_id_L'] = p_L.player_id
                sb['player_id_R'] = p_R.player_id
                this.set_blood_L(sb, p_L.blood, p_L.init_blood)
                this.set_blood_R(sb, p_R.blood, p_R.init_blood)
                this.set_avt_L(sb, p_L.avatar)
                this.set_avt_R(sb, p_R.avatar)
            }
            else {
                sb.active = false
            }
        }
    }
}
