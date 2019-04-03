import { conf, testAvt, WSEvent } from '../api';
import { setText } from '../__c';
import { ccType } from './../__c';
const { ccclass } = cc._decorator;
declare let io;
declare let axios;
const nm = {
    txt_team_score: 'txt_team_score',
    txt_team_left: 'txt_team_left',
    txt_team_right: 'txt_team_right',
    txt_player_left: 'txt_player_left',
    txt_player_right: 'txt_player_right',
    sp_avt_L: 'avt_L',
}
window['_c_'] = new cc.Node('_c_')
declare let _c_;
@ccclass
export default class Worldwar3 extends cc.Component {
    onLoad() {
        console.log('onLoad', cc.debug.DebugMode)
    }

    start() {
        // init logic
        console.log('start', this)
        this.initWS()
        this.test()
    }
    test() {
        let img64 = testAvt
        setText(nm.txt_player_left, 'Tade wade')
        _c_.emit(ccType.Sprite, { name: nm.sp_avt_L, img64: img64 })
        this.loadAvt()
    }

    loadAvt() {
        let url = '/proxy?url=http://rtmp.icassi.us:8092/img/player/0323/p1.png'
        setTimeout(() => {
            // imgLoader.emit('img', { name: 'avt_L', img64: img64 })
            axios.get(url)
                .then(function (res) {
                    console.log('axios loaded----', res.data)
                    // let sp1 = cc.find(nm.sp_avt_L).getComponent(cc.Sprite)
                    // setSp64(sp1, res.data)
                    _c_.emit(ccType.Sprite, { name: nm.sp_avt_L, img64: res.data })

                })
        }, 2000);


        // axios.get(url)
        //     .then(function (res) {
        //         console.log('axios loaded----', res.data)
        //         // let sp1 = cc.find(nm.sp_avt_L).getComponent(cc.Sprite)
        //         // setSp64(sp1, res.data)
        //         imgLoader.emit('img', { name: 'avt_L', img64:  res.data })

        //     })
        // cc.loader.load(url, (type, res) => {
        //     console.log('loaded----', type, res)
        // });
    }
    initWS() {
        io(conf.localWS)
            .on('connect', function (msg) {
                console.log('socketio.....localWS')
            })
            .on(WSEvent.sc_teamScore, data => {
                console.log('sc_teamScore', data)
                setText(nm.txt_team_score, data.lScore + ' - ' + data.rScore)
            })
    }

}
