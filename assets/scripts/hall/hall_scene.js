cc.Class({
    extends: cc.Component,

    properties: {
        nick: {
            default: null,
            type: cc.Label,
        },

        id: {
            default: null,
            type: cc.Label,
        },

        glod: {
            default: null,
            type: cc.Label,
        },

        room_card: {
            default: null,
            type: cc.Label,
        },

        diamond: {
            default: null,
            type: cc.Label,
        },

        head: {
            default: null,
            type: cc.Sprite,
        },

        notify: {
            default: null,
            type: cc.Node,
        }

        
    },

    // use this for initialization
    onLoad: function () {
    },

    start() {
        this.nick.string = cc.bb.user.Module.nick;
        this.id.string = cc.bb.user.Module.id;
        this.glod.string = cc.bb.user.Module.gold;
        this.room_card.string = cc.bb.user.Module.room_card;
        this.diamond.string = cc.bb.user.Module.diamond;

        cc.loader.load(cc.bb.user.Module.face, (err, texture) => {
            if (err) {
                cc.log(err);
            } else {
                var spriteFrame = new cc.SpriteFrame(texture);
                this.head.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        });

        cc.bb.http.sendReq('/hall_notity',null, cc.bb.user.eventName.HALL_NOTIFY);
    },

    play_notify_action() {
        this.notify.getComponent('hall_notify').play();
    },

    hall_shop() {
        cc.bb.resLoader.loadPrefab('hall/shop/shop', (prefab) => {
            var shop = cc.instantiate(prefab);
            this.node.addChild(shop);
        });
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
