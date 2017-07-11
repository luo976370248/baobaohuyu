cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {

    },

    init_ui(data) {
        this.node.getChildByName('name').getComponent(cc.Label).string = data.name;
        this.node.getChildByName('ticket').getComponent(cc.Label).string = data.price;
        this.node.getChildByName('glod').getComponent(cc.Label).string = data.price;
        // this.node.getChildByName('').getComponent(cc.Label).string = 
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
