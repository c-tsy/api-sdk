import { ApiController, ApiCommon, ControllerApi } from '../index';
import { ErrorType } from '../lib';
namespace AreaApi {
    const prefix = '_area'
    export class Area {
        Name: string = "";
        Code: number = 0;
    }
    export class Community {

        /**
         * 小区编号
         * 
         */
        public CID: number = 0;
        /**
         * 行政代码
         * 
         */
        public Code: number = 0;
        /**
         * 地址
         * 
         */
        public Addr: string = "";
        /**
         * 名称
         * 
         */
        public Title: string = "";
        /**
         * 竣工时间
         * 
         */
        public FTime: Date = new Date;
        /**
         * 负责人
         * 
         */
        public Name: string = "";
        /**
         * 创建时间
         * 
         */
        public CTime: Date = new Date;
        /**
         * 创建人
         * 
         */
        public CUID: number = 0;
    }
    export class Building {

        /**
         * 楼栋编号
         * 
         */
        public BID: number = 0;
        /**
         * 小区编号
         * 
         */
        public CID: number = 0;
        /**
         * 楼栋号
         * 
         */
        public BNo: string = '';
        /**
         * 单元数
         * 
         */
        public UnitAmount: number = 1;
        /**
         * 电梯数
         * 
         */
        public LiftAmount: number = 0;
        /**
         * 每层户数
         * 
         */
        public HouseAmount: number = 1;
        /**
         * 创建时间
         * 
         */
        public CTime: Date = new Date;
        /**
         * 创建人
         * 
         */
        public CUID: number = 0;
    }
    class area extends ApiController {
        read(PCode: number): Promise<{ Level: number, Rows: Area[] }> {
            return this.post('read', { PCode });
        }
        save(Code: number, Name: number, Level: number): Promise<boolean> {
            return this.post('save', { Code, Name, Level })
        }
    }
    /**
     * 区域接口
     */
    export const AreaApi = new area('Area', prefix)
    class building extends ControllerApi {

    }
    export const BuildingApi = new building('Building', prefix)
    class community extends ControllerApi {

    }
    export const CommunityApi = new community('Building', prefix)
}
export default AreaApi;