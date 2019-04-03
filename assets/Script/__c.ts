const { ccclass } = cc._decorator;
declare let _c_: cc.Node;


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
}
let map = {
    'Sprite': cc.Sprite
    , 'Label': cc.Label
}
@ccclass
export default class __sp extends cc.Component {
    _name: string
    sp: cc.Sprite
    cls: string
    comp: any
    onLoad() {
        for (const k in map) {
            let cls = map[k]
            let isCls = this.node.getComponent(cls) instanceof cls
            if (isCls) {
                this.comp = this.node.getComponent(cls)
                this.cls = k
                break;
            }
        }
        this._name = this.node.getComponent(map[this.cls]).node.name;
        // console.log(this._name, 'is', this.cls)
        cc.log(this._name, 'is', this.cls)
        if (this.cls == ccType.Sprite) {
            this.sp = this.node.getComponent(cc.Sprite);
            _c_.on(ccType.Sprite, data => {
                // console.log('img loaded', data)
                if (data.name == this._name) {
                    setSp64(this.sp, data.img64)
                }
            })
        }
        else if (this.cls == ccType.Label) {
            _c_.on(ccType.Label, data => {
                if (data.name == this._name) {
                    let label: cc.Label = this.comp
                    for (const key in data) {
                        if (key != 'name' && label[key] != null) {
                            label[key] = data[key];
                        }
                    }
                }
            })
        }

    }
}
