import { ApiController, jsonp } from '../index';
namespace DataApi {
    const p = '_data'
    class kd extends ApiController {
        query(No: string) {
            return this._get('query', { No });
        }
    }
    export const Kd = new kd('Kd', p);
    class company extends ApiController {
        /**
         * 查询企业列表
         * @param Keyword 
         */
        search(Keyword: string) {
            return this._post('search', { Keyword });
        }
        /**
         * 获取企业详细信息
         * @param PID 
         */
        info(PID: string) {
            return this._post('info', { PID });
        }
    }
    var areas: { [index: string]: any } = {};
    class area extends ApiController {
        async all() {
            if (areas.province_list) {
                return areas;
            }
            areas = await jsonp('//npm.tansuyun.cn/castle-cdn/area.js', '_areacb')
            return areas;
        }
    }
    export const AreaApi = new area('Area', p);
    export const Company = new company('Company', p)
}
export default DataApi;