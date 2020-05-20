import { setText } from "../__c";
import { formatSecond } from "./JsFunc";

export const TimerEvent = {
  START: "start",
  PAUSE: "pause",
  TOGGLE: "toggle",
  SHIFT: "shift", //1s 校准
  RESET: "reset",
  SETTING: "setting",
};
export const TimerState = {
  START_STR: "start",
  PAUSE_STR: "pause",
  PAUSE: 0,
  RUNNING: 1,
};

export class Timer {
  _component: cc.Component;
  _textName: string;
  timeInSec: number = 60 * 20;
  resetTime = 0;
  timerState;
  isSecOnly = false;
  isMin = false;
  _setStringFunc: any;
  timerCallback: any;
  _start_timestamp: number;
  _elasp_sec: number = 0; //逝去时间
  _setting_sec: number = 0; //
  initTimer(component: cc.Component, setStringFunc: any) {
    this._component = component;

    // this._textName = textName
    this._setStringFunc = setStringFunc;
    this.resetTimer();
  }

  onTick() {
    const now = new Date().getTime();
    const delta_sec = Math.floor((now - this._start_timestamp) / 1000);
    if (this.isMin) {
      this.timeInSec = this._setting_sec - delta_sec;
    } else {
      this.timeInSec = delta_sec;
    }
    if (this.timeInSec < 0) this.timeInSec = 0;

    this._setStringFunc(formatSecond(this.timeInSec));
  }
  startTimer() {
    if (!this.timerCallback) {
      this.timerCallback = () => {
        this.onTick();
      };
      this._component.schedule(this.timerCallback, 1, Infinity);
      this._start_timestamp = new Date().getTime() - this._elasp_sec * 1000;
    }
    this.timerState = TimerState.RUNNING;
  }
  pauseTimer() {
    if (this.timerCallback) {
      this._component.unschedule(this.timerCallback);
      this.timerCallback = null;
      if (this.isMin) {
        this._setting_sec = this.timeInSec;
      } else {
        this._elasp_sec = this.timeInSec;
      }
    }
    this.timerState = TimerState.PAUSE;
  }
  get is_PAUSE() {
    return this.timerState === TimerState.PAUSE;
  }
  get is_RUNNING() {
    return this.timerState === TimerState.RUNNING;
  }
  setTimeBySec(sec) {
    sec = Number(sec);
    if (sec < 0) sec = 0;
    this._setting_sec = sec;
    if (this.isMin) {
      this._start_timestamp = new Date().getTime();
    } else {
      this._elasp_sec = sec;
      this._start_timestamp = new Date().getTime() - sec * 1000;
    }
    this.timeInSec = sec;
    this._setStringFunc(formatSecond(this.timeInSec, this.isSecOnly));
  }
  setTimerText(str) {
    this._setStringFunc(str);
  }

  resetTimer() {
    this._elasp_sec = 0;
    this.timerState = TimerState.PAUSE;
    this.setTimeBySec(this.resetTime);
  }

  setTimerEvent(data) {
    if (data.event == TimerEvent.PAUSE) {
      this.pauseTimer();
    } else if (data.event == TimerEvent.START) {
      this.startTimer();
    } else if (data.event == TimerEvent.RESET) {
      this.resetTimer();
      this.pauseTimer();
    } else if (data.event == TimerEvent.SETTING) {
      this.setTimeBySec(data.param);
    } else if (data.event == TimerEvent.SHIFT) {
      this.setTimeBySec(this.timeInSec + data.param);
    } else if (data.event == TimerEvent.TOGGLE) {
      this.toggleTimer();
    }
  }
  toggleTimer(state?) {
    if (this.timerCallback) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }
}
