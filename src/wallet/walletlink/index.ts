import config from "./config.json";
import { providers } from "ethers";
import WalletlinkProvider from "walletlink";

interface Options {
  appName: string;
  darkMode: boolean;
  appLogoUrl: string;
  network: "mainnet" | "ropsten";
}

class Walletlink {
  public signer: any;
  public wallet: any;
  public account: any;

  constructor({ appName, darkMode, appLogoUrl, network }: Options) {
    // 初始化
    this.signer = {};
    this.wallet = {};
    this.account = "";

    // 初始化钱包
    const init = new WalletlinkProvider({
      appName,
      darkMode,
      appLogoUrl,
    });

    this.wallet = init.makeWeb3Provider(
      config[network].http,
      config[network].id,
    );
  }

  // 钱包执行账号登录
  public async login() {
    try {
      // 授权
      await this.wallet.enable();

      // signer实例
      const provider = new providers.Web3Provider(this.wallet);
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
    return await this.wallet.close();
  }

  // 钱包监听账号变化
  public onAccountsChanged(callBack: Function) {}

  // 钱包监听网络变化
  public onChainChanged(callBack: Function) {}
}

export default Walletlink;
