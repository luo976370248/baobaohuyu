cc.bb.user = {};

var EventName = {
    "GUEST_LOGIN": "guest_login",
    'HALL_NOTIFY': 'hall_notify',
    "HALL_SHOP": "hall_shop",
}

cc.bb.user.eventName = EventName;

var EventEM = cc.Class({
    extends: cc.bb.eventManager
});

cc.bb.user.eventEM = EventEM.getInstance();

var Module = {
    id: null,
    nick: null,
    name: null,
    sex: null,
    face: null,
    phone: null,
    state: null,
    email: null,
    city: null,
    vip: null,
    is_guest: null, 
    wx_token: null,
    gold: null,
    room_card: null,
    diamond: null,
    ukey: null,

    notify: null, // 公告信息

    shop: {
        diamond: null,
        gold: null,
        redeem:null, 
        other: null,
    },

    save_guest_login(data) {
        this.state = data.status;
        this.id = data.uid;
        this.face = data.uface;
        this.gold = data.ugold;
        this.key = data.ukey;
        this.nick = data.unick;
        this.room_card = data.uroomCard;
        this.diamond = data.udiamond;
        this.sex = data.usex;
        this.vip = data.vip;

        cc.bb.db.setGusetKey(data.ukey);
    },

    save_notify(data) {
        this.notify = data;
    },

    save_shop_diamond(diamond) {
        this.shop.diamond = diamond;
    },

    save_shop_gold(gold) {
        this.shop.gold = gold;
    },

    save_shop_redeem(redeem) {
        this.shop.redeem = redeem;
    },

    save_shop_other(other) {
        this.shop.other = other;
    }


};

cc.bb.user.Module = Module;