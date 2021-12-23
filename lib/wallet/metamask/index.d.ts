declare class Metamask {
    signer: any;
    wallet: any;
    account: any;
    constructor();
    login(): Promise<boolean>;
    logout(): Promise<void>;
    onAccountsChanged(callBack: Function): void;
    onChainChanged(callBack: Function): void;
}
export default Metamask;
