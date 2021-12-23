import * as Web3 from "@solana/web3.js";
import solWalletAdapter from "@project-serum/sol-wallet-adapter";
class Sollet {
    constructor({ provider, network = "devnet" }) {
        // 初始化
        this.signer = {};
        this.wallet = {};
        this.account = "";
        // 钱包功能提供者
        const Window = globalThis;
        const _provider = provider || Window?.sollet;
        const _network = Web3.clusterApiUrl(network, true);
        this.wallet = new solWalletAdapter(_provider, _network);
    }
    // 钱包执行账号登录
    async login() {
        try {
            // 授权
            await this.wallet.connect();
            // 默认账号
            this.account = this.wallet.publicKey?.toBase58();
            // signer实例
            this.signer = Web3;
            // 授权过程完毕
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    // 钱包执行账号退出
    async logout() {
        return await this.wallet.disconnect();
    }
    // 钱包监听账号变化
    onAccountsChanged(callBack) { }
    // 钱包监听网络变化
    onChainChanged(callBack) { }
}
export default Sollet;
