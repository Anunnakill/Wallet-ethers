import { providers } from "ethers";

class Metamask {
  public signer: any;
  public wallet: any;
  public account: any;

  constructor() {
    // 初始化
    this.signer = {};
    this.wallet = {};
    this.account = "";

    // metamask内置提供者
    const Window: any = globalThis;
    const ethereum = Window.ethereum;

    // 有可能被其他提供者覆盖
    this.wallet = ethereum.providers?.[1] || ethereum;
  }

  // 钱包执行账号登录
  public async login() {
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
    } catch (error: any) {
      throw error;
    }
  }

  // 钱包执行账号退出
  public async logout() {}

  // 钱包监听账号变化
  public onAccountsChanged(callBack: Function) {
    this.wallet.on("accountsChanged", ([account]: string[]) =>
      callBack(account),
    );
  }

  // 钱包监听网络变化
  public onChainChanged(callBack: Function) {
    this.wallet.on("chainChanged", callBack);
  }
}

export default Metamask;
