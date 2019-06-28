import { getWsUrl } from '../../web';
import { WSEvent } from '../../api';

const { ccclass, property } = cc._decorator;
declare let io;

@ccclass
export default class Bracket16 extends cc.Component {
    start() {

    }
    initWS() {
        let ws = getWsUrl()
        io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })
            .on(WSEvent.sc_bracket, data => {
                cc.log('sc_bracket', data)
                let recArr;
                for (let rec of recArr) {
                    //todo
                }
            })
    }
}
