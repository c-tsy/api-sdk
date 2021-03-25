import { namespace } from "store";
import { ControllerApi } from "..";
import WalletClassCurrency from "./wallet/class/Currency";

namespace Wallet {
    let prefix = '_wallet';
    /**
     * 货币操作接口
     */
    class Currency extends ControllerApi<WalletClassCurrency>{
        PK = 'CID';
    }
    export const CurrencyApi = new Currency('Currency', prefix)

    // class Exchange extends ControllerApi<Wall
}

export default Wallet;