declare class Sollet {
    web3: any;
    wallet: any;
    account: any;
    constructor({ provider, network }: any);
    login(): Promise<boolean>;
    logout(): Promise<any>;
    onAccountsChanged(callBack: Function): void;
    onChainChanged(callBack: Function): void;
}
export default Sollet;
