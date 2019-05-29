import { ccType } from "./__c";
declare let axios;
declare let _c_;

export function getWsUrl(): string {
    if (CC_BUILD)
        return '/rkb'
    return 'http://127.0.0.1/rkb'
}

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
let imageCache = {}
export function loadImg64_InjectCls(url, callback) {
    let pUrl = _proxy(url)
    if (!imageCache[url]) {
        axios.get(pUrl)
            .then(function (res) {
                imageCache[url] = res.data
                callback(res.data)
            })
    }
    else {
        callback(imageCache[url])
    }

}

const baseUrl = 'http://rtmp.icassi.us:8090/'
export function getPanelConf(pid, callback) {
    let url = baseUrl + 'panel/?pid=' + pid
    axios.get(url)
        .then(callback)
}

export function opReq(cmdId, param) {
    let url = `/panel/online/${cmdId}`
    if (!CC_BUILD)
        url = 'http://127.0.0.1:80' + url
    param._ = '_'
    axios({
        url: url,
        method: "post",
        data: JSON.stringify(param),
        headers: { "Content-Type": "application/json" },
    })
}