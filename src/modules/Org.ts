import { ApiController } from '../index';
import { ErrorType } from '../lib';
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
            throw new Error(ErrorType.Org.ORGAN_SHOULD_BE_ARRAY)
        }
        save(UnitIDs: number[], data: any) {
            if (UnitIDs.length > 0) {
                return this.post('save', { UnitIDs, Data: data })
            }
            throw new Error(ErrorType.Org.UNITIDS_SHOULD_BE_ARRAY)
        }
    }
    export const OrganApi = new organ('Organ', '_org');
    /**
     * 区域操作Api
     */
    class area extends ApiController {
        /**
         * 读取区域列表
         * @param data 
         */
        list(data: { P?: number, N?: number, Sort?: string, Keyword?: string, W?: { [index: string]: any } }) {
            return this.post('list', data);
        }
        /**
         * 批量添加区域信息
         * @param data 
         */
        adds(data: OrgOrgan[]) {
            if (data.length > 0) {
                return this.post('adds', data);
            }
            throw new Error(ErrorType.Org.ORGAN_SHOULD_BE_ARRAY)
        }
        /**
         * 保存区域信息
         * @param UnitIDs 
         * @param data 
         */
        save(UnitIDs: number[], data: any) {
            if (UnitIDs.length > 0) {
                return this.post('save', { UnitIDs, Data: data })
            }
            throw new Error(ErrorType.Org.UNITIDS_SHOULD_BE_ARRAY)
        }
        /**
         * 链接区域和组织单位
         * @param data 
         * @param type 
         */
        link(data: TypeUnitEdit | TypeAreaEdit, type: LinkType) {
            if(data.AID && data.UnitIDs) {
                if(!data.AID || 'number' != typeof data.AID || data.AID <= 0) {
                    throw new Error(ErrorType.Org.AID_PARAMS_IS_ERROR)
                }
                if(!(data.UnitIDs instanceof Array)) {
                    throw new Error(ErrorType.Org.UNITIDS_SHOULD_BE_ARRAY)
                }
                for(let x of data.UnitIDs) {
                    if('number' != typeof x || x<= 0) {
                        throw new Error(ErrorType.Org.UNITID_PARAMS_IS_ERROR)
                    }
                }
            } else if(data.UnitID && data.AIDs) {
                if(!data.UnitID || 'number' != typeof data.UnitID || data.UnitID <= 0){
                    throw new Error(ErrorType.Org.UNITID_PARAMS_IS_ERROR)
                }
                if(!(data.AIDs instanceof Array)) {
                    throw new Error(ErrorType.Org.AIDS_SHOULD_BE_ARRAY)
                }
                for(let x of data.AIDs) {
                    if('number' != typeof x || x <= 0) {
                        throw new Error(ErrorType.Org.AID_PARAMS_IS_ERROR)
                    }
                }
            }
            return this.post('link', Object.assign(data, { Type: type }))
        }
    }
    export enum LinkType {
        Replace,
        Add,
    }
    export interface TypeUnitEdit {
        UnitID: number;
        AIDs: number[];
        AID?: number;
        UnitIDs?: number[]
    }
    export interface TypeAreaEdit {
        UnitIDs: number[];
        AID: number;
        UnitID?: number;
        AIDs?: number[]
    }
    /**
     * 区域操作Api
     */
    export const AreaApi = new area('Area', '_org');
}
export default Organ;