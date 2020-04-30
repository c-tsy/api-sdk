import { ApiController, ControllerApi } from "..";
import comment from "./task/class/Comment";
import ClassTask from "./task/class/Task";

namespace TaskApi {
    let prefix = '_task';

    class task extends ControllerApi {
    }
    export const TaskApi = new task('Task', prefix);

    class project extends ControllerApi {
    }
    export const ProjectApi = new project('Project', prefix);

    class tag extends ControllerApi {
    }
    export const TagApi = new tag('Tag', prefix);
}

export default TaskApi;