import * as Web3 from "@solana/web3.js";

class Phantom {
  public signer: any;
  public wallet: any;
  public account: any;

  constructor() {
    // 初始化
    this.signer = {};
    this.wallet = {};
    this.account = "";

    // 插件钱包功能提供者
    const Window: any = globalThis;
    this.wallet = Window.phantom?.solana;
  }

  // 钱包执行账号登录
  public async login() {
    try {
      // 授权
      const res = await this.wallet.connect();

      // 默认账号
      this.account = res.publicKey.toString();

      // signer实例
      this.signer = Web3;

      // 授权过程完毕
      return true;
    } catch (error: any) {
      throw error;
    }
  }

  // 钱包执行账号退出
  public async logout() {
    return await this.wallet.disconnect();
  }

  // 钱包监听账号变化
  public onAccountsChanged(callBack: Function) {}

  // 钱包监听网络变化
  public onChainChanged(callBack: Function) {}
}

export default Phantom;
