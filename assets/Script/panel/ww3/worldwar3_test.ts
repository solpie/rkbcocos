import { showPlayerInfo } from './ww3_fx';
import { setText } from '../../__c';
const { ccclass } = cc._decorator;

@ccclass
export default class WW3Test extends cc.Component {
    on_test_info_L(e) {
        cc.log(e)
        showPlayerInfo(true)
        setText('txt_info_L',e)
    }
    on_test_info_R(e) {
        cc.log(e)
        showPlayerInfo(true)
        setText('txt_info_R',e)
    }
}