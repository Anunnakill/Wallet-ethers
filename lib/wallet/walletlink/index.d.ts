interface Options {
    appName: string;
    darkMode: boolean;
    appLogoUrl: string;
    network: "mainnet" | "ropsten";
}
declare class Walletlink {
    signer: any;
    wallet: any;
    account: any;
    constructor({ appName, darkMode, appLogoUrl, network }: Options);
    login(): Promise<boolean>;
    logout(): Promise<any>;
    onAccountsChanged(callBack: Function): void;
    onChainChanged(callBack: Function): void;
}
export default Walletlink;
