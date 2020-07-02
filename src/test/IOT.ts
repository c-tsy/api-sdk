import DeviceClass from '../modules/iot/class/Device'
import IOT from '../modules/IOT';
namespace IOTTest {
    export class Device {
        async adds() {
            let d = new DeviceClass()
            d.MID = 1;
            d.PID = 1;
            d.Name = '测试用';
            d.IMEI = 'IMEI-TEST-0015'
            d.ID = 'SN-02356156489'
            d.Code = ''
            console.log(JSON.stringify([d]))
            // return await IOT.DeviceApi.adds([d]);
        }
    }
}


let d = new DeviceClass()
d.MID = 1;
d.PID = 1;
d.Name = '测试用';
d.IMEI = 'IMEI-TEST-0015'
d.ID = 'SN-02356156489'
d.Code = ''
console.log(JSON.stringify([d]))