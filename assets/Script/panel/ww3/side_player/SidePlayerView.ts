import { get_champion_rank_rec, get_player, loadImg64ByNode, getWsUrl } from "../../../web";
import { WSEvent } from "../../../api";

const { ccclass, property } = cc._decorator;
declare let io;
@ccclass
export default class SidePlayerView extends cc.Component {

    row_arr: Array<cc.Node> = []
    player_label_arr_L: Array<cc.Label> = []
    player_label_arr_R: Array<cc.Label> = []
    player_label_arr: Array<cc.Label> = []
    avt_sprite_arr: Array<cc.Sprite> = []
    url_base = ''
    player_id_arr = []
    onLoad() { }
    fade_in() {
        let _fo = (sb, idx) => {
            setTimeout(_ => {
                var anim = sb.getComponent(cc.Animation);
                anim.play("side_player_in");
            }, 250 * idx)
        }
        for (let i = 0; i < 8; i++) {
            let sb: cc.Node = this.row_arr[i]
            if (sb) {
                _fo(sb, i)
            }
        }
    }
    fade_out() {
        let _fo = (sb, idx) => {
            setTimeout(_ => {
                var anim = sb.getComponent(cc.Animation);
                anim.play("side_player_out");
            }, 250 * idx)
        }
        for (let i = 0; i < 8; i++) {
            let sb: cc.Node = this.row_arr[i]
            if (sb) {
                _fo(sb, i)
            }
        }
    }
    start() {
        let avt_arr_L = []
        let avt_arr_R = []

        for (let i = 0; i < 8; i++) {
            let anim_name = 'anim_' + (i + 1)
            let node_name = 'side_player_' + (i + 1)
            let anim: cc.Node = this.node.getChildByName(anim_name)
            this.row_arr.push(anim)
            let r: cc.Node = anim.getChildByName(node_name)

            let label_L = r.getChildByName('name_L').getComponent(cc.Label)
            this.player_label_arr_L.push(label_L)
            let label_R = r.getChildByName('name_R').getComponent(cc.Label)
            this.player_label_arr_R.push(label_R)

            avt_arr_L.push(r.getChildByName('avt_L').getComponent(cc.Sprite))
            avt_arr_R.push(r.getChildByName('avt_R').getComponent(cc.Sprite))
            cc.log('side_player_', r)
        }
        this.avt_sprite_arr = avt_arr_L.concat(avt_arr_R)
        this.player_label_arr = this.player_label_arr_L.concat(this.player_label_arr_R)
        get_champion_rank_rec(data => {
            cc.log('get_champion_rank_rec', data)
            let rec_map = data[0].doc.rec
            for (let i = 0; i < 8; i++) {
                let rec = rec_map[i + 1]
                this.player_label_arr[i * 2].string = rec.name[0]
                this.player_label_arr[i * 2 + 1].string = rec.name[1]
                this.player_id_arr.push(rec.player[0])
                this.player_id_arr.push(rec.player[1])

            }
            for (let i = 0; i < this.player_id_arr.length; i++) {
                let player_id = this.player_id_arr[i];
                this.load_avt(this.avt_sprite_arr[i], player_id)
    
            }
        })
        // if (this.url_base == '') {
        //     get_player('p1', data => {
        //         this.url_base = data[0].avatar.split('p1')[0]
        //         for (let i = 0; i < this.player_id_arr.length; i++) {
        //             let player_id = this.player_id_arr[i]
        //             loadImg64ByNode(this.avt_sprite_arr[i], this.url_base + player_id + '.png')
        //         }
        //     })
        // }
        
        this.initWS()
        if (!CC_BUILD) {
            this.fade_in()
        }

    }
    load_avt(sp, player_id) {
        get_player(player_id, data => {
            let url = data[0].avatar
            cc.log('load avt', url)
            // loadImg64ByNode(sp, data[0].avatar)
        })
    }
    initWS() {
        let ws = getWsUrl()
        io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })
            .on(WSEvent.sc_show_side_player, data => {
                if (data.visible) {
                    this.fade_in()
                }
                else {
                    this.fade_out()
                }
            })

    }

    // update (dt) {}
}
