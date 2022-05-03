import { Contract } from "caver-js";
import { MethodCallOptions } from "./method-options.interface";
export interface Method<T> {
    call: (options: MethodCallOptions, callback?: (result: T) => void) => T;
    encodeABI: () => string;
    _parent: Contract;
    _method: {
        inputs: any[];
        name: string;
        outputs: any[];
        signature: string;
        stateMutability: string;
        type: string;
    };
}
