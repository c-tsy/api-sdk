import { ApiController, ControllerApi } from "..";
import comment from "./task/class/Comment";
import ClassTask from "./task/class/Task";
import { SearchWhere, LinkType } from "../lib";
import ClassTaskTag from "./task/class/Tag";
import ClassTaskFiles from "./task/class/Files";

namespace TaskApi {
    let prefix = '_task';


    /**
     * 任务的关联对象OType字典
     */
    export enum TaskOType {
        Task = "Task",
        Project = "Project",
        TaskGroup = "TaskGroup",
    }


    export enum TaskStatus {
        /**
         * 已删除
         */
        Del = -1,
        /**
         * 未开始
         */
        NotStart = 0,
        /**
         * 进行中
         */
        Doing = 1,
        /**
         * 已暂停
         */
        Paused = 2,
        /**
         * 已完成
         */
        Finish = 3,
        /**
         * 已停止
         */
        Stopped = 4,
    }




    export enum ProjectStatus {
        /**
         * 已删除
         */
        Del = -1,
        /**
         * 未开始
         */
        NotStart = 0,
        /**
         * 进行中
         */
        Doing = 1,
        /**
         * 已暂停
         */
        Paused = 2,
        /**
         * 已完成
         */
        Finish = 3,
        /**
         * 已停止
         */
        Stopped = 4,
        /**
         * 已归档
         */
        Forzen = 5,
    }

    /**
     * 任务管理对象
     */
    class task extends ControllerApi {
        PK = "TID"

        /**
         * 关联文件管理
         * @param {LinkType} Type 
         * @param {ClassTaskFiles} Files 
         * @param {number} TID 
         */
        file(Type: LinkType,
            Files: {
                FID?: number,
                Path: string,
                Name: string,
                URL: string,
                Memo: string,
                Type: string,
                Size: number,
                Status: number,
            }[], TID: number) {
            return this._post('file', {
                TID, Type, Files
            });
        }
        /**
         * 任务详情，
         * @param {number[]} TIDs 任务编号数组
         */
        detail(TIDs: number[]): Promise<{ [index: string]: { File: ClassTaskFiles } }> {
            return this._post('detail', { TIDs })
        }
        /**
         * Tag的关联关系处理
         * @param data 关联数据
         */
        link(Type: LinkType, Users: {
            UID: number,
            Memo: string,
            Type: number,
            Status: number,
        }[], TID: number) {
            return this._post('link', {
                TID, Type, Users
            });
        }
    }
    export const TaskApi = new task('Task', prefix);

    class project extends ControllerApi {
        PK = "PID"

        /**
         * 读取项目详情，
         * @param {number[]} PIDs 项目编号数组
         */
        detail(PIDs: number[]): Promise<{ [index: string]: { File: ClassTaskFiles } }> {
            return this._post('detail', { PIDs })
        }
        /**
         * Tag的关联关系处理
         * @param data 关联数据
         */
        async link(Type: LinkType, Users: {
            UID: number,
            Memo: string,
            Type: number,
            Status: number,
        }[], PID: number) {
            return this._post('link', {
                PID, Type, Users
            });
        }
        /**
         * 关联文件管理
         * @param {LinkType} Type 
         * @param {ClassTaskFiles} Files 
         * @param {number} TID 
         */
        async file(Type: LinkType,
            Files: {
                FID?: number,
                Path: string,
                Name: string,
                URL: string,
                Memo: string,
                Type: string,
                Size: number,
                Status: number,
            }[], PID: number) {
            return this._post('file', {
                PID, Type, Files
            });
        }
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
    class comment extends ControllerApi {
        PK = "CID"
    }
    export const CommentApi = new comment('Comment', prefix)
}

export default TaskApi;