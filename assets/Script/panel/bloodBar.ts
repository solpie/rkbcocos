import { ccType, setText } from '../__c';
import { _nm_ } from './worldwar3';
import { confWW3 } from '../com/gameConf';
declare let _c_: cc.Node;

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
        this._setBlood(val);
        // val = Math.min(val, 6)
    }
    reset() {
        this.setBlood(confWW3.maxBlood)
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
        // if (!offs)
        //     offs = 1920 - offs
        _c_.emit(ccType.Sprite, { name: nm, x: offs })
        return offs
    }
    _tmpBlood = -1;
    _curBlood = -1;
    _fx_offs = null;
    _fx_cd = 1500;//ms
    _fx_cd_timer = null
    bloodTween(node) {
        // let tw:cc.Tween = new cc.Tween()
        cc.log('play blood fx...', this._fx_offs)
        cc['tween'](node).to(0.3, { x: this._fx_offs }).start()
    }
    setBloodByDtScore(dtScore) {
        let val = this.initBlood - dtScore
        this._curBlood = val
        this._fx_offs = this._setBlood(val);
        if (dtScore > 0) {
            if (this._tmpBlood < 0)
                this._tmpBlood = val
            let delayFx = (offx) => {
                _c_.emit(ccType.Sprite, {
                    name: this._bloodFx, callback: (node) => {
                        this.bloodTween(node)
                    }
                })
            }
            // setTimeout(() => {
            //     if (this._tmpBlood == this._curBlood) {
            //         cc.log('play blood fx...')
            //         if (this._isR)
            //             delayFx(300)
            //     }
            //     else {
            //         cc.log('play blood next tick fx...', this._tmpBlood, this._curBlood)
            //         this._tmpBlood = this._curBlood
            //     }
            // }, 1500);
            if (!this._fx_cd_timer) {
                this._fx_cd = 1500
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
                this._fx_cd = 1300
            }
        }
        else {
            //   val = Math.min(val, 6)
            //   this.bloodFx.x = this.bloodFxPos[val]
        }
        return val
    }
}