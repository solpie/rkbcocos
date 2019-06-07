import { getAppDiv } from './ccVue';

const { ccclass, property } = cc._decorator;

@ccclass
export default class VueButton extends cc.Component {
    onLoad() {
        let app_div = getAppDiv()
        cc.log('app div', app_div)
        // <input v-model="lScoreInput" class="input" type="text" style="width: 80px;"> 蓝队：
        var pos  = this.node.convertToWorldSpaceAR(this.node.getPosition())
        let btn_x = pos.x
        let btn_y = pos.y
        var v_html = document.createElement("div");
        v_html.setAttribute('v-html', "htmlData")

        v_html.innerHTML = `<input v-model="lScoreInput" class="input" type="text" style="width: 80px;top:${btn_y} px;left:${btn_x} px;">`;
        app_div.appendChild(v_html);
    }

    start() {

    }

    // update (dt) {}
}
