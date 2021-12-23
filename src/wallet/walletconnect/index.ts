import json from "./rpc.json";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

class Walletconnect {
  public signer: any;
  public wallet: any;
  public account: any;

  constructor({ rpc = {} }: any = {}) {
    // 初始化
    this.signer = {};
    this.wallet = {};
    this.account = "";

    // 初始化钱包
    this.wallet = new WalletConnectProvider({
      rpc: {
        ...json,
        ...rpc,
      },
    });
  }

  // 钱包执行账号登录
  public async login() {
    try {
      // 授权
      const [account] = await this.wallet.enable();

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
  public async logout() {
    return await this.wallet.disconnect();
  }

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

export default Walletconnect;
