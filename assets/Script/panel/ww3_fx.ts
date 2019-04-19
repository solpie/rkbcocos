import { ccType } from '../__c';
declare let _c_;
function _tween(name, ctype, callback) {
    _c_.emit(ctype, {
        name: name, callback: node => {
            callback(cc['tween'](node))
        }
    })
}
export function resetPlayerInfo() {

}
export function showPlayerInfo(visible, data?) {
    if (visible) {
        _c_.emit(ccType.Node, { name: 'info_bg', active: true })
        _c_.emit(ccType.Node, { name: 'front_panel', opacity: 0 })
        _c_.emit(ccType.Node, { name: 'team_bg', opacity: 0 })

        _c_.emit(ccType.Label, { name: 'txt_info_R', opacity: 0 })
        _c_.emit(ccType.Label, {
            name: 'txt_info_R', callback: node => {
                cc['tween'](node)
                    .to(0.3, { opacity: 255 })
                    .start()
            }
        })
        _c_.emit(ccType.Label, {
            name: 'txt_hw_L', callback: node => {
                cc['tween'](node)
                    .to(0, { x: 60 })
                    .to(0.2, { x: 198 })
                    .start()
            }
        })
        _c_.emit(ccType.Label, {
            name: 'txt_hw_R', callback: node => {
                cc['tween'](node)
                    .to(0, { x: -60 })
                    .to(0.2, { x: -198 })
                    .start()
            }
        })
        let name_y1 = 55

        _c_.emit(ccType.Node, {
            name: 'info_player_R', callback: node => {
                cc['tween'](node)
                    .to(0.1, { y: name_y1 })
                    .start()
            }
        })

        _c_.emit(ccType.Node, {
            name: 'info_player_L', callback: node => {
                cc['tween'](node)
                    .to(0.1, { y: name_y1 })
                    .start()
            }
        })
    }

    else {
        _c_.emit(ccType.Node, { name: 'info_bg', active: false })
        _c_.emit(ccType.Node, { name: 'team_bg', opacity: 255 })
        _tween('front_panel', ccType.Node, tw => {
            tw.to(0.2, { opacity: 255 })
                .start()
        })
    }
}