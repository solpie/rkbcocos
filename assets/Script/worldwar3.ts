import { WSEvent, conf } from './api';
const { ccclass, property } = cc._decorator;
declare let io;
const nm = {
    txt_team_score: 'txt_team_score',
    txt_team_left: 'txt_team_left',
    txt_team_right: 'txt_team_right',
    txt_player_left: 'txt_player_left',
    txt_player_right: 'txt_player_right',
}

@ccclass
export default class Worldwar3 extends cc.Component {

    // @property
    // text: string = '2-1';

    start() {
        // init logic
        this.setText("txt_team_score", "0 - 0")
        this.setText(nm.txt_player_left, "tade wade balabala")
        this.setText(nm.txt_player_right, "马克")


        console.log('start')

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

    setText(txtName, text) {
        var c = this.node.getChildByName(txtName);
        if (c) {
            var label = c.getComponent(cc.Label)
            if (label)
                label.string = text
        }
    }
}
