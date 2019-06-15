import { WSEvent } from '../../api';
import { getWsUrl } from '../../web';
import GroupListRow from './group_list_row';
import { setText } from '../../__c';
const { ccclass, property } = cc._decorator;
declare let io;
declare let _c_;

@ccclass
export default class GroupList extends cc.Component {
    page_1: cc.Node
    page_2: cc.Node
    page_3: cc.Node
    pageMap = {}
    start() {
        this.initWS()
        setText('txt_winner_' + 1, '')
        setText('txt_winner_' + 2, '')
        setText('txt_winner_' + 3, '')
        setText('txt_winner_' + 4, '')
        setText('txt_winner_' + 7, '')

        this.pageMap['page0'] = this.node.getChildByName('page_0')
        this.pageMap['page1'] = this.node.getChildByName('page_1')
        this.pageMap['page2'] = this.node.getChildByName('page_2')
        this.pageMap['page3'] = this.node.getChildByName('page_3')
        cc.log(this.pageMap)
        this.showOnly('page0')
    }
    showOnly(pageName) {
        for (let k in this.pageMap) {
            let page: cc.Node = this.pageMap[k]
            page.active = k == pageName
        }
    }
    initWS() {
        let ws = getWsUrl()
        io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
            })
            .on(WSEvent.sc_group_list, data => {
                cc.log('sc_group_list', data)
                let page = data.page
                this.showOnly(page)
                if (page == 'page1') {//group matchs
                    let rec_arr_show = []
                    for (let i = 0; i < 4; i++) {
                        let rec = data.rec_arr[data.cursor - 2 + i]
                        rec_arr_show.push(rec)
                        let row: GroupListRow = _c_['node_list']['row_' + (i + 1)]
                        row.setData(rec)
                    }
                }
                else if (page == 'page2') {//8 4
                    let rec_arr_show = []
                    for (let i = 0; i < 4; i++) {
                        let rec = data.rec_arr[i]
                        rec_arr_show.push(rec)
                        let lScore = Number(rec.lScore)
                        let rScore = Number(rec.rScore)
                        if (lScore != 0 || rScore != 0) {
                            if (lScore > rScore) {
                                setText('txt_winner_' + (i + 1), rec.lPlayer)
                            }
                            else {
                                setText('txt_winner_' + (i + 1), rec.rPlayer)
                            }
                        }
                        else {
                            setText('txt_winner_' + (i + 1), '')
                        }

                        let row: GroupListRow = _c_['node_list']['row2_' + (i + 1)]
                        row.setData(rec)
                    }
                }
                else if (page == 'page3') {//final 
                    let rec_arr_show = []
                    for (let i = 4; i < 3 + 4; i++) {
                        let rec = data.rec_arr[i]
                        rec_arr_show.push(rec)
                        let lScore = Number(rec.lScore)
                        let rScore = Number(rec.rScore)
                        if (lScore != 0 || rScore != 0) {
                            if (lScore > rScore) {
                                setText('txt_winner_' + (i + 1), rec.lPlayer)
                            }
                            else {
                                setText('txt_winner_' + (i + 1), rec.rPlayer)
                            }
                        }
                        else {
                            setText('txt_winner_' + (i + 1), '')
                        }
                        let row: GroupListRow = _c_['node_list']['row3_' + (i + 1)]
                        row.setData(rec)
                    }
                }
                else if (page == 'page0') {//final 
                    let rec_arr_show = []
                    for (let i = 0; i < 15; i++) {
                        let rec = data.rec_arr[i]
                        rec_arr_show.push(rec)
                        // let lScore = Number(rec.lScore)
                        // let rScore = Number(rec.rScore)
                        // if (lScore != 0 || rScore != 0) {
                        //     if (lScore > rScore) {
                        //         setText('txt_winner_' + (i + 1), rec.lPlayer)
                        //     }
                        //     else {
                        //         setText('txt_winner_' + (i + 1), rec.rPlayer)
                        //     }
                        // }
                        // else {
                        //     setText('txt_winner_' + (i + 1), '')
                        // }
                        let row: GroupListRow = _c_['node_list']['group0_' + (i + 1)]
                        row.setData(rec)
                    }
                }

            })

    }
}
