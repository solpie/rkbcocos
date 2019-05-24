import { Timer } from '../../com/timer';
import { setText } from '../../__c';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game3v3 extends cc.Component {
    id: string//同步的时候区分自己
    gameTimer: Timer = new Timer()

    onLoad() {
        this.id = (new Date()).getTime().toString()
        this.gameTimer.initTimer(this, 'txt_timer')
    }

    start() {
        setText('txt_foul_red', '')
        setText('txt_foul_blue', '')
        setText('txt_score_red', '')
        setText('txt_score_blue', '')
    }
}
