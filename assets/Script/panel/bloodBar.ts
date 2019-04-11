import { ccType, setText } from '../__c';
import { _nm_ } from './worldwar3';
import { confWW3 } from '../com/gameConf';
declare let _c_: cc.Node;

export class BloodBar {
    _isR: number
    _bloodTxt: string
    _bloodCursor: string
    maxBlood: number = confWW3.maxBlood
    constructor(isR) {
        this._isR = isR
        this._bloodTxt = isR ? _nm_.txt_blood_R : _nm_.txt_blood_L;
        this._bloodCursor = isR ? 'blood_bar_cursor_R' : 'blood_bar_cursor_L'
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
        _c_.emit(ccType.Sprite, { name: nm, x: offs })
    }

    // setBloodByDtScore(data) {
    //     let blood;
    //     // let 
    //     // if (data.isLeft) {
    //     //   blood = this.rBlood.setBloodByDtScore(data.score);
    //     // } else {
    //     //   blood = this.lBlood.setBloodByDtScore(data.score);
    //     // }
    //     return blood
    // }
    _tmpBlood = -1;

    setBloodByDtScore(dtScore) {
        let val = this.initBlood - dtScore
        this._setBlood(val);
        if (dtScore > 0) {
            this._tmpBlood = val
            //   TweenEx.delayedCall(1500, _ => {
            //     if (this._tmpBlood == val) {
            //       val = Math.min(val, 6)
            //       TweenEx.to(this.bloodFx, 300, { x: this.bloodFxPos[val] })
            //     }
            //   })
        }
        else {
            //   val = Math.min(val, 6)
            //   this.bloodFx.x = this.bloodFxPos[val]
        }
        return val
    }
}