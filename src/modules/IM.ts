import { ApiController } from '../';
import { ErrorType } from '../lib';

export namespace IM {
    const prefix = "_im";
    export class GroupMemberParams {
        GID: string = '';
        UIDs: string[] = []
    }
    class member extends ApiController {
        prefix = "_im"
        constructor() {
            super('Member', prefix)
        }
        /**
         * 查询我的IM对象
         */
        mine() {
            return this.post('mine', '')
        }
        /**
         * 请求添加好友
         * @param OID 
         * @param Type 
         * @param Text 
         * @param CID 
         * @param Memo 
         */
        req(OID: string, Type: number, Text: string, CID: string, Memo: string) {
            if(Text.toString().length < 1) {
                throw new Error(ErrorType.IM.TEXT_LENGTH_TOO_SHORT)
            }
            if(OID.toString().length == 0) {
                throw new Error(ErrorType.IM.OID_LENGTH_IS_ZERO)
            }
            if(typeof Type == 'number' && Type != 1 && Type != 0) {
                throw new Error(ErrorType.IM.NOT_ACCEPTED_FOR_THE_MOMENT)
            }
            this.post('req', {OID, Type, Text, CID, Memo})
        }
        /**
         * 通过申请
         * @param RID 申请编号，发起申请后获得
         * @param Data 根据不同申请类型传参
         * 添加好友请求需要MGID、Memo、好友分组编号和好友备注名称
         * 加群申请通过时不需要这个参数
         */
        pass(RID: number, Data: any) {
            this.post('pass',{RID, Data})
        }
        /**
         * 拒绝申请
         * @param RID 申请编号
         * @param Text 拒绝备注
         */
        deny(RID: number, Text: string) {
            this.post('deny',{RID, Text})
        }
        /**
         * 申请查询
         * @param P 页码
         * @param N 每页数量
         * @param Status 审核状体
         */
        reqs(P: number, N: number, Status: number) {
            if(N > 1000) {
                throw new Error(ErrorType.IM.PAGINATION_CANNOT_EXCEED_1000)
            }
            this.post('reqs',{P, N, Status})
        }
        /**
         * 删除好友
         * @param UID 
         */
        del(UID: string) {
            this.post('del',{ UID })
        }
        /**
         * 添加好友分组
         * @param Name 
         * @param Sort 
         */
        addGroup(Name: string, Sort: number) {
            this.post('addGroup', {Name, Sort})
        }
        /**
         * 删除好友分组
         * @param GID 
         */
        delGroup(GID: number) {
            this.post('delGroup', {GID})
        }
        /**
         * 用户分组
         * @param data 
         */
        group(data: GroupMemberParams) {
            if(data.GID.toString().length == 0) {
                throw new Error(ErrorType.IM.GID_LENGTH_IS_ZERO)
            }
            if(data.UIDs.length == 0) {
                throw new Error(ErrorType.IM.UIDS_LENGTH_IS_ZERO)
            }
            this.post('group', { data })
        }
    }
    export const Member = new member();
    export class Msg extends ApiController {
        // prefix = "_im"
        constructor() {
            super('Msg', prefix)
        }
        /**
         * 发送消息
         * @param To 
         * @param Text 
         * @param Opt 
         */
        send(To: string, Text: string, Opt: {
            CType?: string,
            Device?: string,
            Addr?: string,
            Ats?: string[],
            Files?: string[]
        } = {}) {
            // if(Opt.Files)
            return this.post('send', Object.assign(Opt, { To, Text }))
        }
        /**
         * 读取消息
         * @param P 
         * @param N 
         * @param UID 
         */
        read(P: number = 1, N: number = 10, UIDs: string[] = []) {
            return this.post('read', { P, N, UIDs })
        }
    }
}