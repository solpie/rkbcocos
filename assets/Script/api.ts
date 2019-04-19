export const conf = {
    localWS:'/rkb'
}

export const WSEvent = {
    sc_ww3_team_score: '',
    sc_teamScore:'',
    sc_timerEvent:'',
    sc_setFoul:'',
    sc_setBlood:'',
    sc_setPlayer:'',
    sc_setPlayerDot:'',
    sc_showWW3PlayerInfo:'',
}


for (var k in WSEvent) {
    WSEvent[k] = k;
}