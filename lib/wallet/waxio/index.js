import * as waxjs from "@waxio/waxjs/dist";
class Waxio {
    constructor({ pubKeys, rpcEndpoint, userAccount, tryAutoLogin = true, }) {
        // 初始化
        this.signer = {};
        this.wallet = {};
        this.account = "";
        // 初始化钱包
        this.wallet = new waxjs.WaxJS({
            pubKeys,
            rpcEndpoint,
            userAccount,
            tryAutoLogin,
        });
    }
    // 钱包执行账号登录
    async login() {
        try {
            // 授权
            const account = await this.wallet.login();
            // 默认账号
            this.account = account;
            // 授权过程完毕
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    // 钱包执行账号退出
    async logout() { }
    // 钱包监听账号变化
    onAccountsChanged(callBack) { }
    // 钱包监听网络变化
    onChainChanged(callBack) { }
}
export default Waxio;
