import { _nm_ } from './worldwar3';
import { setText, ccType } from '../../__c';
import { confWW3 } from '../../com/gameConf';
declare let _c_: cc.Node;
const BLOOD_FX_CD = 800;//ms

export class BloodBar {
    _isR: number
    _bloodTxt: string
    _bloodCursor: string
    maxBlood: number = confWW3.maxBlood
    _bloodFx: string
    constructor(isR) {
        this._isR = isR
        this._bloodTxt = isR ? _nm_.txt_blood_R : _nm_.txt_blood_L;
        this._bloodCursor = isR ? 'blood_bar_cursor_R' : 'blood_bar_cursor_L'
        this._bloodFx = isR ? 'blood_bar_black_R' : 'blood_bar_black_L';
        let sp: cc.Sprite

    }

    initBlood: number
    setBlood(val) {
        this.initBlood = val;
        let offsx = this._setBlood(val);
        this.bloodNoTween(offsx)
        // val = Math.min(val, 6)
    }
    reset() {
        this.setBlood(confWW3.maxBlood)
    }
    _calcOffs(val) {
        let isR = this._isR
        let flag = isR ? -1 : 1
        let nm = this._bloodCursor
        let max = -495//see left bar curso position in editor
        let min = -100
        let perc = 1 - val / this.maxBlood
        setText(this._bloodTxt, val)
        let offs = (max - (max - min) * perc) * flag
        return offs
    }
    _setBlood(val) {
        let isR = this._isR
        let flag = isR ? -1 : 1
        let nm = this._bloodCursor
        let max = -495//see left bar curso position in editor
        let min = -100
        let perc = 1 - val / this.maxBlood
        setText(this._bloodTxt, val)
        let offs = (max - (max - min) * perc) * flag
        _c_.emit(ccType.Sprite, {
            name: nm, callback: node => {
                cc['tween'](node)
                    .to(0.1, { x: offs })
                    .start()
            }
        })
        // _c_.emit(ccType.Sprite, { name: nm, x: offs })
        return offs
    }
    _tmpBlood = -1;
    _curBlood = -1;
    _fx_offs = null;
    _fx_cd = 1500;//ms
    _fx_cd_timer = null
    bloodTween(node) {
        // let tw:cc.Tween = new cc.Tween()
        // this.testEnd = new Date().getTime();
        cc.log('play blood fx...', this._fx_offs)
        this.cur_fx_offs = this._fx_offs
        cc['tween'](node)
            .to(0.3, { x: this._fx_offs })
            .start()
    }
    bloodNoTween(offsx) {
        _c_.emit(ccType.Sprite, { name: this._bloodFx, x: offsx })

    }
    setBloodByCurBlood(val) {
        let dtScore = this._curBlood - val
        this._curBlood = val
        let offsx = this._setBlood(val);
        let isIncreaseBlood;
        if (this._fx_offs != null) {
            isIncreaseBlood = this._isR ? offsx > this._fx_offs : offsx < this._fx_offs
            if (isIncreaseBlood) {
                cc.log('加血')
            }
        }
        this._fx_offs = offsx

        if (isIncreaseBlood) {
            this.bloodNoTween(offsx)
        }
        else if (dtScore >= 0) {
            if (this._tmpBlood < 0)
                this._tmpBlood = val
            let delayFx = (offx) => {
                _c_.emit(ccType.Sprite, {
                    name: this._bloodFx, callback: (node) => {
                        this.bloodTween(node)
                    }
                })
            }
            if (!this._fx_cd_timer) {
                this._fx_cd = BLOOD_FX_CD
                let timer = new cc.Scheduler()
                // timer.schedule()
                this._fx_cd_timer = setInterval(() => {
                    this._fx_cd -= 10
                    if (this._fx_cd <= 0) {
                        // if (this._isR)
                        delayFx(300)
                        clearInterval(this._fx_cd_timer)
                        this._fx_cd_timer = null
                    }
                }, 10)
            }
            else {
                this._fx_cd = BLOOD_FX_CD
            }
        }
        else {
            //   val = Math.min(val, 6)
            //   this.bloodFx.x = this.bloodFxPos[val]
        }
        return val
    }
    cur_fx_offs: number = -1
    setBloodByDtScore(dtScore) {
        let val = this.initBlood - dtScore
        this._curBlood = val
        let offsx = this._setBlood(val);
        let isIncreaseBlood;
        if (this._fx_offs != null) {
            isIncreaseBlood = this._isR ? offsx > this._fx_offs : offsx < this._fx_offs
            if (isIncreaseBlood) {
                cc.log('加血')
            }
        }
        this._fx_offs = offsx

        if (isIncreaseBlood) {
            this.bloodNoTween(offsx)
        }
        else if (dtScore >= 0) {
            if (this._tmpBlood < 0)
                this._tmpBlood = val
            let delayFx = (offx) => {
                _c_.emit(ccType.Sprite, {
                    name: this._bloodFx, callback: (node) => {
                        this.bloodTween(node)
                    }
                })
            }
            if (!this._fx_cd_timer) {
                this._fx_cd = BLOOD_FX_CD
                let timer = new cc.Scheduler()
                // timer.schedule()
                this._fx_cd_timer = setInterval(() => {
                    this._fx_cd -= 10
                    if (this._fx_cd <= 0) {
                        // if (this._isR)
                        delayFx(300)
                        clearInterval(this._fx_cd_timer)
                        this._fx_cd_timer = null
                    }
                }, 10)
            }
            else {
                this._fx_cd = BLOOD_FX_CD
            }
        }
        else {
            //   val = Math.min(val, 6)
            //   this.bloodFx.x = this.bloodFxPos[val]
        }
        return val
    }
}