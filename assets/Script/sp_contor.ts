const { ccclass, property } = cc._decorator;
declare let imgLoader: cc.Node;


function setSp64(sp, img64) {
    let img = new Image()
    img.src = img64
    let tex = new cc.Texture2D()
    tex.initWithElement(img)
    tex.handleLoadedTexture()
    let newframe = new cc.SpriteFrame(tex)
    sp.spriteFrame = newframe
}

@ccclass
export default class Sp_Contor extends cc.Component {
    spname: string
    sp: cc.Sprite

    onLoad() {
        this.sp = this.node.getComponent(cc.Sprite);
        this.spname = this.node.getComponent(cc.Sprite).node.name;
        console.log('sploader', this.spname, imgLoader)
        imgLoader.on('img', data => {
            console.log('img loaded', data)
            if (data.name == this.spname) {
                setSp64(this.sp, data.img64)
            }
        })
    }

    start() {

    }
}
