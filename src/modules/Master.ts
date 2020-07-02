import { namespace } from "store";
import { ControllerApi, ApiController } from "..";
import MasterClassFamily from "./master/class/Family";
import MasterClassBillingGroup from "./master/class/BillingGroup";
import MasterClassBillingGroupRule from "./master/class/BillingGroupRule";
import { LinkType } from "../lib";

namespace Master {
    let prefix = '_master';
    export class MoveParam {
        /**
         * 户号
         */
        FID: number = 0;
        /**
         * 设备号
         */
        DID: number = 0;
    }
    /**
     * 户的基础操作
     * 开户时自动创建账户，
     */
    class Family extends ControllerApi<MasterClassFamily> {
        PK = 'FID';
        /**
         * 过户
         * 将某个表从某个户上卸载掉，然后挂载到其它户上，需要服务器算法处理
         */
        move(From: MoveParam, To: MoveParam): Promise<boolean> {
            return this._post('move', { From, To });
        }
        /**
         * 缴费,实际调用钱包模块
         * @param FID 
         * @param Money 
         * @param Memo 
         * @param Type 
         */
        pay(FID: number, Money: number, Memo: string, Type: string): Promise<boolean> {
            return this._post('pay', { FID, Money, Memo, Type });
        }

    }
    export const FamilyApi = new Family('Family', prefix)


    /**
     * 计费组的管理操作接口
     */
    class BillingGroup extends ControllerApi<MasterClassBillingGroup>{
        PK = 'BGID'
        /**
         * 计费组的关联处理
         * @param RGID 
         * @param Rules 
         * @param Type 
         */
        rule(RGID: number, Rules: MasterClassBillingGroupRule[], Type: LinkType) {
            return this._post('rule', { RGID, Rules, Type });
        }
    }
    export const BillingGroupApi = new BillingGroup('BillingGroup', prefix)


}

export default Master;