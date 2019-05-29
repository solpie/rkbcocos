import { InjectCls } from '../../__c';

const { ccclass, property } = cc._decorator;
declare let _c_;
export let EVENT_PLAYER_BAR_4V4 = 'EVENT_PLAYER_BAR_4V4'
@ccclass
export default class PlayerBar4v4 extends InjectCls {
    @property
    idx: string = '';
    onLoad() {
    }

    start() {
        _c_.on(EVENT_PLAYER_BAR_4V4, data => {
            cc.log('playerBar', data)
            let p = data[this.idx]
            if (p) {
                this.setNodeLabel('txt_player_name', p.name)
            }
        })
    }

    // update (dt) {}
}
