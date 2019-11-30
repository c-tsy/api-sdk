import { ApiController } from '../index';
import Hook, { HookWhen } from '@ctsy/hook';
import * as qs from 'querystring'
import axios from 'axios';
const md5: any = require('md5')
namespace Upload {
    class upload extends ApiController {
        sign(what: string, file: File, oname: string = '', expire: number = 0, acl: 'private' | 'read' = 'private') {
            return this.post('sign', {
                what,
                oname,
                expire,
                name: file.name,
                type: file.type,
                size: file.size,
                date: new Date(file.lastModified).getTime(),
                acl
            });
        }
    }
    export const Upload = new upload('Upload', '_upload')
}
export default Upload;
Hook.regist('fileupload', HookWhen.Before, 'upload', (ctx: { what: string, oname: string, expire: any, acl: 'private' | 'read', success: Function, error: Function, name: string }, data: File) => {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    Upload.Upload.sign(ctx.what || '', data, ctx.oname, ctx.expire || 0, ctx.acl || 'private').then((d: any) => {
        let name = ctx.name || md5(data.name + data.type + data.size + data.lastModified)
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
        if (ctx.what) {
            tag.what = ctx.what
        }
        if (false !== ctx.expire) {
            tag.expire = "1"
        }
        form.append('x‑oss‑tagging', qs.stringify(tag));
        form.append('x-oss-meta-name', data.name);
        form.append('x-oss-object-acl', ctx.acl == 'read' ? 'public-read' : 'private');
        form.append('file', data);
        axios.post(d.host, form, config).then((rs: any) => {
            ctx.success({
                url: d.host + '/' + d.file,
                original: data.name,
                auth: d,
                rs,
            });

        }).catch((e: any) => {
            ctx.error(e)
        })
    })
})
// Hook.emit()

