export class ToggleView {
  node_map = {};
  constructor({ node, path_arr }) {
    // this.node_arr = [];
    for (let pathname of path_arr) {
      const n: cc.Node = cc.find(pathname, node);
      if (n) this.node_map[pathname] = n;
    }
  }

  show_child(nodename) {
    // this.node_map[nodename]
    cc.log("show_child", nodename);
    for (let k in this.node_map) {
      const n: cc.Node = this.node_map[k];
      if (nodename === n.name) {
        n.opacity = 255;
      } else {
        n.opacity = 0;
      }
    }
    }
    
}
