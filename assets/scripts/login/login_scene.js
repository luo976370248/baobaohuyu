cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad() {
        cc.bb.db.init();
        cc.bb.user.eventEM.addObserver(this);
    },

    onDestory() {
        cc.bb.user.eventEM.removeObserver(this);
    },

    onGuestClick(event, data) {
        var ukey = cc.bb.db.guset_key;
        if (!ukey || ukey === 'undefined') {
            ukey = cc.bb.format.random_string(32);
        }
        cc.bb.http.sendReq('/guest_login', {ukey: ukey}, cc.bb.user.eventName.GUEST_LOGIN,'http://127.0.0.1:5000');
    },

    login_sucess(data) {
        cc.bb.user.Module.save_guest_login(data);
        cc.bb.scene.runScene(cc.bb.sceneID.HALL);
    },

    onMsgEvent(event, data) {
        switch(event) {
            case cc.bb.user.eventName.GUEST_LOGIN: {
                this.login_sucess(data);
                break;
            }
        }
    }
  
});
