import { InjectCls } from '../../__c';

const { ccclass, property } = cc._decorator;
declare let _c_;
export let EVENT_PLAYER_BAR_4V4 = 'EVENT_PLAYER_BAR_4V4'
@ccclass
export default class PlayerBar4v4 extends InjectCls {
    @property
    idx: string = '';
    onLoad() { }

    start() {
        this.setNodeLabel('txt_player_name','')

        _c_.on(EVENT_PLAYER_BAR_4V4, data => {
            // cc.log('playerBar', data)
            let p = data[this.idx]
            if (p) {
                this.setNodeLabel('txt_player_name', p.name)
                this.setSPbyUrl('avt', p.avatar)
                this.setNodeLabel('txt_player_blood',p.blood||0)
            }
        })
    }

    // update (dt) {}
}
