const SceneID = cc.Enum({
    LOADING: 1,
    LOGIN: 2,
    HALL: 3,
    GAME: 4,
});

cc.bb.sceneID = SceneID;

const SceneManager = cc.Class({
    sceneManager: null,
    loadGameScene: false, // 标记场景是否在加载
    statics: {
        getInstance() {
            if (!this.sceneManager) {
                this.sceneManager = new SceneManager();
            }
            return this.sceneManager;
        },
    },

    addPersistRootNode(node) {
        cc.game.addPersistRootNode(node);
    },

    removePersistRootNode(node) {
        cc.game.removePersistRootNode(node);
    },

    runScene(sceneID, data, fun) {
        this._loadScene(sceneID, data, fun);
    },

    _loadScene(sceneID, data, fun) {
        switch (sceneID) {
           case SceneID.LOADING: {
               this._replaceScene('loading_scene', sceneID, data, fun);
               break;
           }
           case SceneID.LOGIN: {
               this._replaceScene('login_scene', sceneID, data, fun);
               break;
           }
           case SceneID.HALL: {
               this._replaceScene('hall_scene', sceneID, data, fun);
               break;
           }
          case SceneID.GAME: {
               this._replaceScene('ZJHGameScene', sceneID, data, fun);
               break;
           }
           default: {
               break;
           }
        }
    },

    _replaceScene(sceneName, sceneID, data, fun) {

        if (cc.director.getScene().sceneID && (cc.director.getScene().sceneID === sceneID)) {
            return;
        }

        if (this.loadGameScene) {
            return;
        }

        this.loadGameScene = true;

        // 停止内存释放
       // cc.bb.resRelease.stopAutoRelease();

        cc.director.preloadScene(sceneName, () => {
            cc.director.loadScene(sceneName, () =>  {
                cc.director.getScene().sceneID = sceneID;

                cc.director.getScene().data = data;

                this.loadGameScene = false;
               // cc.bb.resRelease.releaseResDir();
               // cc.bb.resRelease.startAutoForceRelease();
                setTimeout(() => {
                   // cc.bb.resRelease.startAutoRelease();
                }, 12 * 1000);
                if (fun) {
                    fun();
                }

            });
        });
    },
});

SceneManager.SceneID = SceneID;
cc.bb.scene = module.exports = SceneManager.getInstance();