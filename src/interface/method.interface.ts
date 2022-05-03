import { Contract } from "caver-js"
import { MethodCallOptions } from "./method-options.interface"

export interface Method {
    call:(options:MethodCallOptions, callback?:(result:any) => void) => any
    encodeABI: () => string
    _parent: Contract
    _method: {
        inputs: any[]
        name: string
        outputs: any[]
        signature: string
        stateMutability: string
        type: string
    }
}