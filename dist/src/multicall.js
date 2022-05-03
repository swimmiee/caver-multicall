"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multicall = void 0;
const caver_js_1 = __importDefault(require("caver-js"));
const multicall_abi_json_1 = __importDefault(require("../abi/multicall.abi.json"));
const config_1 = require("./config");
class Multicall {
    constructor({ network, provider }) {
        const _multicallAddress = config_1.MULTICALL_ADDRESS[network];
        this.caver = new caver_js_1.default(provider);
        this.multicall = this.caver.contract.create(multicall_abi_json_1.default, _multicallAddress);
    }
    aggregate(calls, parameters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const callRequests = calls.map((call) => {
                const callData = call.encodeABI();
                return {
                    target: call._parent._address,
                    callData,
                };
            });
            const { returnData } = yield this.multicall.methods
                .aggregate(callRequests)
                .call(parameters);
            return returnData.map((hex, index) => {
                const types = calls[index]._method.outputs.map((o) => o.internalType !== o.type && o.internalType !== undefined ? o : o.type);
                let result = this.caver.abi.decodeParameters(types, hex);
                // @ts-ignore
                delete result.__length__;
                const values = Object.values(result);
                return values.length === 1 ? values[0] : values;
            });
        });
    }
    getKlayBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.multicall.methods.getKlayBalance(address);
        });
    }
    getBlockHash(blockNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.multicall.methods.getBlockHash(blockNumber);
        });
    }
    getLastBlockHash() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.multicall.methods.getLastBlockHash();
        });
    }
    getCurrentBlockTimestamp() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.multicall.methods.getCurrentBlockTimestamp();
        });
    }
    getCurrentBlockDifficulty() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.multicall.methods.getCurrentBlockDifficulty();
        });
    }
    getCurrentBlockGasLimit() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.multicall.methods.getCurrentBlockGasLimit();
        });
    }
    getCurrentBlockCoinbase() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.multicall.methods.getCurrentBlockCoinbase();
        });
    }
}
exports.Multicall = Multicall;
