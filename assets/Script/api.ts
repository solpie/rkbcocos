export const conf = {
    localWS:'/rkb'
}

export const WSEvent = {
    sc_ww3_team_score: '',
    sc_teamScore:'',
    sc_timerEvent:'',
    sc_setFoul:'',
}


for (var k in WSEvent) {
    WSEvent[k] = k;
}