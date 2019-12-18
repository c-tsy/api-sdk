import { ApiController } from '../index';
namespace Organ {
    export class OrgOrgan {

        /**
         * 单位编号
         * 
         */
        public UnitID?: number = 0;
        /**
         * 名称
         * 
         */
        public Title: string = "";
        /**
         * 助记码
         * 
         */
        public Code: string = "";
        /**
         * 拼音
         * 
         */
        public PY: string = "";
        /**
         * 备注
         * 
         */
        public Memo: string = "";
        /**
         * 图标
         * 
         */
        public Icon: string = "";
        /**
         * 地址
         * 
         */
        public Addr: string = "";
        /**
         * 联系人
         * 
         */
        public Name: string = "";
        /**
         * 联系电话
         * 
         */
        public Tel: string = "";
        /**
         * GPS_X
         * 
         */
        public X: number = 0;
        /**
         * GPS_Y
         * 
         */
        public Y: number = 0;
        /**
         * 排序
         * 
         */
        public Sort: number = 0;
        /**
         * 状态
         * -1禁用1启用
         */
        public Status: number = 1;
        /**
         * 创建人
         * 
         */
        public CUID: number = 0;
        /**
         * 创建时间
         * 
         */
        public CTime: Date = new Date;
        /**
         * 根管理员
         * 
         */
        public AUID: number = 0;
        /**
         * 用户组
         * 
         */
        public UGID: number = 0;
        /**
         * 单位类型
         * 0自己1供应商2客户
         */
        public Type: number = 0;
        /**
         * 父编号
         * 
         */
        public PUnitID: number = 0;
    }
    class organ extends ApiController {
        list(data: { P?: number, N?: number, Sort?: string, Keyword?: string, W?: { [index: string]: any } }) {
            return this.post('list', data);
        }
        adds(data: OrgOrgan[]) {
            if (data.length > 0) {
                return this.post('adds', data);
            }
            throw new Error('Organ Should be array')
        }
        save(UnitIDs: number[], data: any) {
            if (UnitIDs.length > 0) {
                return this.post('save', { UnitIDs, Data: data })
            }
            throw new Error('UnitIDs Should be array')
        }
    }
    export const OrganApi = new organ('Organ', '_org');
}
export default Organ;