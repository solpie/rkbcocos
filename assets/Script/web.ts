import { ccType } from "./__c";
declare let axios;
declare let _c_;


function _proxy(url) {
    if (CC_BUILD)
        return '/proxy?url=' + url
    return 'http://127.0.0.1:80/proxy?url=' + url
}
export function loadImg64(sp, url) {
    let pUrl = _proxy(url)
    // cc.loader.load(pUrl, res => {
    //     cc.log(res)
    // })
    axios.get(pUrl)
        .then(function (res) {
            // console.log('axios loaded----', res.data)
            _c_.emit(ccType.Sprite, { name: sp, img64: res.data })
        })
}
const baseUrl = 'http://rtmp.icassi.us:8090/'
export function getPanelConf(pid, callback) {
    let url = baseUrl + 'panel/?pid=' + pid
    axios.get(url)
        .then(callback)
}