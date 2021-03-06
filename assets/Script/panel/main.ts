
const { ccclass, property } = cc._decorator;
const route = {
    // 'ww3': 'worldwar3'
    //  'bblood': 'big_blood_rock'
     'bscore': 'big_score'
    , 'rank0': 'rank0'
    , '3v3': '3v3'
    , '5v5': 'TJ_5v5'
    , 'bblood': 'TJ_ww3_big_blood'
    
    , 'gfx': 'gfx2'
    , 'gfx2': 'gfx2'
    , 'football': 'football'
    , 'group': 'group'
    , 'group8': 'group_list'
    , 'bracket32': 'group_list'
    , 'group_power': 'group_power'
    , 'bracket16': 'bracket_16'
    , 'benxi': 'benxi'
    , 'benxi_score': 'big_score'
    , 'benxi_bblood': 'big_blood_benxi'
    , 'benxi_bblood2': 'big_blood_benxi2'
    , 'ww3': 'ww3_benxi2'
    , 'side_player': 'side_player'
    , 'rank8': 'rank8'
    , 'rank5': 'rank5_benxi2'
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
        window['no_timer'] = urlParams.get('no_timer')=='1';
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
