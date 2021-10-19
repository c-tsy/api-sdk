import { namespace } from "store";
import { ControllerApi } from "..";
import WalletClassCurrency from "./wallet/class/Currency";

namespace Wallet {
    let prefix = '_wallet';
    /**
     * 货币操作接口
     */
    export class Currency extends ControllerApi<WalletClassCurrency>{
        PK = 'CID';
        constructor(token = "") {
            super('Currency', prefix, token)
        }
    }
    export const CurrencyApi = new Currency()

    // class Exchange extends ControllerApi<Wall
}

export default Wallet;