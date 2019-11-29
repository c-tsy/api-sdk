import { ApiController } from '../utils';

export namespace IM {
    const prefix = "_im";
    export class Member extends ApiController {
        prefix = "_im"
        constructor() {
            super('Member', prefix)
        }
        mine() {
            return this.post('mine', '')
        }
    }
    export class Msg extends ApiController {
        // prefix = "_im"
        constructor() {
            super('Msg', prefix)
        }
        /**
         * 发送消息
         * @param To 
         * @param Text 
         * @param Opt 
         */
        send(To: string, Text: string, Opt: {
            CType?: string,
            Device?: string,
            Addr?: string,
            Ats?: string[],
            Files?: string[]
        } = {}) {
            // if(Opt.Files)
            return this.post('send', Object.assign(Opt, { To, Text }))
        }
        /**
         * 读取消息
         * @param P 
         * @param N 
         * @param UID 
         */
        read(P: number = 1, N: number = 10, UIDs: string[] = []) {
            return this.post('read', { P, N, UIDs })
        }
    }
}