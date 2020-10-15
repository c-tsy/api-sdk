import { ApiController, jsonp, ApiConfig, DApiController } from '../index';
import * as pbjs from 'protobufjs/light';
import { array_tree } from 'castle-function'
import { pid } from 'process';
import * as pb from 'protobufjs/light';
import Axios from 'axios';
namespace DataApi {
    const p = '_data'
    class kd extends DApiController {
        query(No: string) {
            return this._get('query', { No });
        }
    }
    export const Kd = new kd('Kd', p);
    class company extends DApiController {
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
    let areaPbJSON = {
        nested: {
            Area: {
                fields: {
                    value: {
                        type: "uint32",
                        id: 1
                    },
                    label: {
                        type: "string",
                        id: 2
                    }
                }
            },
            Result: {
                fields: {
                    list: {
                        rule: "repeated",
                        type: "Area",
                        id: 1
                    }
                }
            }
        }
    };
    const base = pb.Root.fromJSON(areaPbJSON);
    class area extends ApiController {
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
            // let plist: any = await Axios.get('//npm.tansuyun.cn/castle-cdn/area.pb', { responseType: 'arraybuffer' }).then((d) => base.lookupType('Result').decode(pb.util.newBuffer(d.data)))

            // console.time("area")
            // for (let o of plist.list) {
            //     let x: any = o;
            //     x.id = x.value.toString();
            //     if (x.id.length > 6) {

            //     } else {
            //         x.id = x.id.replace(/0{4}$/, '').replace(/0{2}$/, '')
            //     }
            //     // x.id.padEnd(x.)
            //     if (x.id.length <= 6) {
            //         x.pid = x.id.substr(0, x.id.length - 2) || 0;
            //     } else {
            //         x.pid = x.id.substr(0, x.id.length - 3) || 0;
            //     }
            //     list.push(x);
            //     if (!x.pid) {
            //         areas.province_list[x.value] = x.label;
            //     } else if (x.pid.length == 2) {
            //         areas.county_list[x.value] = x.label;
            //     } else {
            //         areas.city_list[x.value] = x.label;
            //     }
            // }
            // trees = Object.values(<any>array_tree(list, { pfield: 'pid', ufield: 'id', sub_name: 'children', remove_null: true }))
            // // console.log(trees)
            // console.timeEnd('area')
            // return list;
        }

        async loadAll(): Promise<{ pid: string, id: string, label: string, value: number }[]> {
            let plist: any = await Axios.get('//npm.tansuyun.cn/castle-cdn/area.pb', { responseType: 'arraybuffer' }).then((d) => base.lookupType('Result').decode(pb.util.newBuffer(d.data)))
            for (let o of plist.list) {
                let x: any = o;
                x.id = x.value.toString();
                if (x.id.length > 6) {

                } else {
                    x.id = x.id.replace(/0{4}$/, '').replace(/0{2}$/, '')
                }
                // x.id.padEnd(x.)
                if (x.id.length <= 6) {
                    x.pid = x.id.substr(0, x.id.length - 2) || 0;
                } else {
                    x.pid = x.id.substr(0, x.id.length - 3) || 0;
                }
                list.push(x);
                if (!x.pid) {
                    areas.province_list[x.value] = x.label;
                } else if (x.pid.length == 2) {
                    areas.county_list[x.value] = x.label;
                } else {
                    areas.city_list[x.value] = x.label;
                }
            }
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
    class excel extends DApiController {
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
            window.open([ApiConfig.Host, p, 'Excel', 'down', Token].join('/'))
        }
    }
    class docx extends DApiController {
        /**
         * 生成Word并返回下载链接
         * @param {string} FileName 下载的Word的名称
         * @param {string} TemplateURL 要生成的Word的模板网络地址
         * @param { [index: string]: any } Data 要生成的Word的数据
         * @param  Downloads Word中要插入的所有图片的集合，用于在生成前先加载图片，否则会渲染失败
         * @returns {url:string}
         */
        template(FileName: string, TemplateURL: string, Data: { [index: string]: any }, Downloads: { URL: string, Size: [number, number] }[]): Promise<{ url: string }> {
            return this._post('template', {
                FileName,
                Template: TemplateURL,
                Data,
                Downloads
            })
        }
    }
    export const DocxApi = new docx('Docx', p);
    export const Excel = new excel('Excel', p);
    export const AreaApi = new area('Area', p);
    export const Company = new company('Company', p)
}
export default DataApi;