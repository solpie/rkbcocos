import { ccType } from "./__c";
declare let axios;
declare let _c_;
declare let io;

export function getWsUrl(): string {
  if (CC_BUILD) return "/rkb";
  return "http://127.0.0.1/rkb";
}
export function getWs(): any {
  return io(getWsUrl());
}

function _proxy(url) {
  if (CC_BUILD) return "/proxy?url=" + url;
  return "http://127.0.0.1:80/proxy?url=" + url;
}

export function get_champion_rank_rec(callback) {
  let url = "http://rtmp.icassi.us:8090/event?idx=1";
  let pUrl = _proxy(url);
  axios.get(pUrl).then(function(res) {
    callback(res.data);
  });
}
export function get_player(player_id, callback) {
  let url = "http://rtmp.icassi.us:8090/player2?player_id=" + player_id;
  let pUrl = _proxy(url);
  axios.get(pUrl).then(function(res) {
    callback(res.data);
  });
}
export function get_basescore(callback) {
  let url = "http://rtmp.icassi.us:8090/basescore?idx=rank16";
  let pUrl = _proxy(url);
  axios.get(pUrl).then(function(res) {
    callback(res.data);
  });
}
export function get_basescore_com(callback) {
  let url = "http://rtmp.icassi.us:8090/basescore?idx=com_score";
  let pUrl = _proxy(url);
  axios.get(url).then(function(res) {
    callback(res.data);
  });
}
export const get_rank5_doc_url = "http://rtmp.icassi.us:8090/cw?idx=rank5";
export const get_ww3_doc_url = "http://rtmp.icassi.us:8090/basescore?idx=ww3";
export const get_blood_map_url = "http://rtmp.icassi.us:8090/bloodmap?idx=1";
export function auto_doc(url, callback, invert = 1000) {
  axios.get(url).then(
    function(res) {
      callback(res.data);
      setTimeout(_ => {
        auto_doc(url, callback, invert);
      }, invert);
    },
    err => {
      setTimeout(_ => {
        auto_doc(url, callback, invert);
      }, invert);
    }
  );
}
let img64Cache = {};
export function loadImg64(sp, url, cache = false) {
  let pUrl = _proxy(url);
  // cc.loader.load(pUrl, res => {
  //     cc.log(res)
  // })
  if (cache && imageCache[url]) {
    _c_.emit(ccType.Sprite, { name: sp, img64: imageCache[url] });
  } else
    axios.get(pUrl).then(function(res) {
      // console.log('axios loaded----', res.data)
      imageCache[url] = res.data;
      _c_.emit(ccType.Sprite, { name: sp, img64: res.data });
    });
}
const loaderCache = {};
export function loadImgOnly(url) {
  let pUrl = _proxy(url);
  if (imageCache[url]) {
  } else {
    if (!loaderCache[url]) {
      loaderCache[url] = "loading";
      axios.get(pUrl).then(function(res) {
        loaderCache[url] = "done";
        console.log("axios loaded----", url);
        imageCache[url] = res.data;
      });
    }
  }
}
export function get_loaded_count() {
  let count = 0;
  for (let url in loaderCache) {
    let state = loaderCache[url];
    if (state == "done") count += 1;
  }
  return count;
}
export function loadImg64ByNode(sp, url, cache = false) {
  let pUrl = _proxy(url);
  if (cache && imageCache[url]) {
    let img = new Image();
    img.src = imageCache[url];
    let tex = new cc.Texture2D();
    tex.initWithElement(img);
    tex.handleLoadedTexture();
    let newframe = new cc.SpriteFrame(tex);
    sp.spriteFrame = newframe;
  } else
    axios.get(pUrl).then(function(res) {
      let img = new Image();
      imageCache[url] = res.data;
      img.src = res.data;
      let tex = new cc.Texture2D();
      tex.initWithElement(img);
      tex.handleLoadedTexture();
      let newframe = new cc.SpriteFrame(tex);
      sp.spriteFrame = newframe;
    });
}

let imageCache = {};
export function loadImg64_InjectCls(url, callback) {
  let pUrl = _proxy(url);
  if (!imageCache[url]) {
    axios.get(pUrl).then(function(res) {
      imageCache[url] = res.data;
      callback(res.data);
    });
  } else {
    callback(imageCache[url]);
  }
}

const baseUrl = "http://rtmp.icassi.us:8090/";
export function getPanelConf(pid, callback) {
  let url = baseUrl + "panel/?pid=" + pid;
  axios.get(url).then(callback);
}

export function opReq(cmdId, param) {
  let url = `/panel/online/${cmdId}`;
  if (!CC_BUILD) url = "http://127.0.0.1:80" + url;
  param._ = "_";
  axios({
    url: url,
    method: "post",
    data: JSON.stringify(param),
    headers: { "Content-Type": "application/json" }
  });
}
