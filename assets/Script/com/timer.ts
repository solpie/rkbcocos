import { setText } from "../__c";
import { formatSecond } from "./JsFunc";


export const TimerEvent = {
    START: 'start',
    PAUSE: 'pause',
    TOGGLE: 'toggle',
    SHIFT: 'shift',//1s 校准
    RESET: 'reset',
    SETTING: 'setting'
};
export const TimerState = {
    START_STR: 'start',
    PAUSE_STR: 'pause',
    PAUSE: 0,
    RUNNING: 1
};
let timerCallback: any
export class Timer {
    _component: cc.Component
    _textName: string
    timeInSec: number = 60 * 20
    resetTime = 0
    timerState;
    isSecOnly = false
    isMin = false;
    initTimer(component: cc.Component, textName: string) {
        this._component = component
        this._textName = textName
        this.resetTimer()
    }

    onTick() {
        if (this.isMin) {
            this.timeInSec--
        }
        else {
            this.timeInSec++
        }
        if (this.timeInSec < 0)
            this.timeInSec = 0
        setText(this._textName, formatSecond(this.timeInSec))
    }
    startTimer() {
        if (!timerCallback) {
            timerCallback = () => {
                this.onTick()
            }
            this._component.schedule(timerCallback, 1, Infinity)
        }
    }
    pauseTimer() {
        if (timerCallback) {
            this._component.unschedule(timerCallback)
            timerCallback = null
        }
    }

    setTimeBySec(sec) {
        sec=Number(sec)
        if (sec < 0)
            sec = 0
        this.timeInSec = sec;
        setText(this._textName, formatSecond(this.timeInSec, this.isSecOnly))
    }

    resetTimer() {
        this.timerState = TimerState.PAUSE;
        this.setTimeBySec(this.resetTime)
    }

    setTimerEvent(data) {
        if (data.event == TimerEvent.PAUSE) {
            this.pauseTimer()
        } else if (data.event == TimerEvent.START) {
            this.startTimer()
        } else if (data.event == TimerEvent.RESET) {
            this.resetTimer();
            this.pauseTimer()
        } else if (data.event == TimerEvent.SETTING) {
            this.setTimeBySec(data.param);
        }
        else if (data.event == TimerEvent.SHIFT) {
            this.setTimeBySec(this.timeInSec + data.param);
        }
        else if (data.event == TimerEvent.TOGGLE) {
            this.toggleTimer();
        }
    }
    toggleTimer(state?) {
        if (timerCallback) {
            this.pauseTimer()
        }
        else {
            this.startTimer()
        }
    }
}