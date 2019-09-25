
export const WSEvent = {
    sc_ww3_team_score: '',
    sc_teamScore:'',
    sc_update_basescore:'',
    sc_timerEvent: '',
    cs_timerEvent: '',
    
    sc_setFoul:'',
    cs_setFoul: '',
    
    sc_setBlood:'',
    sc_updateScore:'',
    cs_updateScore:'',
    sc_updateFoul:'',
    sc_set_4v4_icon:'',
    sc_set_4v4_delay:'',
    cs_setBlood:'',
    sc_setPlayer:'',
    sc_timeOut:'',
    sc_manual_blood:'',
    sc_setTeam:'',
    sc_set_player:'',
    sc_setPlayerDot:'',
    sc_showWW3PlayerInfo:'',
    sc_show_side_blood:'',

    sc_start_ww3_game:'',
    cs_start_ww3_game:'',
    
    sc_bracket:'',

    sc_sync_game:'',
    cs_sync_game:'',
    //group list
    sc_rec:'',
    sc_set_delay:'',
}



for (var k in WSEvent) {
    WSEvent[k] = k;
}