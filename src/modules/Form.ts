import { ControllerApi } from "..";
import ClassFormForm from "./form/class/Form";
import { set } from 'lodash'
import { SearchResult, SearchWhere } from "../lib";
import ClassFormColumn from "./form/class/Column";
import ClassFormField from "./form/class/Field";
import ClassFormTemplate from "./form/class/Template";
import ClassFormJson from "./form/class/Json";

namespace FormApi {
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
        /**
         * JSON数据的新增和保存，FID为0或空表示新增，否则表示保存
         * @param d 
         */
        async jsonSave(d: ClassFormJson): Promise<ClassFormJson> {
            return await this._post('jsonSave', d);
        }
        /**
         * 删除JSON数据
         * @param FIDs 
         */
        async jsonDel(FIDs: number[]) {
            return this._post('jsonDel', { FIDs });
        }
        /**
         * JSON 数据查询
         * @param w 
         */
        async jsonSearch(w: SearchWhere): Promise<SearchResult<ClassFormJson>> {
            return await this._post('jsonSearch', w)
        }
    }
    export const FormApi = new form('Form', prefix)

    class column extends ControllerApi<ClassFormColumn>{

    }
    class field extends ControllerApi<ClassFormField>{

    }
    class template extends ControllerApi<ClassFormTemplate>{

    }
    /**
     * 关联字段管理
     */
    export const ColumnApi = new column('Column', prefix);
    /**
     * 字段管理
     */
    export const FieldApi = new column('Field', prefix);
    /**
     * 模板管理
     */
    export const TemplateApi = new column('Template', prefix);
}

export default FormApi