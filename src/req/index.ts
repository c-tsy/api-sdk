
import * as p from 'protobufjs/light';
import Axios from 'axios';
import { ApiConfig } from '..';
export class Req {

}
p.wrappers[".google.protobuf.Timestamp"] = {
    fromObject: function (object: any) {
        //Convert ISO-8601 to epoch millis
        var dt = Date.parse(object);
        return this.create({
            seconds: Math.floor(dt / 1000),
            nanos: dt % 1000
        })
    },
    toObject: function (message: any, options) {
        return new Date(message.seconds * 1000 + message.nanos);
    }
};
const protoed: { [index: string]: p.Root } = {};

export const Protobuf = new class Protobuf {
    async load(module: string) {
        if (Object.keys(ApiConfig.protos).length == 0) {
            await Axios.get(ApiConfig.Host + '/proto/list.json').then((d) => {
                ApiConfig.protos = d.data;
            })
        }
        if (!protoed[module]) {
            let pjson = await Axios.get(ApiConfig.Host + '/proto/' + module + '.json')
            protoed[module] = p.Root.fromJSON(pjson.data)
        }
        return protoed[module];
    }
    async encode(module: string,) { }
    async decode(module: string) {
        return
    }
}