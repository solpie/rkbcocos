import { setText } from "../__c";

export class Timer {
    _component: cc.Component
    _textName: string
    timeInSec: number = 60 * 20
    initTimer(component: cc.Component, textName: string) {
        this._component = component
        this._textName = textName
        component.schedule(_ => {
            this.timeInSec--
            setText(textName, this.timeInSec+'s')
        }, 1, Infinity)
    }

}