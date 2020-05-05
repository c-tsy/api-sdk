import { ApiController, ControllerApi } from "..";
import comment from "./task/class/Comment";
import ClassTask from "./task/class/Task";
import { SearchWhere } from "../lib";
import ClassTaskTag from "./task/class/Tag";

namespace TaskApi {
    let prefix = '_task';

    class task extends ControllerApi {
    }
    export const TaskApi = new task('Task', prefix);

    class project extends ControllerApi {
    }
    export const ProjectApi = new project('Project', prefix);

    class taskGroup extends ControllerApi {
    }
    export const TaskGroupApi = new taskGroup('TaskGroup', prefix);

    class tag extends ApiController {
        /**
         * 添加任务的Tag关联
         * @param TID 、
         * @param TagIDs 
         */
        link(TID: number, TagIDs: number[]) {
            return this._post('link', { TID, TagIDs });
        }
        /**
         * 添加Tag
         * @param Names 
         */
        adds(data: ClassTaskTag[]) {
            return this._post('adds', data);
        }
        /**
         * 移除任务的Tag关联
         * @param TID 
         * @param TagIDs 
         */
        unlink(TID: number, TagIDs: number[]) {
            return this._post('unlink', { TID, TagIDs });
        }
        /**
         * 查询Tag信息
         * @param w 
         */
        search(w: SearchWhere) {
            return this._post('search', w);
        }
    }
    export const TagApi = new tag('Tag', prefix);
}

export default TaskApi;