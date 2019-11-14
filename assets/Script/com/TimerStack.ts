import { get_now_sec_1970 } from "./JsFunc";

export class TimerStack {
    _timer_stack
    constructor() {
        this._timer_stack = []
    }

    set_stack(doc) {
        let arr = JSON.parse(doc)
        if (arr && arr.length)
            this._timer_stack = arr
    }

    get_stack() {
        return JSON.stringify(this._timer_stack)
    }

    setting(sec) {
        this._timer_stack = []
        this._timer_stack.push({ event: 'setting', param: Number(sec), timestamp: get_now_sec_1970() })
    }

    start() {
        if (this._last_event('pause') || this._last_event('setting'))
            this._timer_stack.push({ event: 'start', param: '', timestamp: get_now_sec_1970() })
    }

    _last_event(event) {
        if (this._timer_stack.length) {
            return this._timer_stack[this._timer_stack.length - 1].event == event
        }
        return false
    }
    pause() {
        if (this._last_event('start'))
            this._timer_stack.push({ event: 'pause', param: '', timestamp: get_now_sec_1970() })
    }
    last_time_sec = -1
    elapsed_patch = 0
    last_pause_timestamp = -1
    get_time_sec(delay = 0, is_cache = false) {
        let now = get_now_sec_1970()
        let pause_timestamp = now - delay
        let total_sec = 0
        let elapsed_sec = 0
        let last_event = ''
        let last_start = null
        let last_pause_timestamp = 0
        for (let i = this._timer_stack.length - 1; i >= 0; i--) {
            let item = this._timer_stack[i]
            if (!last_event) {
                last_event = item.event
                if (last_event == 'pause')
                    last_pause_timestamp = item.timestamp
            }
            if (item.event == 'start') {
                elapsed_sec += pause_timestamp - (item.timestamp)
            }
            if (item.event == 'pause') {
                pause_timestamp = item.timestamp
            }
            if (item.event == 'setting') {
                total_sec = item.param
            }
        }
        let left_sec = total_sec - elapsed_sec

        if (last_event == 'pause' && is_cache) {
            if (now - last_pause_timestamp <= delay) {
                left_sec -= (now - last_pause_timestamp - delay)
                cc.log('last pause', now - last_pause_timestamp)
            }
        }


        if (this.last_time_sec > 0 && left_sec > this.last_time_sec) {
            left_sec = this.last_time_sec
        }

        if (left_sec < 0) {
            left_sec = 0
        }
        
        this.last_time_sec = left_sec

        cc.log('sec', left_sec, 'last_event', last_event)
        return left_sec
    }
}