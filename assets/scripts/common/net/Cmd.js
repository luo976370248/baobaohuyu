var Cmd = {
	// 全局的命令号，当我们的用户丢失链接的时候，
	// 所有的服务都会收到网关转发过来的这个时间这个消息
	USER_DISCONNECT: 10000, 

	Auth: {
		GUEST_LOGIN: 1, // 游客登陆
		RELOGIN: 2, // 重写登录
	},
	
};

cc.bb.cmd = module.exports = Cmd;