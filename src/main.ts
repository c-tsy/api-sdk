import * as index from './index'

import User from './modules/User'
//@ts-ignore
index['/dist/modules/User'] = { default: User };

module.exports = index;
//@ts-ignore
globalThis.CTsyApiSDK = index