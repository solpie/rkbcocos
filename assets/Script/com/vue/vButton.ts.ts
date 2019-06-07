import { getAppDiv } from './ccVue';

const { ccclass, property } = cc._decorator;

@ccclass
export default class VueButton extends cc.Component {
    onLoad() {
        var o = document.body;
        var div = document.createElement("div");
        let app_div=  getAppDiv()
        cc.log('app div',app_div)
        // div.innerHTML = this.btn_name;
        // o.appendChild(div);
    }

    start() {

    }

    // update (dt) {}
}
