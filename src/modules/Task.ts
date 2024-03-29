import { ApiController, ControllerApi } from "..";
import ClassComment from "./task/class/Comment";
import ClassTask from "./task/class/Task";
import { SearchWhere, LinkType } from "../lib";
import ClassTaskTag from "./task/class/Tag";
import ClassTaskFiles from "./task/class/Files";
import ClassTaskGroup from "./task/class/TaskGroup";
import ClassProject from "./task/class/Project";
import ClassTaskMilepost from "./task/class/Mailpost";
import ClassTaskMailpostList from "./task/class/MailpostList";
import ClassTaskMailpostProcess from "./task/class/MailpostProcess";

namespace TaskApi {
    export const prefix = '_task';


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
    export class task extends ControllerApi<ClassTask> {
        PK = "TID"

        constructor(token = "") {
            super('Task', prefix, token)
        }
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
         * 修改任务状态信息
         * @param {{ TID: number, FromStatus: TaskStatus, ToStatus: TaskStatus, Memo: string }[]} data 批量修改任务状态的数组
         */
        status(data: { TID: number, FromStatus: TaskStatus, ToStatus: TaskStatus, Memo: string }[]) {
            if (!(data instanceof Array)) {
                throw new Error('参数应为数组')
            }
            return this._post('status', data);
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
    export const TaskApi = new task();

    export class project extends ControllerApi<ClassProject> {
        PK = "PID"

        constructor(token = "") {
            super('Project', prefix, token)
        }
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
    export const ProjectApi = new project();
    /**
     * 任务组
     */
    export class taskGroup extends ControllerApi<ClassTaskGroup> {
        PK = "TGID"
        constructor(token = "") {
            super('TaskGroup', prefix, token)
        }
    }
    export const TaskGroupApi = new taskGroup();

    export class tag extends ApiController {
        constructor(token = "") {
            super('Tag', prefix, token)
        }
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
    export const TagApi = new tag();
    export class comment extends ControllerApi<ClassComment> {
        PK = "CID"
        constructor(token = "") {
            super('Comment', prefix, token)
        }
    }
    export const CommentApi = new comment()
    /**
     * 里程碑
     */
    export class mailpost extends ControllerApi<ClassTaskMilepost>{
        PK = 'MID'
        constructor(token = "") {
            super('Mailpost', prefix, token)
        }
    }
    /**
     * 里程碑节点
     */
    export class mailpostList extends ControllerApi<ClassTaskMailpostList>{
        PK = "MLID";
        constructor(token = "") {
            super('MailpostList', prefix, token)
        }
        /**
         * 批量保存或新增mailList
         * @param list 
         */
        saves(list: ClassTaskMailpostList[]) {
            return this._post('saves', list);
        }
    }
    /**
     * 里程碑进度对象
     */
    export class mailpostProcess extends ControllerApi<ClassTaskMailpostProcess>{
        PK = "MPID";
        constructor(token = '') {
            super('MailpostProcess', prefix, token)
        }
    }
    /**
     * 里程碑对象
     */
    export const MailpostApi = new mailpost();
    /**
     * 里程碑节点对象
     */
    export const MailpostListApi = new mailpostList();
    /**
     * 里程碑进度对象
     */
    export const MailpostProcessApi = new mailpostList();

}

export default TaskApi;