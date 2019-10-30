
const { ccclass, property } = cc._decorator;
const route = {
    'ww3': 'worldwar3'
    , 'bblood': 'big_blood_rock'
    , 'bscore': 'big_score'
    , 'rank0': 'rank0'
    , '3v3': '3v3'
    , 'group': 'group'
    , 'group8': 'group_list'
    , 'bracket32': 'group_list'
    , 'group_power': 'group_power'
    , 'bracket16': 'bracket_16'
    , 'benxi': 'benxi'
    , 'benxi_bblood': 'big_blood_benxi'
    , 'benxi_bblood2': 'big_blood_benxi2'
    , 'benxi_ww3': 'ww3_benxi2'
    , 'side_player': 'side_player'
    // , '3v3': '3v3'
}
window['_c_'] = new cc.Node('_c_')
window['isOP'] = false
@ccclass
export default class Main extends cc.Component {
    onLoad() {
        //get url query
        const urlParams = new URLSearchParams(window.location.search);
        const panel = urlParams.get('panel');
        window['isOP'] = urlParams.get('op')=='1';
        window['isDelay'] = urlParams.get('delay')=='1';
        window['panel_name'] = panel
        // cc.log('panel ', panel)
        if (panel)
            for (const k in route) {
                if (panel == k) {
                    const scene = route[k];
                    cc.director.loadScene(scene);
                }
            }
        else if (!CC_BUILD) {
            cc.director.loadScene(route['rank0']);
        }
    }

    start() {
     
    }

}
