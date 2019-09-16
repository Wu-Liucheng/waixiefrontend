import 'js-md5';
export const DOMAIN_NAME = 'http://localhost:8080';
// export const DOMAIN_NAME = '';
export const KEY = "wuliucheng";
const md5 = require('js-md5');
export const ciphertext = ()=>{
    let timestamp = (new Date()).valueOf();
    let hash = md5.hex(timestamp+KEY);
    return {"key":timestamp,"value":hash};
};