import { auto_doc, get_rank5_doc_url } from "../../web";
import { arrToMap } from "../../com/JsFunc";

const { ccclass, property } = cc._decorator;

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

    player_node_arr = []
    start() {
        for (let i = 0; i < 4; i++) {
            let player_node: cc.Node = cc.find('p' + (i + 1), this.node)
            if (player_node) {
                this.player_node_arr.push({ node: player_node, vote: 0, name: '球员 ' + (i + 1), player_id: '' })
                player_node.y = 92 - i * 90
                cc.log('node', player_node.name)
            }
        }

        auto_doc(get_rank5_doc_url, res => {
            if (res && res.length == 1) {
                let doc = res[0].data
                for (let i = 0; i < this.player_node_arr.length; i++) {
                    const item = this.player_node_arr[i];
                    let player
                    if (!item.player_id) {
                        player = doc.player_arr[i]
                        item.player_id = player.player_id
                        console.log('rank5 player_id', item.player_id)
                        let name = cc.find('name', item.node).getComponent(cc.Label)
                        name.string = player.name
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
                    }
                    let score = cc.find('score', item.node).getComponent(cc.Label)
                    score.string =Math.floor( item.vote)+''
                    bubble_anim(this.player_node_arr, 0, 0, swap_anim)
                }
            }
        })

    }
    // update (dt) {}
}
