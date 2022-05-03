import Caver, { Contract, provider } from "caver-js";
import { NetworkType } from "./config";
import { Method } from "./interface/method.interface";
interface ConstructorArgs {
    network: NetworkType;
    provider: provider;
    multicallAddress?: string;
}
export declare class Multicall {
    caver: Caver;
    multicall: Contract;
    constructor({ network, provider }: ConstructorArgs);
    aggregate<T>(calls: Method<T>[], parameters?: {}): Promise<any>;
    getKlayBalance(address: string): Promise<any>;
    getBlockHash(blockNumber: string | number): Promise<any>;
    getLastBlockHash(): Promise<any>;
    getCurrentBlockTimestamp(): Promise<any>;
    getCurrentBlockDifficulty(): Promise<any>;
    getCurrentBlockGasLimit(): Promise<any>;
    getCurrentBlockCoinbase(): Promise<any>;
}
export {};
