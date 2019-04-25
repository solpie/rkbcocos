import { opReq } from '../../web';
import { WSEvent } from '../../api';
import { TimerEvent } from '../../com/timer';
const { ccclass, property } = cc._decorator;
export class BaseGame {
    lBlood: number = 0;
    rBlood: number = 0;
    lFoul: number = 0;
    rFoul: number = 0;
    lName: string = "";
    rName: string = "";
    lPlayerId: string = "";
    rPlayerId: string = "";

    set_dt_lBlood(dtBlood) {
        this.lBlood += dtBlood
        if (this.lBlood < 0) {
            this.lBlood = 0
        }
    }

    set_dt_rBlood(dtBlood) {
        this.rBlood += dtBlood
        if (this.rBlood < 0) {
            this.rBlood = 0
        }
    }

    set_dt_rFoul(val) {
        this.rFoul += val
        if (this.rFoul < 0) {
            this.rFoul = 0
        }
    }

    set_dt_lFoul(val) {
        this.lFoul += val
        if (this.lFoul < 0) {
            this.lFoul = 0
        }
    }
}
const ww3Game = new BaseGame();
@ccclass
export default class WW3_OP extends cc.Component {
    start() {

    }

    op_start_game() {
        this._emit_start_ww3_game()
    }

    op_foul_min_R() {
        this._emit_foul(true, -1)
    }
    op_foul_min_L() {
        this._emit_foul(false, -1)
    }
    op_foul_add_R() {
        this._emit_foul(true, 1)
    }
    op_foul_add_L() {
        this._emit_foul(false, 1)
    }

    op_blood_min_R() {
        this._emit_blood(true, -1)
    }
    op_blood_min_L() {
        this._emit_blood(false, -1)
    }

    op_blood_add_R() {
        this._emit_blood(true, 1)
    }
    op_blood_add_L() {
        this._emit_blood(false, 1)
    }

    op_start_timer() {
        opReq(WSEvent.cs_timerEvent, {
            event: TimerEvent.START
        });
    }

    op_pause_timer() {
        opReq(WSEvent.cs_timerEvent, {
            event: TimerEvent.PAUSE
        });
    }

    _emit_foul(isR, dtFoul) {
        if (isR)
            ww3Game.rFoul += dtFoul
        else
            ww3Game.lFoul += dtFoul

        opReq(WSEvent.cs_setFoul, {
            lFoul: ww3Game.lFoul,
            rFoul: ww3Game.rFoul
        });
    }

    _emit_start_ww3_game() {
        opReq(WSEvent.cs_start_ww3_game, ww3Game)
    }
    
    _emit_blood(isR, dtBlood) {
        if (isR) {
            ww3Game.set_dt_rBlood(dtBlood)
        }
        else {
            ww3Game.set_dt_lBlood(dtBlood)
        }
        opReq(WSEvent.cs_setBlood, {
            isSetBlood: true,
            isR: isR,
            lBlood: ww3Game.lBlood,
            rBlood: ww3Game.rBlood,
            lPlayer: ww3Game.lPlayerId,
            rPlayer: ww3Game.rPlayerId
        });
    }
}
