const { ccclass } = cc._decorator;
declare let _c_: cc.Node;
@ccclass
export default class __Clip extends cc.Component {

    start() {
        var anim = this.getComponent(cc.Animation);

        // 如果没有指定播放哪个动画，并且有设置 defaultClip 的话，则会播放 defaultClip 动画
        anim.play("player_dot");
        cc.log('on start')
    }
}