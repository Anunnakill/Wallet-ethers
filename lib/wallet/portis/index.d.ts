declare class Portis {
    web3: any;
    wallet: any;
    account: any;
    constructor(network?: string);
    login(): Promise<void>;
    logout(): Promise<void>;
    onAccountsChanged(callBack: Function): void;
    onChainChanged(callBack: Function): void;
}
export default Portis;