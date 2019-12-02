import { ApiController } from '../index';
namespace DataApi {
    const p = '_data'
    class kd extends ApiController {
        query(No: string) {
            return this.get('query', { No });
        }
    }
    export const Kd = new kd('Kd', p);
    class company extends ApiController {
        /**
         * 查询企业列表
         * @param Keyword 
         */
        search(Keyword: string) {
            return this.post('search', { Keyword });
        }
        /**
         * 获取企业详细信息
         * @param PID 
         */
        info(PID: string) {
            return this.post('info', { PID });
        }
    }
    export const Company = new company('Company', p)
}
export default DataApi;