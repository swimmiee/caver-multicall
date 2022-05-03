import { RequestProvider } from "caver-js";
import { NetworkType } from "../config";

export interface ConstructorArgs {
    network: NetworkType
    provider: RequestProvider;
}