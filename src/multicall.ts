import Caver, { AbiItem, Contract } from "caver-js";
import multicallAbi from '../abi/multicall.abi.json'
import { MULTICALL_ADDRESS } from "./config";
import { Method } from "./interface/method.interface";
import { ConstructorArgs } from "./interface/multicall-constructor.interface";

  
export class Multicall {
    caver: Caver;
    multicall: Contract;

    constructor({ network, provider }: ConstructorArgs) {
        const _multicallAddress = MULTICALL_ADDRESS[network];
        
        this.caver = new Caver(provider);
        this.multicall = this.caver.contract.create(
            multicallAbi as AbiItem[],
            _multicallAddress
        );
    }

    async aggregate(calls: Method[], parameters = {}) {
        const callRequests = calls.map((call) => {
            const callData = call.encodeABI();
            return {
                target: call._parent._address,
                callData,
            };
        });
    
        const { returnData } = await this.multicall.methods
          .aggregate(callRequests)
          .call(parameters);
    
        return returnData.map((hex: string, index: number) => {
            const types = calls[index]._method.outputs.map((o: any) =>
                o.internalType !== o.type && o.internalType !== undefined ? o : o.type
            );
        
            let result = this.caver.abi.decodeParameters(types, hex);
        
            // @ts-ignore
            delete result.__length__;

            const values = Object.values(result);
            return values.length === 1 ? values[0] : values;
        });
      }
    
    async getKlayBalance(address: string) {
        return this.multicall.methods.getKlayBalance(address);
    }
    
    async getBlockHash(blockNumber: string | number) {
        return this.multicall.methods.getBlockHash(blockNumber);
    }
    
    async getLastBlockHash() {
        return this.multicall.methods.getLastBlockHash();
    }
    
    async getCurrentBlockTimestamp() {
        return this.multicall.methods.getCurrentBlockTimestamp();
    }
    
    async getCurrentBlockDifficulty() {
        return this.multicall.methods.getCurrentBlockDifficulty();
    }
    
    async getCurrentBlockGasLimit() {
        return this.multicall.methods.getCurrentBlockGasLimit();
    }
    
    async getCurrentBlockCoinbase() {
        return this.multicall.methods.getCurrentBlockCoinbase();
    }
}