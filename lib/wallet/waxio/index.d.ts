declare class Waxio {
    signer: any;
    wallet: any;
    account: any;
    constructor({ pubKeys, rpcEndpoint, userAccount, tryAutoLogin, }: any);
    login(): Promise<boolean>;
    logout(): Promise<void>;
    onAccountsChanged(callBack: Function): void;
    onChainChanged(callBack: Function): void;
}
export default Waxio;
