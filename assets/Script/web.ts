import { ccType } from "./__c";
declare let axios;
declare let _c_;


function _proxy(url) {
    if (CC_BUILD)
        return '/proxy?url=' + url
    return 'http://127.0.0.1:80/proxy?url=' + url
}
export function loadImg64(sp, url) {
    axios.get(_proxy(url))
        .then(function (res) {
            // console.log('axios loaded----', res.data)
            _c_.emit(ccType.Sprite, { name: sp, img64: res.data })
        })
}
