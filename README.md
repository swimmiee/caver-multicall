# caver-multicall
Multicall library for caver-js  
[View at NPM](https://www.npmjs.com/package/caver-multicall)

# Installation
```
npm install caver-multicall
yarn add caver-multicall
```

# Usage
```ts
import Multicall from 'caver-multicall'

// baobab
const multicall_baobab = new Multicall({
    network: 'baobab',
    provider: 'https://api.baobab.klaytn.net:8651/'
})

// cypress
const multicall_cypress = new Multicall({
    network: 'cypress',
    provider: 'https://public-node-api.klaytnapi.com/v1/cypress'
})
```

# Aggregate
```ts
import Multicall from 'caver-multicall'
import ERC20Abi from 'abi/ERC20Abi.json'

const provider = new Caver.providers.HttpProvider('https://public-node-api.klaytnapi.com/v1/cypress')
const tokenAddress = '0x5fff3a6c16c2208103f318f4713d4d90601a7313'
const multicall = new Multicall({
    network: 'cypress',
    provider
})

const ERC20Contract = caver.contract.create(ERC20Abi, tokenAddress)

const token_info = multicall.aggregate([
    ERC20Contract.methods.name(),
    ERC20Contract.methods.symbol(),
    ERC20Contract.methods.decimals()
]).then(console.log)
// [ 'Kleva Token', 'KLEVA', '18' ]

```
