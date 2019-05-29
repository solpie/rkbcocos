
export const WSEvent = {
    sc_ww3_team_score: '',
    sc_teamScore:'',
    sc_timerEvent: '',
    cs_timerEvent: '',
    
    sc_setFoul:'',
    cs_setFoul: '',
    
    sc_setBlood:'',
    sc_updateScore:'',
    sc_set_4v4_icon:'',
    cs_setBlood:'',
    sc_setPlayer:'',
    sc_setTeam:'',
    sc_setPlayerDot:'',
    sc_showWW3PlayerInfo:'',

    sc_start_ww3_game:'',
    cs_start_ww3_game:'',

    sc_sync_game:'',
    cs_sync_game:'',
}



for (var k in WSEvent) {
    WSEvent[k] = k;
}