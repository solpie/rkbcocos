import { getNode } from '../../__c';
import { getWsUrl } from '../../web';
import { WSEvent } from '../../api';
import { EVENT_PLAYER_BAR_4V4 } from './player_bar';
const { ccclass, property } = cc._decorator;
declare let _c_;
declare let io;

@ccclass
export default class BigBloodRock extends cc.Component {

    onLoad() {
        cc.log('BigBloodRock on loaded')
    }

    start() {
        getNode('4v4', node => {
            cc.log('4v4 node', node)
        })


        this.initWS()
    }
    initWS() {
        let ws = getWsUrl()
        io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })
            .on(WSEvent.sc_setPlayer, data => {
                cc.log('sc_setPlayer', data)
                let leftTeam = data.leftTeam
                let leftTeamMap = {}
                for (let i = 0; i < leftTeam.length; i++) {
                    let p = leftTeam[i];
                    leftTeamMap['L' + (i + 1)] = p
                }
                _c_.emit(EVENT_PLAYER_BAR_4V4, leftTeamMap)

                let rightTeam = data.rightTeam
                let rightTeamMap = {}
                for (let i = 0; i < rightTeam.length; i++) {
                    let p = rightTeam[i];
                    rightTeamMap['R' + (i + 1)] = p
                }
                _c_.emit(EVENT_PLAYER_BAR_4V4, rightTeamMap)
            })

    }
}
