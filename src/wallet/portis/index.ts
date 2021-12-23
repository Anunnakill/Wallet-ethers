import { providers } from "ethers";
import PortisProvider from "@portis/web3";

class Portis {
  public signer: any;
  public wallet: any;
  public account: any;

  constructor({ dappId, network, config = {} }: any) {
    // 初始化
    this.signer = {};
    this.wallet = {};
    this.account = "";

    // 初始化钱包
    this.wallet = new PortisProvider(dappId, network, config);
  }

  // 钱包执行账号登录
  public async login() {
    try {
      // 授权
      await this.wallet.provider.enable();

      // signer实例
      this.signer = new providers.Web3Provider(this.wallet.provider);

      // 默认账号
      const account = await this.signer.getAddress();
      this.account = account;

      // 授权过程完毕
      return true;
    } catch (error: any) {
      throw error;
    }
  }

  // 钱包执行账号退出
  public async logout() {
    return await this.wallet.logout();
  }

  // 钱包监听账号变化
  public onAccountsChanged(callBack: Function) {
    this.wallet.onActiveWalletChanged(callBack);
  }

  // 钱包监听网络变化
  public onChainChanged(callBack: Function) {}
}

export default Portis;
