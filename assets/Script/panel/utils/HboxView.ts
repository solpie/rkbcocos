export class HboxView {
  node_arr: Array<cc.Node>;
  constructor({ node, basename, len }) {
    this.node_arr = [];
    for (let i = 0; i < len; i++) {
      const n = cc.find(basename + (i + 1), node);
      this.node_arr.push(n);
    }
  }

  show_num_children(num) {
    //
    for (let i = 0; i < this.node_arr.length; i++) {
      const n = this.node_arr[i];
      if (i < num) {
        //
        n.opacity = 255;
      } else {
        n.opacity = 0;
      }
    }
  }
}
