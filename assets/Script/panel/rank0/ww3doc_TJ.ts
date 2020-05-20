import Rank0TJ from "./rank0_TJ";
import { setText } from "../../__c";
import { SideBloodView } from "../ww3/side_blood/SideBloodView";
declare let _c_;

export function on_get_blood_map_doc(doc, rank0: Rank0TJ) {
  let cur_game_idx = doc.cur_game_idx;
  let player_name_L = doc.cur_player_name_L;
  let player_name_R = doc.cur_player_name_R;
  cc.log("cur game idx", cur_game_idx, player_name_L);
  let rec = doc.bloodmap[cur_game_idx];
  if (rec) {
    let team_L = rec.team_L;
    let team_R = rec.team_R;
    for (let p of team_L) {
      if (p.name == player_name_L) {
        rank0.setPlayer(0, p);
        cc.log("on_get_blood_map_doc player L", p);
        let leftPlayer = p;

        let blood = leftPlayer.blood;
        setText("txt_score_L", blood);
        if (blood < 0) blood = 0;
        if (blood > leftPlayer.init_blood) blood = leftPlayer.init_blood;
        rank0.blood_bar_L.y =
          rank0.BAR_INIT_Y_L -
          (1 - blood / leftPlayer.init_blood) * rank0.BAR_HEIGHT;
        rank0.setFoul_L(p.foul);
      }
    }

    for (let p of team_R) {
      if (p.name == player_name_R) {
        rank0.setPlayer(1, p);
        let rightPlayer = p;

        let blood = rightPlayer.blood;
        setText("txt_score_R", blood);
        if (blood < 0) blood = 0;
        if (blood > rightPlayer.init_blood) blood = rightPlayer.init_blood;

        rank0.blood_bar_R.y =
          rank0.BAR_INIT_Y_R -
          (1 - blood / rightPlayer.init_blood) * rank0.BAR_HEIGHT;
        rank0.setFoul_R(p.foul);
      }
    }

    let sbv: SideBloodView = _c_["SideBloodView"];
    if (sbv) {
      sbv.set_player({ lTeam: team_L, rTeam: team_R });
    }
  }
}
