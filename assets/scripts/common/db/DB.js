const LocalStroeDB = {
    guset_key: null,

    init() {
        this.guset_key = cc.sys.localStorage.getItem('guest_ukey');
    },
    
    setGusetKey(key) {
        this.guset_key = key;
        if (!key) {
            cc.sys.localStorage.removeItem('guest_ukey')
        }
        cc.sys.localStorage.setItem('guest_ukey', key);
    }
}

cc.bb.db = LocalStroeDB;