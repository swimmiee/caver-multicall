
export type NetworkType = 'baobab' | 'cypress'
export const MULTICALL_ADDRESS:{[key in NetworkType]: string} = {
    baobab: "0xFe525518d31687dAf6a12E2f647260aFA02980e3",
    cypress: "0xF34Bf6b8e211AecB352DB705eeA6D043494027C8"
}