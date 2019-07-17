import { WSEvent } from '../../api';
import { getWsUrl } from '../../web';
import GroupListRow from './group_list_row';
import { setText, ccType, getNode } from '../../__c';
const { ccclass, property } = cc._decorator;
declare let io;
declare let _c_;

@ccclass
export default class GroupList extends cc.Component {
    page_1: cc.Node
    page_2: cc.Node
    page_3: cc.Node
    start() {
        this.initWS()
        setText('txt_winner_' + 1, '')
        setText('txt_winner_' + 2, '')
        setText('txt_winner_' + 3, '')
        setText('txt_winner_' + 4, '')
        setText('txt_winner_' + 7, '')

        getNode('final_group', node => {
            let n:cc.Node = node
            n.active = false
        })
    }
    initWS() {
        let ws = getWsUrl()
        io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })
            .on(WSEvent.sc_rec, data => {
                cc.log('sc_group_list', data)
                let rec_arr_show = []
                getNode('final_group', node => {
                    let n:cc.Node = node
                    n.active = data.is_final
                })
                let rec
                for (let i = 0; i < 15; i++) {
                    rec = data.rec_arr[i]
                    if (!rec)
                        rec = { player: ['', ''] }
                    rec_arr_show.push(rec)
                    let row: GroupListRow = _c_['node_list']['group0_' + (i + 1)]
                    row.setData(rec)
                }
            })
    }
}
