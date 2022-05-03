import { expect } from 'chai';
import { describe } from 'mocha';
import Multicall from '..'
import ERC20Abi from '../abi/ERC20.abi.min.json'
import Caver, { AbiItem, provider } from 'caver-js';


const tokenAddress = '0x5fff3a6c16c2208103f318f4713d4d90601a7313'
describe('Multicall test with ERC20 token', async() => {
    let provider:provider;
    let multicall:Multicall
    before('Multicall Setup', () => {
        provider = new Caver.providers.HttpProvider('https://public-node-api.klaytnapi.com/v1/cypress')
        multicall = new Multicall({
            network: 'cypress',
            provider
        })
    })

    it('Get ERC20 Token Info', async () => {
        const caver = new Caver(provider)
        const ERC20Contract = new caver.contract(ERC20Abi as AbiItem[], tokenAddress)


        const name = await ERC20Contract.methods.name().call()
        const symbol = await ERC20Contract.methods.symbol().call()
        const decimals = await ERC20Contract.methods.decimals().call()

        const token_info = await multicall.aggregate([
            ERC20Contract.methods.name(),
            ERC20Contract.methods.symbol(),
            ERC20Contract.methods.decimals(),
        ])
        
        expect([name, symbol, decimals]).to.deep.equal(token_info)
    })
})