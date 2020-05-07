import { ApiController, ControllerApi } from "..";
import comment from "./task/class/Comment";
import ClassTask from "./task/class/Task";
import { SearchWhere, LinkType } from "../lib";
import ClassTaskTag from "./task/class/Tag";

namespace TaskApi {
    let prefix = '_task';

    class task extends ControllerApi {
        PK = "TID"
    }
    export const TaskApi = new task('Task', prefix);

    class project extends ControllerApi {
        PK = "PID"
    }
    export const ProjectApi = new project('Project', prefix);

    class taskGroup extends ControllerApi {
        PK = "TGID"
    }
    export const TaskGroupApi = new taskGroup('TaskGroup', prefix);

    class tag extends ApiController {
        PK = "TagID"
        /**
         * Tag的关联关系处理
         * @param data 关联数据
         */
        async link(data: { TagID: number, TIDs: number[], Type: LinkType } | { TagIDs: number[], TID: number, Type: LinkType }) {
            return this._post('link', data);
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