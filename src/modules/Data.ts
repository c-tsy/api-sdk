import { ApiController, jsonp, ApiConfig, DApiController } from '../index';
import { array_tree } from '@ctsy/common'
namespace DataApi {
    export const prefix = '_data'
    export class kd extends DApiController {
        constructor(token = "") {
            super('Kd', prefix, token)
        }
        query(No: string) {
            return this._get('query', { No });
        }
    }
    export const Kd = new kd();
    export class company extends DApiController {
        constructor(token = "") {
            super('Company', prefix, token)
        }
        /**
         * 查询企业列表
         * @param Keyword 
         */
        search(Keyword: string) {
            return this._post('search', { Keyword });
        }
        /**
         * 获取企业详细信息
         * @param PID 
         */
        info(PID: string) {
            return this._post('info', { PID });
        }
    }
    var areas: AreaAll = {
        province_list: {},
        county_list: {},
        city_list: {},
    }, list: any[] = [];
    var trees: Area[] = [];
    export interface Area {
        label: string;
        value: string;
        children: Area[]
    }
    export interface AreaAll {
        province_list: { [index: string]: string },
        county_list: { [index: string]: string },
        city_list: { [index: string]: string },
    }
    export class area extends ApiController {
        constructor(token = "") {
            super('Area', prefix, token)
        }
        /**
         * 读取区域数据
         * @param code 
         */
        async district(code: string | number): Promise<{ [index: string]: string }> {
            let rs = await jsonp('//npm.tansuyun.cn/@ctsy/area/jsonp/' + code + '.js', '_area_jsonp_' + code, 6000);
            return rs;
        }
        /**
         * list
         */
        async list() {
            if (list.length > 0) {
                return list;
            }

            let plist = await jsonp('//npm.tansuyun.cn/castle-cdn/area.list.js', '_area_list_cb');
            for (let o of plist) {
                let x: any = { value: o[0], label: o[1] };
                x.id = x.value.toString().replace(/0{4}$/, '').replace(/0{2}$/, '')
                // x.id.padEnd(x.)
                x.pid = x.id.substr(0, x.id.length - 2) || 0;
                list.push(x);
                if (!x.pid) {
                    areas.province_list[x.value] = x.label;
                } else if (x.pid.length == 2) {
                    areas.county_list[x.value] = x.label;
                } else {
                    areas.city_list[x.value] = x.label;
                }
            }
            trees = Object.values(<any>array_tree(list, { pfield: 'pid', ufield: 'id', sub_name: 'children', remove_null: true }))
            return list;
        }
        /**
         * 读取所有区域信息
         */
        async all(): Promise<AreaAll> {
            if (areas.province_list) {
                return areas;
            }
            await this.list()
            return areas;
        }
        /**
         * 读取省市区信息的树形结构
         */
        async tree(): Promise<Area[]> {
            if (trees.length > 0) {
                return trees;
            }
            await this.list()
            return trees;
        }
    }
    export class excel extends DApiController {
        constructor(token = "") {
            super('Excel', prefix, token)
        }
        /**
         * 通过数据结构来生成数据
         * @param File 
         * @param Data 
         */
        async save(File: string, Data: { [index: string]: any[] }): Promise<{ Token: string }> {
            // if (window && window.navigator.platform == "")
            return await this._post('save', { File, Data })
        }
        /**
         * 通过构建的Table来生成Excel
         * @param File 
         * @param Table 
         */
        async table(File: string, Table: string): Promise<{ Token: string }> {
            return await this._post('table', { File, Table })
        }
        /**
         * 发起下载请求
         * @param Token 
         */
        down(Token: string) {
            window.open([ApiConfig.Host, prefix, 'Excel', 'down', Token].join('/'))
        }
    }
    export class docx extends DApiController {
        constructor(token = "") {
            super('Docx', prefix, token)
        }
        /**
         * 生成Word并返回下载链接
         * @param {string} FileName 下载的Word的名称
         * @param {string} TemplateURL 要生成的Word的模板网络地址
         * @param { [index: string]: any } Data 要生成的Word的数据
         * @param  Downloads Word中要插入的所有图片的集合，用于在生成前先加载图片，否则会渲染失败
         * @returns {url:string}
         */
        template(FileName: string, TemplateURL: string, Data: { [index: string]: any }, Downloads: { URL: string, Size: [number, number], Rotate?: number }[]): Promise<{ url: string }> {
            return this._post('template', {
                FileName,
                Template: TemplateURL,
                Data,
                Downloads
            })
        }
    }
    export class svg extends DApiController {
        constructor(token = "") {
            super('SVG', prefix, token)
        }
        toJPG(
            Width: number,
            Height: number,
            SVG: string,
            Title?: string): Promise<{ URL: string }> {
            return this._post('toJPG', { Width, Height, Title, SVG }).then((p: any) => {
                return { URL: this.host + p.URL }
            })
        }
        // down()
    }
    export const SVGApi = new svg();
    export const DocxApi = new docx();
    export const Excel = new excel();
    export const AreaApi = new area();
    export const Company = new company()
}
export default DataApi;