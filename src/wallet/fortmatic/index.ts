import { providers } from "ethers";
import FortmaticProvider from "fortmatic";

class Fortmatic {
  public signer: any;
  public wallet: any;
  public account: any;

  constructor({ apiKey, network }: any) {
    // 初始化
    this.signer = {};
    this.wallet = {};
    this.account = "";

    // 初始化钱包
    this.wallet = new FortmaticProvider(apiKey, network);
  }

  // 钱包执行账号登录
  public async login() {
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
    } catch (error: any) {
      throw error;
    }
  }

  // 钱包执行账号退出
  public async logout() {
    return await this.wallet.user.logout();
  }

  // 钱包监听账号变化
  public onAccountsChanged(callBack: Function) {}

  // 钱包监听网络变化
  public onChainChanged(callBack: Function) {}
}

export default Fortmatic;
