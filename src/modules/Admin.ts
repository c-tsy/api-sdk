import { ApiController, ApiConfig } from "..";
/**
 * SaaS管理控制Api
 */
namespace AdminApi {
    let prefix = "_admin"
    /**
     * 服务管理Api
     */
    class service extends ApiController {
        /**
         * 绑定服务/初始化服务
         * @param AppID 应用编号
         * @param Module 模块名称
         * @param Force 是否强制初始化，若已初始化过则选择强制初始化
         */
        bind(Module: string, Force: boolean, AppID?: string) {
            return this._post('bind', { AppID: AppID || ApiConfig.AppID, Module, Force });
        }
    }
    export const ServiceApi = new service('Service', prefix)
}

export default AdminApi;