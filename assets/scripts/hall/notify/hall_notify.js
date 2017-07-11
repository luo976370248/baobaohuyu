cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad(){
        this.node.x = this.node.parent.width + 20;
    },

    play() {
        this.node.x = this.node.parent.width + 20;

        var move = cc.moveBy(0.1, cc.p(-10, 0));
        var check_pos = cc.callFunc(() => {
            if (this.node.x < -this.node.width) {
                 this.node.x = this.node.parent.width + 20;
            }
        }, this);

        this.node.runAction(cc.repeatForever(cc.spawn(move, check_pos)));
    }

    
});
