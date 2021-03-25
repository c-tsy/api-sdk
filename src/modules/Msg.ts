import { ApiController, ApiConfig } from '../';
export namespace Msg {
    const prefix = "_msg";
    class sms extends ApiController {
        /**
         * 发送短信验证码
         * @param Tel 手机号码 1开头的11位手机号，目前仅支持中国号码
         */
        vcode(Tel: string) {
            return this._post('vcode', { Tel });
        }
        /**
         * 发送短信
         * @param Tel 电话号码  
         * @param TID 短信模板号
         * @param Params 参数
         * @param Sign 签名
         */
        send(Tel: number, TID: number, Params: { [index: string]: string | number }, Sign: string) {
            return this._post('send', { Tel, TID, Params, Sign })
        }
    }
    export const Sms = new sms('Sms', prefix);
}