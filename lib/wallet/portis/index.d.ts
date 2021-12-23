declare class Portis {
    signer: any;
    wallet: any;
    account: any;
    constructor({ dappId, network, config }: any);
    login(): Promise<boolean>;
    logout(): Promise<any>;
    onAccountsChanged(callBack: Function): void;
    onChainChanged(callBack: Function): void;
}
export default Portis;
