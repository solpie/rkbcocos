
const { ccclass, property } = cc._decorator;
declare let _c_;
export let EVENT_PLAYER_BAR_4V4 = 'EVENT_PLAYER_BAR_4V4'
@ccclass
export default class PlayerBar4v4 extends cc.Component {
    @property
    idx: string = '';
    onLoad() { }

    start() {
        _c_.on(EVENT_PLAYER_BAR_4V4, data => {
            cc.log('playerBar', data)
            let p = data[this.idx]
            if (p) {
                let pn = this.node.getChildByName('txt_player_name')
                cc.log('txt_player_name', pn)
                let pnLabel = pn.getComponent(cc.Label)
                pnLabel.string = p.name
            }
        })
    }

    // update (dt) {}
}
