import { InjectCls } from '../../__c';

const { ccclass } = cc._decorator;

@ccclass
export default class Bracket16Group extends InjectCls {

    onLoad() {
    }

    start() {
        this.setNodeLabel('txt_team_1_1', '')
        this.setNodeLabel('txt_team_1_2', '')
    }

    // update (dt) {}
}
