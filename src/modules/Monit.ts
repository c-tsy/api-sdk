import { ControllerApi } from "..";

namespace Monit {
    export const prefix = "_monit"
    export class PC extends ControllerApi<any> {
        constructor(token = "") {
            super('PC', prefix, token)
        }
        /**
         * 下发命令
         * @param PhyID 下发到哪个节点
         * @param Cmd 下发的命令内容
         * @returns 返回节点处理完成后的结果
         */
        async cmd(PhyID: string, Cmd: { Op: string, Data: any }) {
            return this._post('cmd', { PhyID, Cmd })
        }
        /**
         * 节点上线通知，用于注册参数
         * @param PhyID 
         * @param Type 
         * @param Data 
         * @returns 返回节点连接参数
         */
        async online(PhyID: string, Type: string = "", Data: { [index: string]: string | number } = {}) {
            return this._post('online', Object.assign({ PhyID, Type }, Data))
        }
    }

    export const PCAPi = new PC()

}


export default Monit