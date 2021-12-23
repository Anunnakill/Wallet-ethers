import { providers } from "ethers";
import FortmaticProvider from "fortmatic";
class Fortmatic {
    constructor({ apiKey, network }) {
        // 初始化
        this.signer = {};
        this.wallet = {};
        this.account = "";
        // 初始化钱包
        this.wallet = new FortmaticProvider(apiKey, network);
    }
    // 钱包执行账号登录
    async login() {
        try {
            // 授权
            await this.wallet.user.login();
            // signer实例
            const getProvider = this.wallet.getProvider();
            const provider = new providers.Web3Provider(getProvider);
            this.signer = provider.getSigner();
            // 默认账号
            const account = await this.signer.getAddress();
            this.account = account;
            // 授权过程完毕
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    // 钱包执行账号退出
    async logout() {
        return await this.wallet.user.logout();
    }
    // 钱包监听账号变化
    onAccountsChanged(callBack) { }
    // 钱包监听网络变化
    onChainChanged(callBack) { }
}
export default Fortmatic;
