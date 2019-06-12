
const { ccclass, property } = cc._decorator;
const route = {
    'ww3': 'worldwar3'
    , 'bblood': 'big_blood_rock'
    , 'rank0': 'rank0'
    , '3v3': '3v3'
    , 'group': 'group'
    , 'bracket16': 'bracket_16'
    // , '3v3': '3v3'
}
window['_c_'] = new cc.Node('_c_')
window['isOP'] = false
@ccclass
export default class NewClass extends cc.Component {


    onLoad() {
        //get url query
        const urlParams = new URLSearchParams(window.location.search);
        const panel = urlParams.get('panel');
        window['isOP'] = urlParams.get('op')=='1';

        // cc.log('panel ', panel)
        if (panel)
            for (const k in route) {
                if (panel == k) {
                    const scene = route[k];
                    cc.director.loadScene(scene);
                }
            }
        else if (!CC_BUILD) {
            cc.director.loadScene(route.ww3);
        }
    }

    start() {
     
        // cc.director.loadScene('worldwar3');
    }

}
