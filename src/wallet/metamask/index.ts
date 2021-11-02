import Web3 from "web3";

class Metamask {
  public web3: any;
  public wallet: any;
  public account: any;

  constructor() {
    // 初始化
    this.web3 = {};
    this.wallet = {};
    this.account = "";

    // metamask内置提供者
    const Window: any = globalThis;
    const ethereum = Window.ethereum;

    // 有可能被其他提供者覆盖
    this.wallet = ethereum.providers?.[1] || ethereum;
  }

  public async login() {
    try {
      // 授权
      const [account] = await this.wallet.request({
        method: "eth_requestAccounts",
      });

      // 默认账号
      this.account = account;

      // web3实例
      this.web3 = new Web3(this.wallet);

      // 授权过程完毕
    } catch (error: any) {
      throw error;
    }
  }

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
