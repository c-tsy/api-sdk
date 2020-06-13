import { ApiController } from '../index';
import Hook, { HookWhen } from '@ctsy/hook';
import * as qs from 'querystring'
import axios from 'axios';
const md5: any = require('md5')
namespace Upload {
    export class ClassUploadFileConfig {
        /**
         * 上传原因，如 做什么操作 导致的上传，英文标识，20个字符以下
         */
        what: string = ''
        /**
         * 原始文件名称
         */
        oname?: string = ''
        /**
         * 过期控制，OSS存储标签，如果不需要过期控制请传入false，否则传入数字表示多少天过期
         */
        expire?: string | number | boolean = false
        /**
         * 存储权限，私有或者公有读，默认为私有，私有的情况下没法直接通过URL链接来访问
         * @example read
         * @default read
         */
        acl?: 'private' | 'read' = 'read'
        /**
         * 成功回调，弃用
         */
        success?: Function
        /**
         * 失败回调，弃用，
         */
        error?: Function
        /**
         * 文件名称，存储的文件名称
         */
        name?: string
        /**
         * 上传进度回调
         * @example 
         * onUploadProgress: progressEvent => {
         *      let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
         *      self.uploadMessage = '上传 ' + complete
         *  }
         */
        onUploadProgress?: (process: { loaded: number, total: number }) => void
    }

    class upload extends ApiController {
        /**
         * 签名
         * @param what 
         * @param file 
         * @param oname 
         * @param expire 
         * @param acl 
         */
        async sign(what: string, file: File, oname: string = '', expire: string | number | boolean = 0, acl: 'private' | 'read' = 'private') {
            return await this._post('sign', {
                what,
                oname,
                expire,
                name: file.name,
                type: file.type,
                size: file.size,
                date: new Date(file.lastModified).getTime(),
                acl,
                md5: await local_file_md5(file)
            });
        }
        /**
         * 列出文件列表
         * @param data 
         */
        list(data: { Keyword?: string, W: any, P?: number, N?: number, Sort?: string }) {
            return this._post('list', data)
        }
    }
    export const Upload = new upload('Upload', '_upload')
    /**
     * 选择文件方法，用于触发文件选择弹窗
     * @param accept 
     */
    export function select_file(accept = "*"): Promise<FileList> {
        return new Promise((s, j) => {
            let i = document.createElement('input');
            i.type = 'file';
            i.accept = accept;
            i.hidden = true;
            document.body.appendChild(i);
            i.onchange = (ev) => {
                if (i.files && i.files.length > 0) {
                    s(i.files);
                }
                else {
                    j('NoFile');
                }
                document.body.removeChild(i);
            };
            i.click();
        });
    }
    /**
     * 本地图片预览
     * @param file 文件
     */
    export function local_img_preview(file: File): Promise<string> {
        return new Promise((s, j) => {
            var reader = new FileReader();
            reader.onload = () => {
                if ('string' == typeof reader.result)
                    s(reader.result);
                else {
                    j('读取失败')
                }

            };
            reader.readAsDataURL(file);
        })
    }
    /**
     * 计算本地文件的md5值
     * @param file 
     */
    export function local_file_md5(file: File) {
        return new Promise((s, j) => {
            var reader = new FileReader();
            reader.onload = () => {
                if (reader.result != null) {
                    s(md5(reader.result));
                } else {
                    j('文件错误')
                }
            };
            reader.readAsArrayBuffer(file);
        })
    }
    /**
     * 上传文件
     * @param data 文件对象
     * @param conf 配置内容
     * @returns {{
        URL: string,
        Original: string,
        Auth: string
    }}
     */
    export async function upload_file(data: File, conf: ClassUploadFileConfig): Promise<{
        URL: string,
        Original: string,
        Auth: string
    }> {
        let config: any = {
            headers: { 'Content-Type': 'multipart/form-data' },
        }
        if (conf.onUploadProgress) {
            config.onUploadProgress = conf.onUploadProgress;
        }
        let d = await Upload.sign(conf.what || '', data, conf.oname || data.name, conf.expire || 0, conf.acl || 'read')
        let name = conf.name || md5(data.name + data.type + data.size + data.lastModified)
        if (name.split('.').length == 1) {
            name = name + '.' + data.type.split('/')[1]
        }
        let form = new FormData()
        form.append('policy', d.policy);
        form.append('key', d.file);
        form.append('OSSAccessKeyId', d.id);
        form.append('success_action_status', '200');
        form.append('callback', d.cb);
        form.append('signature', d.sign);
        let tag: { [index: string]: string } = {};
        if (conf.what) {
            tag.what = conf.what
        }
        if (false !== conf.expire) {
            tag.expire = "1"
        }
        form.append('x‑oss‑tagging', qs.stringify(tag));
        form.append('x-oss-meta-name', data.name);
        form.append('x-oss-object-acl', conf.acl == 'read' ? 'public-read' : 'private');
        form.append('file', data);
        let rs = await axios.post(d.host, form, config)
        let drs = {
            url: d.host + '/' + d.file,
            URL: d.host + '/' + d.file,
            original: data.name,
            Original: data.name,
            auth: d,
            Auth: d,
            rs,
        };
        if (conf.success instanceof Function) {
            conf.success(drs);
        }
        return drs;
    }
}
export default Upload;
/**
 * 通过hook方式上传文件
 */
Hook.regist('fileupload', HookWhen.Before, 'upload', (ctx: { what: string, oname: string, expire: any, acl: 'private' | 'read', success: Function, error: Function, name: string }, data: File) => {
    return Upload.upload_file(data, ctx);
})

