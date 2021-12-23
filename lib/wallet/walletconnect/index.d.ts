declare class Walletconnect {
    signer: any;
    wallet: any;
    account: any;
    constructor({ rpc }?: any);
    login(): Promise<boolean>;
    logout(): Promise<any>;
    onAccountsChanged(callBack: Function): void;
    onChainChanged(callBack: Function): void;
}
export default Walletconnect;
