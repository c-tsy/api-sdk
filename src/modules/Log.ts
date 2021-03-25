import { SearchWhere } from "../lib";
import { ApiController } from "..";

namespace Log {
    const prefix = "_log";

    export class ClassEventLog {
        /**
         * 模块
         */
        Module: string = ""
        /**
         * 谁
         */
        Name: string = ""
        /**
         * 用户编号
         */
        UID: number = 0;
        /**
         * 地点
         */
        Addr: string = "";
        /**
         * GPS坐标存储
         */
        GPS: string = ""
        /**
         * IP地址
         */
        IP: string = "";
        /**
         * 设备
         */
        Device: string = "";
        /**
         * 干什么
         */
        What: string = "";
        /**
         * 什么时间
         */
        When: string = "";
        /**
         * 分组键
         */
        Key: string = "";
        /**
         * 应用编号
         */
        AID: number = 0;
        /**
         * 分组号
         */
        GID: number = 0;
        /**
         * 时间
         */
        Time: number = Date.now() / 1000;
        /**
         * 数据,JSON格式
         */
        Data: any = "";
        /**
         * 结论
         */
        Result: any = "";
        /**
         * 操作结论
         */
        Code: number = 200;

    }

    export class LogSearchWhere extends SearchWhere {
        Fields: string[] = [];
        Date: [Date | string, Date | string] = [new Date, new Date]
    }

    class log extends ApiController {

        write(Logs: ClassEventLog[]) {
            return this._post('write', { Logs })
        }

        search(w: LogSearchWhere) {
            return this._post('search', w);
        }
    }
    export const LogApi = new log('Log', prefix)
}

export default Log