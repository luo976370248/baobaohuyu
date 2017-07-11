const LocalStoragesEnum = {
    GUEST_KEY: "guest_key",
}
const LocalStoragesDB = cc.Class({
     _localStarage: null,
    statics: {
        getInstance() {
            if (!this._localStarage) {
                this._localStarage = new LocalStoragesDB();
            }

            return this._localStarage;
        },
    },

    _guest_key: null,

    // 存取本地数据
    init() {
        if (cc.sys.localStorage.getItem(LocalStoragesEnum.GUEST_KEY)) {
            this._guest_key = cc.sys.localStorage.getItem(LocalStoragesEnum.GUEST_KEY);
        } else {
            this._guest_key = null;
        }
    },

    // 设置 游客登录的token
    setGuestKey(guest_key) {
        this._guest_key = guest_key;
        cc.sys.localStorage.setItem(LocalStoragesEnum.GUEST_KEY, guest_key);
    },

    // 获取 游客登录的token
    getGuestKey() {
        return this._guest_key;
    },

});

LocalStoragesDB.LocalStoragesEnum = LocalStoragesEnum;
module.exports = LocalStoragesDB;