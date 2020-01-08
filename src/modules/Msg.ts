import { ApiController, ApiConfig } from '../';
export namespace Msg {
    const prefix = "_msg";
    class sms extends ApiController {
        /**
         * 发送短信验证码
         * @param Tel 手机号码 1开头的11位手机号，目前仅支持中国号码
         */
        vcode(Tel: string) {
            return this.post('vcode', { Tel });
        }
    }
    export const Sms = new sms('Sms', prefix);
}