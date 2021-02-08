import { namespace } from "store";
import { ControllerApi, ApiController } from "..";
import MasterClassFamily from "./master/class/Family";
import MasterClassBillingGroup from "./master/class/BillingGroup";
import MasterClassBillingGroupRule from "./master/class/BillingGroupRule";
import { LinkType, SearchWhere, SearchResult } from "../lib";
import MasterClassFamilyLog from "./master/class/FamilyLog";

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
    export class FamilyCount {
        /**
         * 总户数
         */
        Total = 0;
        /**
         * 重点户数
         */
        Warn = 0
        /**
         * 已绑定设备户数
         */
        Binded = 0
        /**
         * 欠费户数
         */
        NBanance = 0
        /**
         * 预付费户数
         */
        PrePay = 0
        /**
         * 已设置计费方案数
         */
        BGID = 0
        /**
         * 状态分布数
         */
        Status: { Status: number, Amount: number }[] = []
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
         * 基础数据统计
         * @param d 
         */
        count(d: { MID?: number, GID?: number, Key?: string }): Promise<FamilyCount> {
            return this._post('count', d)
        }
        /**
         * 缴费
         * @param FID 
         * @param Money 金额
         * @param After 缴费后余额，用于做服务端验证
         * @param Times 本次缴费是第几次缴费，用于做服务端验证
         * @param Memo 备注
         * @param Type 缴费类型
         */
        charge(FID: number, Money: number, After: number, Times: number, Memo: string, OTime: string, DTime: string, STime: string, ETime: string, Type?: string): Promise<boolean> {
            return this._post('charge', { FID, STime, ETime, DTime, OTime, After, Times, Money, Memo, Type });
        }
        /**
         * 查询户的操作记录，其中Type=charge表示是充值记录
         * @param where 
         */
        log(where: SearchWhere): Promise<SearchResult<MasterClassFamilyLog>> {
            return this._post('log', where);
        }
        /**
         * 读取区域树
         */
        async areaTree(conf: { GID?: number } = {}): Promise<{ Name: string, ID: number, PID: number }[]> {
            return this._post('areaTree', conf);
        }
        /**
         * 搜索
         * @param w 
         */
        async search(w: SearchWhere) {
            let rs = await super.search(w);
            return rs;
        }

    }
    export const FamilyApi = new Family('Family', prefix)

    class FamilyLog extends ControllerApi<MasterClassFamilyLog>{
        PK: string = 'FLID'
    }
    export const FamilyLogApi = new FamilyLog('FamilyLog', prefix);
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
    /**
     * 规则对象
     */
    class BillingGroupRule extends ControllerApi<MasterClassBillingGroupRule>{
        PK = 'BGRID'
    }

    export const BillingGroupRuleApi = new BillingGroupRule('BillingGroupRule', prefix)


}

export default Master;