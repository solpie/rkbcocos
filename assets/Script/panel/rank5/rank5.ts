import { auto_doc, get_rank5_doc_url, loadImg64ByNode } from "../../web";
import { arrToMap } from "../../com/JsFunc";

const { ccclass, property } = cc._decorator;
const ITEM_INVERT_Y = 90
const ITEM_start_Y =240
function bubbleSort(arr) {
    for (var j = 0; j < arr.length - 1; j++) {
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
    let item_i_scale = arr[item_i].is_max?1.3:1;
    let item_i_1_scale = arr[item_i_1].is_max?1.3:1;
    cc['tween'](arr[item_i].node)
        .to(0.2, { y: ITEM_start_Y - item_i * ITEM_INVERT_Y })
        .to(0.2, { scale:item_i_scale })
        .start()
    cc['tween'](arr[item_i_1].node)
        .to(0.2, { y: ITEM_start_Y - item_i_1 * ITEM_INVERT_Y })
        .to(0.2, { scale:item_i_1_scale })
        .call(_ => {
            arr[0].node.scale = 1.3
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

    player_node_arr = []
    start() {
        for (let i = 0; i < 4; i++) {
            let player_node: cc.Node = cc.find('p' + (i + 1), this.node)
            if (player_node) {
                this.player_node_arr.push({ node: player_node, vote: 0, name: '球员 ' + (i + 1), player_id: '',is_max:false })
                player_node.y = ITEM_start_Y - i * ITEM_INVERT_Y
                cc.log('node', player_node.name)
            }
        }

        auto_doc(get_rank5_doc_url, res => {
            if (res && res.length == 1) {
                let doc = res[0].data
                let max_score = 0
                for (let i = 0; i < this.player_node_arr.length; i++) {
                    const item = this.player_node_arr[i];
                    let player
                    if (!item.player_id) {
                        player = doc.player_arr[i]
                        item.player_id = player.player_id
                        console.log('rank5 player_id', item.player_id)
                        let name = cc.find('name', item.node).getComponent(cc.Label)
                        name.string = player.name
                        let avt =  cc.find('avt', item.node)
                        loadImg64ByNode(avt.getComponent(cc.Sprite),player.avatar)
                    }
                    else {
                        for (let p of doc.player_arr) {
                            if (p.player_id == item.player_id) {
                                player = p
                                break;
                            }
                        }
                    }

                    item.vote = Number(player.score)
                    if (item.player_id == doc.last_player_id) {
                        item.vote += 0.1
                        // item.node.scale = 1
                    }

                    max_score = Math.max(max_score,item.vote)
                    let score = cc.find('score', item.node).getComponent(cc.Label)
                    score.string =Math.floor( item.vote)+''
                }
                for (let i = 0; i < this.player_node_arr.length; i++) {
                    const item = this.player_node_arr[i];
                    item.is_max = item.vote==max_score
                }
                bubble_anim(this.player_node_arr, 0, 0, swap_anim)
            }
        })

    }
    // update (dt) {}
}
