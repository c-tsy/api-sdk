import { ApiController } from "..";
import comment from "./task/class/Comment";
import ClassTask from "./task/class/Task";

namespace TaskApi {
    let prefix = '_task';

    class task extends ApiController {
        /**
         * 添加任务信息
         */
        async adds(Tasks: ClassTask[]) {
            return this._post('adds', Tasks);
        }
        /**
         * 添加单个
         * @param Task 
         */
        async add(Task: ClassTask) {
            return this._post('adds', [Task]);
        }
        /**
         * 修改后保存任务信息
         */
        async save() { }
        /**
         * 读取任务列表
         */
        async list() { }
        /**
         * 任务操作，如指派，完成，暂停，继续等
         */
        async op() { }
    }
    export const TaskApi = new task('Task', prefix);
}

export default TaskApi;