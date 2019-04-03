import { WSEvent, conf, testAvt } from '../api';
const { ccclass, property } = cc._decorator;
declare let io;
declare let axios;
const nm = {
    txt_team_score: 'txt_team_score',
    txt_team_left: 'txt_team_left',
    txt_team_right: 'txt_team_right',
    txt_player_left: 'txt_player_left',
    txt_player_right: 'txt_player_right',
    sp_avt_L: 'Canvas/Main Camera/worldwar3/avt_L',
}
function setSp64(sp, img64) {
    let img = new Image()
    img.src = img64
    let tex = new cc.Texture2D()
    tex.initWithElement(img)
    tex.handleLoadedTexture()
    let newframe = new cc.SpriteFrame(tex)
    sp.spriteFrame = newframe
}
window['imgLoader'] = new cc.Node('imgLoader')
declare let imgLoader;
@ccclass
export default class Worldwar3 extends cc.Component {

    // @property
    // text: string = '2-1';

    start() {
        // init logic
        this.setText("txt_team_score", "0 - 0")
        this.setText(nm.txt_player_left, "tade wade balabala")
        this.setText(nm.txt_player_right, "马克")

        console.log('start', this)

        this.initWS()
    }
    onLoad() {
        this.loadAvt()
    }
    loadAvt() {

        console.log('loadAvt', this)

        let img64 = testAvt
        let url = '/proxy?url=http://rtmp.icassi.us:8092/img/player/0323/p1.png'
        setTimeout(() => {
            // imgLoader.emit('img', { name: 'avt_L', img64: img64 })
            axios.get(url)
                .then(function (res) {
                    console.log('axios loaded----', res.data)
                    // let sp1 = cc.find(nm.sp_avt_L).getComponent(cc.Sprite)
                    // setSp64(sp1, res.data)
                    imgLoader.emit('img', { name: 'avt_L', img64: res.data })

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
        if (cc.sys.isNative) {
            window.io = SocketIO;
            console.log('isNative')
        } else {
            console.log("require('socket.io')")
        }
        io(conf.localWS)
            .on('connect', function (msg) {
                console.log('socketio.....localWS')
            })
            .on(WSEvent.sc_teamScore, data => {
                console.log('sc_teamScore', data)
                this.setText(nm.txt_team_score, data.lScore + ' - ' + data.rScore)
            })
    }

    resetTeamScore() {
        this.setText("txt_team_score", "00")
    }
    setText(txtName, text) {
        var c = this.node.getChildByName(txtName);
        if (c) {
            var label = c.getComponent(cc.Label)
            if (label)
                label.string = text
        }
    }
}
