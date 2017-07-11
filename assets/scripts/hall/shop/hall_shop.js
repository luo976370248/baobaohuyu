cc.Class({
    extends: cc.Component,

    properties: {
        item_type: {
            default: null,
            type: cc.String,
            visible: false,
        }
    },

    // use this for initialization
    onLoad: function () {
        this.init_ui('diamond');
    },

    init_ui(type) {

        var item_children = this.node.getChildByName('item').children;
        item_children.forEach((item, index) => {
            item.active = false;
        });

        var data = cc.bb.user.Module.shop[type];
        data.forEach((item, index) => {
            if (item_children[index]) {
                item_children[index].active = true;
                item_children[index].getComponent('hall_shop_item').init_ui(item);
            }
            
        });
    },

    on_tab_click(event, data) {
        this.item_type = data;
        if (cc.bb.user.Module.shop[data]) {
            cc.dd.user.eventEM.notifyEvent(cc.bb.user.eventName.HALL_SHOP);
        } else {
            cc.bb.http.sendReq('/hall_shop',{type: 'data'}, cc.bb.user.eventName.HALL_SHOP);
        }
    },

    on_close_click(event, data) {
        this.node.destroy();
    }
});
