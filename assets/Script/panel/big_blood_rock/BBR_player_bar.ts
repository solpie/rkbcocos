import { InjectCls } from '../../__c';

const { ccclass, property } = cc._decorator;
declare let _c_;
export let EVENT_PLAYER_BAR_4V4 = 'EVENT_PLAYER_BAR_4V4'
// const BAR_WIDTH = 395//benxi
const BAR_WIDTH = 359
@ccclass
export default class PlayerBar4v4 extends InjectCls {
    @property
    idx: string = '';
    onLoad() { }
    initBlood = 4;
    bloodBar: cc.Node
    bloodBarInitX = 0
    start() {
        this.setNodeLabel('txt_player_name', '')
        let playerBar = cc.find("bar_mask/black_mask", this.node);
        console.log('4v4_player_bar', playerBar)
        this.bloodBar = playerBar
        // this.bloodBarInitX = this.bloodBar.x//benxi
        this.bloodBar.x = this.bloodBarInitX - (1 - 0 / this.initBlood) * 359
        _c_.on(EVENT_PLAYER_BAR_4V4, data => {
            // cc.log('playerBar', data)
            let p = data[this.idx]
            if (p) {
                if (p.blood < 0)
                    p.blood = 0
                this.bloodBar.x = this.bloodBarInitX - (p.blood / p.init_blood) * BAR_WIDTH
                // this.bloodBar.x = this.bloodBarInitX + (p.blood / p.init_blood) * BAR_WIDTH
                this.setNodeLabel('txt_player_name', p.name)
                this.setSPbyUrl('avt', p.avatar)
                this.setNodeLabel('txt_player_blood', p.blood || 0)
            }
        })
        if (!CC_BUILD) {
            this.test()
        }
    }

    test() {
        _c_.emit(EVENT_PLAYER_BAR_4V4, { 'R1': { blood: 3, init_blood: 9 ,name:'1',avatar:""} })
        _c_.emit(EVENT_PLAYER_BAR_4V4, { 'L1': { blood: 3, init_blood: 9 ,name:'1',avatar:""} })
    }

}
