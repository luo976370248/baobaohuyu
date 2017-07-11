const HTTP = {
    sessionId: 0,
    userId: 0,
    master_url:URL,
    url: 'http://127.0.0.1:5000',

    /**
     * 发送 http 请求
     * @param {*} path 路由名字
     * @param {*} data json 数据格式
     * @param {*} handler 监听的消息名字 
     * @param {*} extraUrl 请求地址
     */
    sendReq(path, data, eventName, extraUrl) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        
        var str = "";
        if (data) {
            str = "?";
            for(var k in data){
                if(str != "?"){
                    str += "&";
                }
                str += k + "=" + data[k];
            }
        }
        


        if(extraUrl == null){
            extraUrl = HTTP.url;
        }
        var requestURL = extraUrl + path + encodeURI(str);
        console.log("RequestURL:" + requestURL);
        xhr.open("GET",requestURL, true);

        if (cc.sys.isNative){
            xhr.setRequestHeader("Accept-Encoding","gzip,deflate","text/html;charset=UTF-8");
        }

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                console.log("http res("+ xhr.responseText.length + "):" + xhr.responseText);
                try {
                    var ret = JSON.parse(xhr.responseText);
                    cc.bb.user.eventEM.notifyEvent(eventName, ret);
                } catch (e) {
                    console.log("err:" + e);
                }
            }
        };
            
        xhr.send();
        return xhr;
    }
};

cc.bb.http = HTTP;