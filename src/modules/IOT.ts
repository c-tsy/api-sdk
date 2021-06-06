import { ApiController, ControllerApi } from "..";

import Model from './iot/class/Model'
import Protocol from './iot/class/Protocol'
import Device from "./iot/class/Device";
import { SearchWhere } from "../lib";
import { array_columns, array_key_set } from "@ctsy/common";
import IOTModelConf from "./iot/class/ModelConf";

namespace IOT {
    let prefix = '_iot';
    export interface DriverInfo {
        Name: string;
        Versions: Version[];
    }

    interface Driver {
        Name: string;
        Versions: DriverVersion[];
    }

    interface DriverVersion {
        V: number;
        CTime: string;
        Auther: string;
        Memo: string;
        Commands: DriverCommand[];
        Enums: { [index: string]: any };
    }

    interface DriverCommand {
        Code: number;
        Type: string;
        Name: string;
        Memo: string;
        Rule?: Rule[];
    }

    interface Rule {
        Name: string;
        Code: string;
        Type: string;
        Len: number;
        Memo: string;
        Unit: number;
        ArrayLen: number;
        Config: DriverConfig[];
    }

    interface DriverConfig {
        Name: string;
        Code: string;
        Type: string;
        Len: number;
        Memo: string;
        Unit: number;
        Offset: number;
        ArrayLen: number;
        Map: Map;
    }


    interface Version {
        /**
         * 版本号
         */
        V: number;
        /**
         * 创建时间
         */
        CTime: string;
        /**
         * 作者
         */
        Auther: string;
        /**
         * 备注内容
         */
        Memo: string;
        /**
         * 命令列表
         */
        Commands: any[];
        /**
         * 基础字典数据列表
         */
        Enums: Enums;
    }

    interface Enums {
        /**
         * 设备类型列表
         */
        DeviceType: DeviceType;
    }

    interface DeviceType {
        Name: string;
        Key: Key;
        Map: Map;
    }

    interface Map {
        '00': _00;
        '01': _00;
        '02': _00;
        '03': _00;
        '04': _00;
        '05': _00;
        '06': _00;
        '07': _00;
        '08': _00;
    }

    interface _00 {
        Name: string;
    }

    interface Key {
        Type: string;
    }
    export class Cmd {
        DID: number = 0;
        Code: number = 0;
        Memo: string = '';
        Data: { [index: string]: any } = {};
        MID: number = 0
    }
    export class DeviceReadParams {
        /**
         * 要读取的设备ID的范围
         */
        DIDs: string[] = [];
        IMEIs: string[] = [];
        PID?: number = 0;
        P: number = 0; N: number = 0
    }

    /**
     * 读取数据响应
     */
    export class DeviceReadReturn {
        /**
         * 设备ID号
         */
        DeviceID: string = "";
        /**
         * 数据创建时间
         */
        CTime: Date = new Date;
        /**
         * 数据完成时间
         */
        WTime: Date = new Date;
        /**
         * 状态，1为解码成功
         */
        Status: number = 1;
        /**
         * 数据名称
         */
        Name: string = "";
        /**
         * JSON内容的解码结果
         */
        Data: any = {}
    }
    /**
     * 产品型号管理接口
     */
    class model extends ControllerApi<Model> {
        PK = "MID";

    }
    export const ModelApi = new model('Model', prefix);
    /**
     * 设备统计信息
     */
    export class DeviceCount {
        [index: string]: any;
        /**
         * 设备总数
         */
        Total: number = 0;
        /**
         * 告警数量
         */
        Alert: number = 0
        /**
         * 正常状态设备数
         */
        Status: number = 0;
        /**
         * 注册成功数量
         */
        PStatus4 = 0;
        /**
         * 24小时更新的设备量
         */
        Online24 = 0;
        /**
         * 48小时更新的设备量
         */
        Online48 = 0;
        /**
         * 168小时更新的设备量
         */
        Online168 = 0;
    }
    /**
     * 统计分析中的周期
     */
    export enum StatisticsCycle {
        Day,
        Week,
        Month,
        Quarter,
        Year
    }


    export class CountLog {
        /**
         * 周期
         */
        Cycle: StatisticsCycle = StatisticsCycle.Day

        /**
         * 设备型号
         */
        MID: number = 0;
        /**
         * 统计类型
         */
        Type: string = ""
        /**
         * 统计键
         */
        K: string = ""
        /**
         * 统计值
         */
        V: number = 0;
        /**
         * 统计时间
         */
        CTime: string | Date = ""
        /**
         * 统计的具体天数
         */
        Day: string | Date = ""

        AID: number = 0;
        GID: number = 0;
        Key: number = 0;
    }
    /**
     * 设备管理接口
     */
    class device extends ControllerApi<Device> {
        PK = "DID";
        /**
         * 读取设备实时数据
         * @param d 
         */
        read(d: DeviceReadParams): Promise<{ P: number, N: number, L: DeviceReadReturn[] }> {
            return this._post('read', d)
        }
        /**
         * 读取设备的基础统计信息
         * @param MID 设备型号ID
         */
        count(w: { [index: string]: any }): Promise<DeviceCount> {
            return this._post('count', w)
        }
        /**
         * 日统计数据
         * @param MIDs 设备型号的数组或单个型号
         * @param K 要读取的统计数据的键名称，
         * @param Options 其它的参数
         */
        statistics(MIDs: number | number[], K: string | string[], Options: {
            STime?: Date | string,
            ETime?: Date | string,
            Cycle?: StatisticsCycle,
            GID?: number,
            Key?: string
        } = {}): Promise<CountLog[]> {
            return this._post('statistics', Object.assign(Options, { MIDs, K }))
        }
        /**
         * 读取KV数据
         * @param DIDs 
         */
        kv(DIDs: number[]) {
            return this._post('kv', { DIDs })
        }
        /**
         * 写入设备数据
         */
        writeData(data: { IMEI?: string, DID?: number, HTime?: string, Data: { [index: string]: any }, Kv: { [index: string]: string | number } }[]) {
            return this._post('writeData', data)
        }
        /**
         * 发起查询
         * @param w 
         * @param withData 
         */
        async search(w: SearchWhere, withData: boolean = false) {
            let rs = await super.search(w);
            if (withData && rs.L.length > 0) {
                let DIDs = array_columns(rs.L, 'DID');
                if (DIDs.length > 0) {
                    let datas = await this.read(<any>{
                        DIDs, P: 1, N: DIDs.length, IMEIs: []
                    })
                    let map = array_key_set(datas.L, 'DID');
                    for (let x of rs.L) {
                        x.Data = map[x.DID] ? map[x.DID].Current : {}
                        x.$Data = map[x.DID] || {}
                    }
                }
            }
            return rs;
        }
        /**
         * 删除一个
         * 
         * @param DID 
         */
        del(DID: number) {
            return this._post('del', { DIDs: [DID] })
        }
        /**
         * 删除设备
         * @param DIDs 
         */
        dels(DIDs: number[]) {
            return this._post('del', { DIDs })
        }
        /**
         * 读取地图数据
         * @param d 
         */
        map(d?: SearchWhere): Promise<{
            DID: number, IMEI: string, ID: string, Name: string, X: number, Y: number, [index: string]: string | number
        }[]> {
            return this._post('map', d);
        }
        /**
         * 保存设备的地理信息
         * @param d 
         */
        saveMap(d: { DID: number, X: number, Y: number }[]) {
            return this._post('map', d);
        }
    }
    export const DeviceApi = new device('Device', prefix);
    class protocol extends ControllerApi<Protocol> {

        /**
         * 读取当前支持的驱动信息
         */
        drivers(): Promise<DriverInfo[]> {
            return this._post('drivers', {})
        }

    }

    export const ProtocolApi = new protocol('Protocol', prefix);
    class cmd extends ControllerApi<any>{

        adds(d: Cmd[]) {
            return this._post('adds', d)
        }
    }
    export const CmdApi = new cmd('Cmd', prefix)


    class platform extends ControllerApi<any>{

    }
    class modelConf extends ControllerApi<IOTModelConf>{

    }
    /**
     * 模型配置
     */
    export const ModelConf = new modelConf('ModelConf', prefix)
    export const PlatformApi = new platform('Platform', prefix);
}

export default IOT;