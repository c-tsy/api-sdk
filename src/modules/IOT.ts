import { ApiController, ControllerApi } from "..";

import Model from './iot/class/Model'

namespace IOT {
    let prefix = '_iot';
    interface DriverInfo {
        Name: string;
        Versions: Version[];
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

    /**
     * 产品型号管理接口
     */
    class model extends ControllerApi<Model> {

    }
    export const ModelApi = new model('Model', prefix);
    class protocol extends ApiController {
        /**
         * 读取当前支持的驱动信息
         */
        drivers(): Promise<DriverInfo[]> {
            return this._post('drivers', {})
        }

    }

    export const ProtocolApi = new protocol('Protocol', prefix);
}

export default IOT;