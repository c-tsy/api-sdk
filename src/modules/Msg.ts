import { ApiController, ApiConfig } from '../';
export namespace Msg {
    export const prefix = "_msg";
    export class sms extends ApiController {
        constructor(token = "") {
            super('Sms', prefix, token)
        }
        /**
         * 发送短信验证码
         * @param Tel 手机号码 1开头的11位手机号，目前仅支持中国号码
         */
        vcode(Tel: string, Sign: string, Debug: boolean = false): Promise<{ Rand: string, SID: string }> {
            return this._post('vcode', { Tel: Number(Tel), Sign, Debug });
        }
        /**
         * 校验验证码是否正确
         * @param Tel 用户手机号
         * @param VCode 用户验证码
         * @param SID 发送标识
         * @param Rand 随机验证码
         * @returns 
         */
        verify(Tel: string, VCode: string, SID: string, Rand: string): Promise<boolean> {
            return this._post('verify', { Tel: Number(Tel), VCode, SID, Rand })
        }
        /**
         * 发送短信
         * @param Tel 电话号码  
         * @param TID 短信模板号
         * @param Params 参数
         * @param Sign 签名
         */
        send(Tel: number, TID: number, Params: { [index: string]: string | number }, Sign: string) {
            return this._post('send', { Tel: Number(Tel), TID, Params, Sign })
        }
    }
    export const Sms = new sms();
}