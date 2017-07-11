const ResLoader = {
    loadStaticDir(dir, onload) {
        cc.bb.resRelease.stopAutoRelease();
        if (!cc.loader.staticRes) {
            cc.loader.staticRes = {};
        }

        cc.loader.loadResDir(dir, (err, item) => {
            if (err) {
                cc.bb.log.error(err.message || err);
            } else {
                this._parseDirRes(item);
                onload(item);
            }
            // dd.ResRelease.startAutoRelease();
        });
    },

    _parseDirRes(list) {
        list.forEach((item, index) => {
            if (item instanceof cc.Texture2D) {
                let key = "";
                if (cc.sys.isNative) {
                    key = item.getName(); // getPath();
                } else {
                    let url = item.url;
                    let split_url = url.split('/');
                    let sub_url = split_url[split_url.length - 1].split('.');
                    key = sub_url[0].toUpperCase();
                }
                item.isReleaseRes = true;
                cc.loader.staticRes[key] = item;
            } else if (item instanceof cc.SpriteFrame) {
                if (item._texture) {
                     item._texture.isReleaseRes = true;
                }
                cc.loader.staticRes[item.name.toUpperCase()] = item;
            } else if (item instanceof cc.Prefab) {
                item.isReleaseRes = true;
                cc.loader.staticRes[item.name.toUpperCase()] = item;
            } else if (item instanceof cc.BitmapFont) {
                item.isReleaseRes = true;
                cc.loader.staticRes[`${item.name.toUpperCase()} + _font`] = item;
            } else if (item instanceof cc.SpriteAtlas) {
                let split_list = item.name.split('.');
                let atlas_list = {};
                cc.bb._.forEach(item._spriteFrames, (item_sub) => {
                    if (item_sub._texture) {
                        item_sub._texture.isReleaseRes = true;
                    }
                    atlas_list[item_sub.name.toUpperCase()] = item;
                });
                item.isReleaseRes = true;
                cc.loader.staticRes[split_list[0].toUpperCase() + "_ATLAS"] = item;
                cc.loader.staticRes[split_list[0].toUpperCase()] = atlas_list;
            } else if (item instanceof cc.AnimationClip) {
                cc.log('AnimationClip 资源加载未做处理');
            } else if (item instanceof Object && item.name) {
                cc.log('Object 资源加载未做处理');
            }
        });
    },
    
    loadResArr(pathArr, onload) {
        cc.bb.resRelease.stopAutoRelease();
        let index = 0;
        let prefabArr = [];
        let func = function () {
            if (index < pathArr.length) {
                this._loadPrefabRes(pathArr[index], (prefab) => {
                    prefabArr.push(prefab);
                    index++;
                    func();
                });
            } else {
                onload(prefabArr);
               // // dd.ResRelease.startAutoRelease();
            }
        }

        func();
    },
    
    _loadPrefabRes(path, onload) {
        cc.loader.loadRes(path[0], path[1], (err, prefab) => {
            if (err) {
                cc.bb.log.error(err.message || err);
            } else {
                onload(prefab);
            }
        });
    },
    
    // ******************** 以下是加载 单个资源 ************************
    loadPrefab(path, onload) {
        cc.bb.resRelease.stopAutoRelease();
        cc.loader.loadRes(path, cc.Prefab, (err, prefab) => {
            if (err) {
                cc.bb.log.error(err.message || err);
            } else {
                onload(prefab);
            }
            // dd.ResRelease.startAutoRelease();
        });
    },

    loadJson(path, onload) {
        cc.bb.resRelease.stopAutoRelease();
        cc.loader.loadRes(path, (err, json) => {
            if (err) {
                cc.bb.log.error(err.message || err);
            } else {
                onload(json);
            }
            // dd.ResRelease.startAutoRelease();
        });
    },

    loadAtlasFrame(path, name, onload) {
        cc.bb.resRelease.stopAutoRelease();
        this.loadAtlas(path, (atlas) => {
            let spriteFrame = atlas.getSpriteFrame(name);
            if (cc.bb._.isUndefined(spriteFrame)) {
                cc.bb.log.error("spriteFrame:" + path + "/" + name + " 不存在");
            } else {
                onload(spriteFrame);
            }
            // dd.ResRelease.startAutoRelease();
        });
    },

    loadTextureFrame(path, onload) {
        cc.bb.resRelease.stopAutoRelease();
        cc.loader.loadRes(path, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                cc.bb.log.error(err.message || err);
            } else {
                onload(spriteFrame);
            }
            // dd.ResRelease.startAutoRelease();
        });
    },

    loadAtlas(path, onload) {
        cc.bb.resRelease.stopAutoRelease();
        cc.loader.loadRes(path, cc.SpriteAtlas, (err, atlas) => {
            if (err) {
                cc.bb.log.error(err.message || err);
            } else {
                onload(atlas);
            }
            // dd.ResRelease.startAutoRelease();
        });
    },

    loadTexture(path, onload) {
        cc.bb.resRelease.stopAutoRelease();
        cc.loader.loadRes(path, cc.Texture2D, (err, texture) => {
            if (err) {
                cc.bb.log.error(err.message || err);
            } else {
                onload(texture);
            }
            // dd.ResRelease.startAutoRelease();
        });
    },

    loadFont(path, onload) {
        cc.bb.resRelease.stopAutoRelease();
        cc.loader.loadRes(path, cc.Font, (err, font) => {
            if (err) {
                cc.error(err.message || err);
            } else {
                onload(font);
            }
            // dd.ResRelease.startAutoRelease();
        });
    },

    loadAnimation(path, onload) {
        cc.bb.resRelease.stopAutoRelease();
        cc.loader.loadRes(path, cc.AnimationClip, (err, animation) => {
            if (err) {
                cc.bb.log.error(err.message || err);
            } else {
                onload(animation);
            }
            // dd.ResRelease.startAutoRelease();
        });
    },

    loadAudio(path, onload) {
        cc.bb.resRelease.stopAutoRelease();
        cc.loader.loadRes(path, cc.AudioClip, (err, audio) => {
            if (err) {
                cc.error(err.message || err);
            } else {
                onload(audio);
            }
            // dd.ResRelease.startAutoRelease();
        });
    },
};

cc.bb.resLoader = module.exports = ResLoader;