import { WSEvent } from '../../api';
import { getWsUrl } from '../../web';
import GroupListRow from './group_list_row';
const { ccclass, property } = cc._decorator;
declare let io;
declare let _c_;

@ccclass
export default class GroupList extends cc.Component {
    start() {
        this.initWS()
    }
    initWS() {
        let ws = getWsUrl()
        io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })

            .on(WSEvent.sc_group_list, data => {
                cc.log('sc_group_list', data)
                let rec_arr_show = []
                for (let i = 0; i < 4; i++) {
                    let rec = data.rec_arr[data.cursor - 2 + i]
                    rec_arr_show.push(rec)
                    let row: GroupListRow = _c_['node_list']['row_' + (i + 1)]
                    row.setData(rec)
                }
            })

    }
}
