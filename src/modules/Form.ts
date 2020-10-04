import { ControllerApi } from "..";
import ClassFormForm from "./form/class/Form";
import { set } from 'lodash'
import { SearchWhere } from "../lib";

namespace DicApi {
    var prefix = "_form";
    class form extends ControllerApi<ClassFormForm>{
        protected _format(data: ClassFormForm) {
            if (data.Values) {
                if (!data.Data) { data.Data = {} }
                for (let x of data.Values) {
                    set(data.Data, x.K, x.V);
                }
            }
            return data;
        }
        async search(w: SearchWhere) {
            let r = await super.search(w);
            for (let x of r.L) {
                this._format(x);
            }
            return r;
        }
        async add(d: any) {
            return await super.save(0, d);
        }
    }
    export const FormApi = new form('Form', prefix)
}

export default DicApi