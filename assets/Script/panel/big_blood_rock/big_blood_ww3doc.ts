import { setText } from "../../__c";
import { SideBloodView } from "../ww3/side_blood/SideBloodView";
import BigBloodRock from "./big_blood_benxi";
import { loadImg64ByNode, loadImgOnly, get_loaded_count } from "../../web";
let bar_width = 248;
let bar_L_init = 0;
let bar_R_init = 0;
declare let _c_;
function set_row_player(
  player_arr,
  cur_player,
  is_left,
  bigBloodRock: BigBloodRock
) {
  let player_id_pass = cur_player.player_id;

  let row_idx = 0,
    total_blood = 0;
  for (let i = 0; i < player_arr.length; i++) {
    let p = player_arr[i];
    let pid = p.player_id;
    total_blood += p.blood;
    if (pid == player_id_pass) {
      continue;
    }

    let player_row;
    if (is_left) {
      player_row = bigBloodRock.player_row_L[row_idx];
    } else {
      player_row = bigBloodRock.player_row_R[row_idx];
    }
    player_row.blood.string = p.blood;
    player_row.name.string = p.name;
    let blood = p.blood;
    if (blood < 0) blood = 0;
    if (blood > p.init_blood) blood = p.init_blood;
    player_row.bar.x = bar_L_init - (1 - blood / p.init_blood) * bar_width;
    player_row.player_id = pid;
    loadImg64ByNode(player_row.avatar, p.avatar, true);
    row_idx++;
  }
  if (is_left) {
    bigBloodRock.total_blood_L.string = total_blood + "";
  } else {
    bigBloodRock.total_blood_R.string = total_blood + "";
  }
}
let is_loaded = false;
export function on_blood_map_doc_big_blood(doc, bigBloodRock: BigBloodRock) {
  let cur_game_idx = doc.cur_game_idx;
  let player_name_L = doc.cur_player_name_L;
  let player_name_R = doc.cur_player_name_R;
  cc.log("cur game idx", cur_game_idx, player_name_L);
  let rec = doc.bloodmap[cur_game_idx];
  if (rec) {
    let team_L = rec.team_L;
    let team_R = rec.team_R;
    let timeout_L = rec.timeout_L;
    let timeout_R = rec.timeout_R;
    let leftPlayer, rightPlayer;
    let half_avatar_arr = [];

    for (let p of team_L) {
      if (p.name == player_name_L) {
        leftPlayer = p;
      }
      if (!is_loaded) half_avatar_arr.push(p.avatar_half);
    }
    for (let p of team_R) {
      if (p.name == player_name_R) {
        rightPlayer = p;
      }
      if (!is_loaded) half_avatar_arr.push(p.avatar_half);
    }

    bigBloodRock.cur_blood_L.string = leftPlayer.blood;
    bigBloodRock.cur_name_L.string = leftPlayer.name;

    bigBloodRock.cur_blood_R.string = rightPlayer.blood;
    bigBloodRock.cur_name_R.string = rightPlayer.name;

    bigBloodRock.timeout_L.string = timeout_L + "";
    bigBloodRock.timeout_R.string = timeout_R + "";

    bigBloodRock.foul_L.string = Number(leftPlayer.foul) + "";
    bigBloodRock.foul_R.string = Number(rightPlayer.foul) + "";

    set_row_player(team_L, leftPlayer, true, bigBloodRock);
    set_row_player(team_R, rightPlayer, false, bigBloodRock);

    let sbv: SideBloodView = _c_["SideBloodView"];
    if (sbv) {
      sbv.set_player({ lTeam: team_L, rTeam: team_R });
    }

    if (!is_loaded) {
      for (let url of half_avatar_arr) {
        loadImgOnly(url);
      }
      if (half_avatar_arr.length == get_loaded_count()) {
        is_loaded = true;
        cc.log("on_blood_map_doc_big_blood", "load done!");
      } else return;
    }
    if (leftPlayer.avatar_half) {
      loadImg64ByNode(bigBloodRock.avt_half_L, leftPlayer.avatar_half, true);
    }
    if (rightPlayer.avatar_half) {
      loadImg64ByNode(bigBloodRock.avt_half_R, rightPlayer.avatar_half, true);
    }
  }
}
