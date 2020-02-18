import { ApiController, ApiCommon, ControllerApi } from '../index';
import { ErrorType } from '../lib';
namespace AreaApi {
    const prefix = '_area'
    export class Area {
        Name: string = "";
        Code: number = 0;
    }
    class area extends ApiController {
        read(PCode: number) {
            return this.post('read', { PCode });
        }
        save(Code: number, Name: number, Level: number) {
            return this.post('save', { Code, Name, Level })
        }
    }
    /**
     * 区域接口
     */
    export const AreaApi = new area('Area', prefix)
    class building extends ControllerApi {

    }
    export const BuildingApi = new building('Building', prefix)
    class community extends ControllerApi {

    }
    export const CommunityApi = new community('Building', prefix)
}
export default AreaApi;