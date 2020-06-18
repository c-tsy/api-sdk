import { namespace } from "store";
import { ApiController } from "..";

namespace IOT {
    let prefix = '_iot';
    interface DriverInfo {
        Name: string;
        Versions: Version[];
    }

    interface Version {
        V: number;
        CTime: string;
        Auther: string;
        Memo: string;
        Commands: any[];
        Enums: Enums;
    }

    interface Enums {
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