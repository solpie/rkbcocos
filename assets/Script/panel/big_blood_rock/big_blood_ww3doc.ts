import { setText } from "../../__c";
import { SideBloodView } from "../ww3/side_blood/SideBloodView";
import BigBloodRock from "./big_blood_benxi";
import { loadImg64ByNode } from "../../web";
declare let _c_;

export function on_get_blood_map_doc(doc, rank0: BigBloodRock) {
    let cur_game_idx = doc.cur_game_idx
    let player_name_L = doc.cur_player_name_L
    let player_name_R = doc.cur_player_name_R
    cc.log('cur game idx', cur_game_idx, player_name_L)
    let rec = doc.bloodmap[cur_game_idx]
    if (rec) {
        let team_L = rec.team_L
        let team_R = rec.team_R
        let total_blood_L = 0, total_blood_R = 0
        let row_idx_L = 0, row_idx_R = 0
        let leftPlayer, rightPlayer
        for (let p of team_L) {
            if (p.name == player_name_L) {
                leftPlayer = p
            }
        }
        for (let p of team_R) {
            if (p.name == player_name_R) {
                rightPlayer = p
            }
        }
        // for (let p of team_L) {
        // rank0.setPlayer(0, p)
        // cc.log('on_get_blood_map_doc player L', p)

        rank0.foul_L.string = Number(leftPlayer.foul) + ''

        if (leftPlayer.avatar_half) {
            loadImg64ByNode(rank0.avt_half_L, leftPlayer.avatar_half, true)
        }
        let leftTeam = team_L

        for (let i = 0; i < leftTeam.length; i++) {
            let p = leftTeam[i];
            let pid = p.player_id
            total_blood_L += p.blood
            if (pid == leftPlayer.player_id) {
                this.cur_blood_L.string = p.blood
                this.cur_name_L.string = p.name
                continue;
            }

            let player_row = this.player_row_L[row_idx_L]
            player_row.blood.string = p.blood
            player_row.name.string = p.name
            let blood = p.blood
            if (blood < 0)
                blood = 0
            if (blood > p.init_blood)
                blood = p.init_blood
            // player_row.bar.x = bar_L_init + (1 - blood / p.init_blood) * bar_width
            player_row.player_id = pid
            loadImg64ByNode(player_row.avatar, p.avatar, true)
            row_idx_L++
        }
        // setText('txt_score_L', blood)
        // if (blood < 0)
        //     blood = 0
        // if (blood > leftPlayer.init_blood)
        //     blood = leftPlayer.init_blood
        // rank0.blood_bar_L.y = rank0.BAR_INIT_Y_L - (1 - blood / leftPlayer.init_blood) * rank0.BAR_HEIGHT
        // rank0.setFoul_L( p.foul)
        // }


        let sbv: SideBloodView = _c_['SideBloodView']
        if (sbv) {
            sbv.set_player({ lTeam: team_L, rTeam: team_R })
        }
    }
}