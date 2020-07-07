import { ApiController, ControllerApi } from "..";

import Model from './iot/class/Model'
import Protocol from './iot/class/Protocol'
import Device from "./iot/class/Device";

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
    interface Cmd {
        DID: number;
        Code: number;
        Memo: string;
        Data: any;
        MID: number
    }
    /**
     * 产品型号管理接口
     */
    class model extends ControllerApi<Model> {
        PK = "MID";

    }
    export const ModelApi = new model('Model', prefix);
    /**
     * 设备管理接口
     */
    class device extends ControllerApi<Device> {
        PK = "DID";

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
            return this._post('Cmd', d)
        }
    }
    export const Cmd = new cmd('Cmd', prefix)
}

export default IOT;