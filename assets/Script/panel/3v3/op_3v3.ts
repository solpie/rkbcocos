import { opReq } from '../../web';
import { WSEvent } from '../../api';
import { BaseGame } from '../ww3/ww3_op';
const game3v3 = new BaseGame();
window['game3v3'] = game3v3
const { ccclass } = cc._decorator;
@ccclass
export default class Game3v3Model extends cc.Component {

    addScore(isLeft, dtScore) {
        if (isLeft)
            game3v3.lScore += dtScore
        else
            game3v3.rScore += dtScore
        if (game3v3.lScore < 0)
            game3v3.lScore = 0
        if (game3v3.rScore < 0)
            game3v3.rScore = 0
        opReq(WSEvent.cs_updateScore, game3v3)
    }

    addFoul(isLeft, dtFoul) {
        if (isLeft)
            game3v3.lFoul += dtFoul
        else
            game3v3.rFoul += dtFoul
        if (game3v3.lFoul < 0)
            game3v3.lFoul = 0
        if (game3v3.rFoul < 0)
            game3v3.rFoul = 0
        opReq(WSEvent.cs_setFoul, game3v3)
    }

    op_add_score_L() {
        this.addScore(true, 1)
    }
    op_add_score_R() {
        this.addScore(false, 1)
    }

    op_min_score_L() {
        this.addScore(true, -1)
    }
    op_min_score_R() {
        this.addScore(false, -1)
    }

    op_add_foul_L() {
        this.addFoul(true, 1)
    }
    op_add_foul_R() {
        this.addFoul(false, 1)
    }

    op_min_foul_L() {
        this.addFoul(true, -1)
    }
    op_min_foul_R() {
        this.addFoul(false, -1)
    }
}