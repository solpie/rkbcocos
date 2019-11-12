// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

function bubbleSort(arr) {
    for (var j = 0; j < arr.length - 1; j++) {
        // 这里要根据外层for循环的 j，逐渐减少内层 for循环的次数
        for (var i = 0; i < arr.length - 1 - j; i++) {
            if (arr[i] > arr[i + 1]) {
                var temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
    return arr;
}
function swap_anim(item_i, item_i_1, arr, i, j, swap_anim) {
    cc['tween'](arr[item_i].node)
        .to(0.2, { y: 92 - item_i * 90 })
        .start()
    cc['tween'](arr[item_i_1].node)
        .to(0.2, { y: 92 - item_i_1 * 90 })
        .call(_ => {
            bubble_anim(arr, i, j, swap_anim)
        })
        .start()
}
function bubble_anim(arr, i, j, swap_anim) {
    // cc.log('i:', i, 'j:', j)
    if (j < arr.length - 1) {
        if (i < arr.length - 1 - j) {
            let vote_i = arr[i].vote
            let vote_i_1 = arr[i + 1].vote
            if (vote_i < vote_i_1) {
                //swap
                let tmp = arr[i]
                arr[i] = arr[i + 1]
                arr[i + 1] = tmp
                swap_anim(i, i + 1, arr, i, j, swap_anim)
            }
            else {
                bubble_anim(arr, i + 1, j, swap_anim)
            }
        }
        else {
            let i = 0
            j++
            bubble_anim(arr, i, j, swap_anim)
        }
    }
}
declare let io;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    player_node_arr = []
    start() {
        for (let i = 0; i < 8; i++) {
            let player_node: cc.Node = cc.find('p' + (i + 1), this.node)
            if (player_node) {
                this.player_node_arr.push({ node: player_node, vote: 0, name: '球员 ' + (i + 1) })
                player_node.y = 92 - i * 90

                player_node.getComponent(cc.Label).string = player_node.name// 'player ' + (i + 1)
                cc.log('node', player_node.name)
            }
        }



        for (let i = 0; i < this.player_node_arr.length; i++) {
            const item = this.player_node_arr[i];
            let random_vote = Math.random() > 0.5
            // if (random_vote) {

            item.vote += Math.floor(Math.random() * 20)
            item.node.getComponent(cc.Label).string = item.name + ' 票数:' + item.vote
            // }
        }

        setInterval(_ => {
            // setTimeout(() => {

            for (let i = 0; i < this.player_node_arr.length; i++) {
                const item = this.player_node_arr[i];
                let random_vote = Math.random() > 0.5
                if (random_vote) {

                    item.vote += Math.floor(Math.random() * 200)
                    item.node.getComponent(cc.Label).string = item.name + ' 票数:' + item.vote
                    // item.node.getComponent(cc.Label).string = '球员 ' + (i + 1) + ' 票数:' + item.vote
                }
            }
            bubble_anim(this.player_node_arr, 0, 0, swap_anim)

            // cc['tween'](node)
            //     .to(0.3, { x: this._fx_offs })
            //     .start()

        }, 3000)

        this.init_ws()
    }
    init_ws() {
        let ws = 'http://101.37.96.132:3081'
        let io_1 = io(ws)
            .on('connect', _ => {
                cc.log('socketio.....localWS')
                io_1.emit('join', { et: 1000, token: '', via: 5, room_id: 10946, "match_id": 0 })
            })
            .on('wall', msg => {
                if (msg['un'])
                    cc.log(msg['un'], ':', msg['cnt'])
            })
    }
    // update (dt) {}
}
