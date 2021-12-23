import { providers } from "ethers";
class Metamask {
    constructor() {
        // 初始化
        this.signer = {};
        this.wallet = {};
        this.account = "";
        // metamask内置提供者
        const Window = globalThis;
        const ethereum = Window.ethereum;
        // 有可能被其他提供者覆盖
        this.wallet = ethereum.providers?.[1] || ethereum;
    }
    // 钱包执行账号登录
    async login() {
        try {
            // 授权
            const [account] = await this.wallet.request({
                method: "eth_requestAccounts",
            });
            // 默认账号
            this.account = account;
            // signer实例
            const provider = new providers.Web3Provider(this.wallet);
            this.signer = provider.getSigner();
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
    onAccountsChanged(callBack) {
        this.wallet.on("accountsChanged", ([account]) => callBack(account));
    }
    // 钱包监听网络变化
    onChainChanged(callBack) {
        this.wallet.on("chainChanged", callBack);
    }
}
export default Metamask;
