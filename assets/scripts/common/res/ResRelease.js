const TimeTake = {
    startTimes: {},

    start(tag) {
        this.startTimes.tag = new Date().getMilliseconds();
    },

    end(tag) {
        // cc.bb.log.log(`${tag} 耗时 ${(new Date().getMilliseconds() - this.startTimes.tag) / 1000.0}`);
    },
}

const ResRelease = {
    intervalId: null,
    interval: 3,
    releaseTextures: {},


    startAutoForceRelease() {
        this.stopAutoRelease();
        this.releaseForce();
    },

    releaseForce() {
        this.releaseTextures = {};
        let texturesInCache =  cc.bb._.filter(cc.loader._cache, (asset) => {
                return true;
        });
        texturesInCache.forEach((texture) => {
            this.releaseTextures[texture.url] = texture.url;
        });

        this._keepNodeTexture(cc.director.getScene());
        
        for (let texture in this.releaseTextures) {
            cc.loader.release(texture);
        }
    },

    startAutoRelease() {
        this.stopAutoRelease();
        this.intervalId = setInterval(this.release.bind(this), this.interval * 1000);
    },

    stopAutoRelease() {
        if (!cc.bb._.isNull(this.intervalId)) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    },

    release() {
        TimeTake.start('内存释放开始');
        cc.sys.garbageCollect();
        this.releaseTextures = {};
        let texturesInCache = cc.bb._.filter(cc.loader._cache, (asset) => {
            if (asset.content) {
                if (asset.content.isReleaseRes) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        });

        texturesInCache.forEach((texture) => {
            this.releaseTextures[texture.url] = texture.url;
        });

        this._keepNodeTexture(cc.director.getScene());

        for (let texture in this.releaseTextures) {
            cc.loader.release(texture);
        }
       TimeTake.end('内存释放结束');  
    },

    _keepNodeTexture(node) {
        if (!(node instanceof cc.Scene)) {
            this._executeKeep(node);            
        }        
        let children = node._children;      
        children.forEach((child) => {
            this._executeKeep(child);     
            this._keepNodeTexture(child);
        });     
    },

    _executeKeep(node) {
        let sprite = node.getComponent(cc.Sprite);
        if (sprite && sprite.spriteFrame) {
            delete this.releaseTextures[sprite.spriteFrame._textureFilename];
        }

        let  button = node.getComponent(cc.Button);
        if (button) {
            if (button.normalSprite) {
                delete this.releaseTextures[button.normalSprite._textureFilename];
            }

            if (button.pressedSprite) {
                delete this.releaseTextures[button.pressedSprite._textureFilename];
            }

            if (button.hoverSprite) {
                delete this.releaseTextures[button.hoverSprite._textureFilename];
            }

            if (button.disabledSprite) {
                delete this.releaseTextures[button.disabledSprite._textureFilename];
            }
        }

        let label = node.getComponent(cc.Label);
        if (label && label.font && label.font instanceof cc.BitmapFont && label.font.spriteFrame) {
             delete this.releaseTextures[label.font.spriteFrame._textureFilename];
        }

        let richText = node.getComponent(cc.RichText);
        if (richText && richText.imageAtlas) {
            let keys = Object.keys(richText.imageAtlas._spriteFrames);
            if (keys.length > 0) {
                delete this.releaseTextures[richText.imageAtlas._spriteFrames[keys[0]]._textureFilename];
            }
        } 

        let particleSystem = node.getComponent(cc.ParticleSystem);
        if (particleSystem && particleSystem._texture) {
            delete this.releaseTextures[particleSystem._texture];
        }

        let pageViewIndicator = node.getComponent(cc.PageViewIndicator);
        if (pageViewIndicator && pageViewIndicator.spriteFrame) {
            delete this.releaseTextures[pageViewIndicator.spriteFrame._textureFilename];
        }  

        let editBox = node.getComponent(cc.EditBox);
        if (editBox && editBox.backgroundImage) {
            delete this.releaseTextures[editBox.backgroundImage._textureFilename];
        }

        let mask = node.getComponent(cc.Mask);
        if (mask && mask.spriteFrame) {
            delete this.releaseTextures[mask.spriteFrame._textureFilename];
        }  
    },

    releaseResDir(path, func) {
        for (let key in cc.loader.staticRes) {
            cc.loader.staticRes[key] = null;
        }

        for (let key in cc.loader.staticRes) {
            delete cc.loader.staticRes[key];
        }
    
        cc.loader.staticRes = null;
    },
};

cc.bb.resRelease = module.exports = ResRelease;