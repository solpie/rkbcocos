export const conf = {
    localWS:'/rkb'
}

export const WSEvent = {
    sc_ww3_team_score: '',
    sc_teamScore:'',
    sc_timerEvent: '',
    cs_timerEvent: '',
    
    sc_setFoul:'',
    cs_setFoul: '',
    
    sc_setBlood:'',
    cs_setBlood:'',
    sc_setPlayer:'',
    sc_setPlayerDot:'',
    sc_showWW3PlayerInfo:'',

    sc_start_ww3_game:'',
    cs_start_ww3_game:'',
}



for (var k in WSEvent) {
    WSEvent[k] = k;
}