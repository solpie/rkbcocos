
const { ccclass, property } = cc._decorator;
const route = {
    'ww3': 'worldwar3'
    , 'bblood': 'bblood'
}
@ccclass
export default class NewClass extends cc.Component {


    onLoad() {
        //get url query
        const urlParams = new URLSearchParams(window.location.search);
        const panel = urlParams.get('panel');
        for (const k in route) {
            if (panel==k) {
                const scene = route[k];
                cc.director.loadScene(scene);
            }
        }
    }

    start() {
        // cc.director.loadScene('worldwar3');
    }

}
