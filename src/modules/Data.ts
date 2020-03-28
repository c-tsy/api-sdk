import { ApiController, jsonp, ApiConfig } from '../index';
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
    class excel extends ApiController {
        /**
         * 通过数据结构来生成数据
         * @param File 
         * @param Data 
         */
        async save(File: string, Data: { [index: string]: any[] }): Promise<{ Token: string }> {
            // if (window && window.navigator.platform == "")
            return await this._post('save', { File, Data })
        }
        /**
         * 通过构建的Table来生成Excel
         * @param File 
         * @param Table 
         */
        async table(File: string, Table: string): Promise<{ Token: string }> {
            return await this._post('table', { File, Table })
        }
        /**
         * 发起下载请求
         * @param Token 
         */
        down(Token: string) {
            window.open([ApiConfig.Host, p, 'Excel', 'down', Token].join('/'))
        }
    }
    export const Excel = new excel('Excel', p);
    export const AreaApi = new area('Area', p);
    export const Company = new company('Company', p)
}
export default DataApi;