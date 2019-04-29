import { WSEvent } from '../../api';
import { TimerEvent } from '../../com/timer';
import { opReq } from '../../web';
import Worldwar3 from './worldwar3';
const { ccclass, property } = cc._decorator;
export class BaseGame {
    id: string
    lBlood: number = 0;
    rBlood: number = 0;
    lFoul: number = 0;
    rFoul: number = 0;
    lName: string = "";
    rName: string = "";
    lPlayerId: string = "";
    rPlayerId: string = "";
    curTimeInSec: number = -1//当前时间
    set_dt_lBlood(dtBlood) {
        this.lBlood += dtBlood
        if (this.lBlood < 0)
            this.lBlood = 0
    }

    set_dt_rBlood(dtBlood) {
        this.rBlood += dtBlood
        if (this.rBlood < 0)
            this.rBlood = 0
    }

    set_dt_rFoul(val) {
        this.rFoul += val
        if (this.rFoul < 0)
            this.rFoul = 0
    }

    set_dt_lFoul(val) {
        this.lFoul += val
        if (this.lFoul < 0)
            this.lFoul = 0
    }
}
const ww3Game = new BaseGame();
@ccclass
export default class WW3_OP extends cc.Component {
    _set_time_val: string
    op_start_game() {
        this._emit_start_ww3_game()
    }
    op_sync_game() {
        this._emit_sync_game()
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

    op_set_timer() {
        var reg = /^([0-9]+[\-]?)|([0-9]+[\-]+[0-9])$/;
        if (!reg.test(this._set_time_val)) {
            return
        }
        let a = this._set_time_val.split('-')
        let sec;
        if (a.length == 2) {
            sec = Number(a[0]) * 60 + Number(a[1])
        }
        else if (Number(this._set_time_val) > -1) {
            sec = Number(this._set_time_val)
        }
        opReq(WSEvent.cs_timerEvent, {
            event: TimerEvent.SETTING
            , param: sec
        });
    }

    op_on_set_timer_changed(val) {
        cc.log('op_on_set_timer_changed', val)
        this._set_time_val = val
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
            ww3Game.set_dt_rFoul(dtFoul)
        else
            ww3Game.set_dt_lFoul(dtFoul)

        opReq(WSEvent.cs_setFoul, {
            lFoul: ww3Game.lFoul,
            rFoul: ww3Game.rFoul
        });
    }

    _emit_sync_game() {
        let ww3: Worldwar3 = window['ww3']
        ww3Game.curTimeInSec = ww3.gameTimer.timeInSec
        ww3Game.id = ww3.id
        opReq(WSEvent.cs_sync_game, ww3Game)
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
            rBlood: ww3Game.rBlood
        });
    }
}
