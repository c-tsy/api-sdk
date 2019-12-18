import { ApiController } from '../index';
namespace Wechat {
    class auth extends ApiController {
    }
    class admin extends ApiController { }
    class js extends ApiController { }
    class menu extends ApiController { }
    const prefix = '_wechat'
    export const Auth = new auth('Auth', prefix);
    export const Admin = new admin('Admin', prefix);
    export const Js = new js('Js', prefix);
    export const Menu = new menu('Menu', prefix);
}
export default Wechat;