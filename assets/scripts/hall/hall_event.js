cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        cc.bb.user.eventEM.addObserver(this);
    },

    onDestory() {
        cc.bb.user.eventEM.removeObserver(this);
    },

    hall_notify(data) {
        cc.bb.user.Module.save_notify(data);
        this.node.getComponent('hall_scene').play_notify_action();
    },

    hall_shop(data) {
        if (data) {
            cc.bb.user.Module.save_shop_diamond(data);
            this.node.getComponent('hall_scene').hall_shop();
        }
    },

    onMsgEvent(event, data) {
        switch(event) {
            case cc.bb.user.eventName.HALL_NOTIFY: {
                this.hall_notify(data);
                break;
            }
            case cc.bb.user.eventName.HALL_SHOP: {
                 this.hall_shop(data);
                 break;
            }
        }
    }
});
