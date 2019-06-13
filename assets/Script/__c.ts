import { loadImg64_InjectCls } from './web';
const { ccclass, property } = cc._decorator;
declare let _c_: cc.Node;
// export function injectCls(cls) {
//     cls['setNodeLabel'] = function (nodeName, text) {
//         let pn = this.node.getChildByName(nodeName)
//         if (pn) {
//             let pnLabel = pn.getComponent(cc.Label)
//             pnLabel.string = text
//         }
//     }
// }
export class InjectCls extends cc.Component {
    regist_this_node() {
        if (!_c_['node_list'])
            _c_['node_list'] = {}
        if (!_c_['node_list'][this.node.name])
            _c_['node_list'][this.node.name] = this
    }
    getNode(nodeName) {
        return this.node.getChildByName(nodeName)
    }

    setNodeLabel(nodeName, text) {
        let pn = this.node.getChildByName(nodeName)
        if (pn) {
            let pnLabel = pn.getComponent(cc.Label)
            pnLabel.string = text
        }
    }
    setSPbyUrl(nodeName, url) {
        loadImg64_InjectCls(url, img64 => {
            let node = this.node.getChildByName(nodeName)
            if (node) {
                let sp = node.getComponent(cc.Sprite)
                setSp64(sp, img64)
            }
        })
    }
}

function setSp64(sp, img64) {
    let img = new Image()
    img.src = img64
    let tex = new cc.Texture2D()
    tex.initWithElement(img)
    tex.handleLoadedTexture()
    let newframe = new cc.SpriteFrame(tex)
    sp.spriteFrame = newframe
}
export function setText(txtName, text) {
    _c_.emit(ccType.Label, { name: txtName, string: text })
}
export const ccType = {
    Sprite: 'Sprite'
    , Label: 'Label'
    , Animation: 'Animation'
    , ProgressBar: 'ProgressBar'
    , Node: 'Node'
}
let map = {
    'Sprite': cc.Sprite
    , 'Label': cc.Label
    , 'Animation': cc.Animation
    , 'ProgressBar': cc.ProgressBar
    , 'Node': cc.Node

}
let nodeKey = ['x', 'y', 'opacity', 'callback', 'active']

export function getNode(nodeName, callback) {
    _c_.emit(ccType.Node, { name: nodeName, callback: callback })
}
@ccclass
export default class __sp extends cc.Component {
    _name: string
    cls: string
    comp: any

    @property
    cc_type: string = '';
    onLoad() {
        if (this.cc_type) {
            // cc.log('speci type', this.cc_type, this.node['_components'])
            this.cls = this.cc_type
            // this.comp = this.node.getComponent(map[this.cls])
        }
        else {//only one component
            for (const k in map) {
                let cls = map[k]
                let firstComp = this.node['_components'][0]
                let isCls = firstComp instanceof cls
                if (isCls) {
                    this.comp = firstComp
                    this.cls = k
                    break;
                }
            }
        }
        if (this.cls == ccType.Node)
            this._name = this.node.name
        else
            this._name = this.node.getComponent(map[this.cls]).node.name;


        // cc.log(this._name, 'is', this.cls)
        let handle = (type, callback) => {
            if (this.cls == type) {
                _c_.on(type, data => {
                    if (data.name == this._name) {
                        callback(data)
                    }
                })
            }
        }
        handle(ccType.Node, data => {
            let nodeKey = ['x', 'y', 'opacity', 'callback', 'active']
            for (let k of nodeKey) {
                if (data[k] != null) {
                    if (k == 'callback')
                        data[k](this.node)
                    else
                        this.node[k] = data[k]
                }
            }
        })
        handle(ccType.Sprite, data => {
            let sp: cc.Sprite = this.comp
            if (data.img64)
                setSp64(sp, data.img64)
            let nodeKey = ['x', 'y', 'opacity', 'callback', 'active']
            cc.log('handle sprite', this._name, data['x'])
            for (let k of nodeKey) {
                if (data[k] != null) {
                    if (k == 'callback')
                        data[k](this.node)
                    else
                        this.node[k] = data[k]

                }
            }
        })
        handle(ccType.Label, data => {
            let label: cc.Label = this.comp
            for (const key in data) {
                if (key != 'name' && label[key] != null) {
                    label[key] = data[key];
                }
            }
            this.oneCompNode(data)
        })
        handle(ccType.Animation, data => {
            let anim: cc.Animation = this.comp
            // cc.log('ccType.Animation', data,anim)
            if (data.play) {
                anim.play(data.play)
            }
        })
        handle(ccType.ProgressBar, data => {
            let pb: cc.ProgressBar = this.comp
            if (data.progress != null) {
                pb.progress = data.progress
                for (let i = 0; i < data.callbackMap.length; i++) {
                    let callbackProgress = data.callbackMap[i];
                    let p = callbackProgress[0]
                    if (pb.progress >= p) {
                        callbackProgress[1](this.node)
                        break;
                    }
                }
            }
        })
    }
    oneCompNode(data) {
        // cc.log('handle node', this._name)
        for (let k of nodeKey) {
            if (data[k] != null) {
                if (k == 'callback')
                    data[k](this.node)
                else
                    this.node[k] = data[k]
            }
        }
    }
}
