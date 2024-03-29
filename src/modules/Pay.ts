import { ApiController } from "..";
import { timeout } from "@ctsy/common";
import { SearchWhere, SearchResult, glo } from "../lib";
declare let window: any;
namespace Pay {
    export const prefix = '_pay';
    export enum PayStatus {
        Pending = 0,
        Cancel = -1,
        Success = 1
    }
    export class ClassPayOrders {

        /**
         * OID
         * 
         */
        public OID: number = 0;
        /**
         * 标题
         * 
         */
        public Title: string = "";
        /**
         * 来源订单
         * 
         */
        public FOID: string = "";
        /**
         * 通道参数
         * 
         */
        public Param: string = "";
        /**
         * 通道订单号
         * 
         */
        public COID: string = "";
        /**
         * 摘要
         * 
         */
        public Memo: string = "";
        /**
         * 创建时间
         * 
         */
        public CTime: Date = new Date;
        /**
         * 创建人
         * 
         */
        public CUID: number = 0;
        /**
         * 状态
         * 1支付成功0未支付 -1取消支付
         */
        public Status: number = 0;
        /**
         * 更新时间
         * 
         */
        public UTime: Date = new Date;
        /**
         * 更新人
         * 
         */
        public UUID: number = 0;
        /**
         * 应用编号
         * 
         */
        public AID: number = 0;
        /**
         * GID
         * 
         */
        public GID: number = 0;
        /**
         * Key
         * 
         */
        public Key: string = "";
        /**
         * 开始时间
         * 
         */
        public STime: Date = new Date;
        /**
         * 结束时间
         * 
         */
        public ETime: Date = new Date;
        /**
         * 金额
         * 
         */
        public Money: number = 0;
        /**
         * 支付渠道
         * wechat/alipay，此处为了方便后期引入其他支付通道，所以使用字符串
         */
        public Channel: string = "";
        /**
         * 支付人
         * 
         */
        public PUID: number = 0;
        /**
         * 支付时间
         * 
         */
        public PTime: Date = new Date;
        /**
         * 支付人标识
         * 
         */
        public OpenID: string = "";
        /**
         * 优惠金额
         * 
         */
        public Discount: number = 0;
        /**
         * 通知状态
         * 0 未通知 -1 通知失败，1表示成功，大于1表示第几次通知，
         */
        public PStatus: number = 0;
        /**
         * 回调通知
         * 地址及其协议
         */
        public Push: string = "";
    }
    export class pay extends ApiController {
        constructor(token = "") {
            super('Pay', prefix, token)
        }
        /**
         * 创建支付订单
         * @param d 
         */
        create(d: ClassPayOrders): Promise<ClassPayOrders> {
            return this._post('create', d).then((p) => {
                if (p && 'string' == typeof p.Param && p.Param.length > 0) {
                    try {
                        p.Param = JSON.parse(p.Param);
                    } catch (error: any) {

                    }
                }
                return p;
            });
        }
        /**
         * 发起支付订单查询
         * @param d 
         */
        search(d: SearchWhere): SearchResult<ClassPayOrders> {
            return <any>this._post('search', d);
        }
        /**
         * 读取单个支付订单记录
         * @param OID 
         */
        get(OID: number, FOID: number = 0): Promise<ClassPayOrders> {
            return this._post('get', { OID, FOID })
        }
        /**
         * 自动创建调用微信支付
         * @param d 
         * @param waitForConfirm 
         */
        async callWxPay(d: ClassPayOrders | any, waitForConfirm: boolean = true): Promise<boolean | ClassPayOrders> {
            if (!glo.WeixinJSBridge) {
                throw new Error('非微信环境');
            }
            if (!d.OID) {
                d = await this.create(d);
                if (!d.Param) {
                    d.Param = d.Wechat.Param;
                }
            } else {
                let pcheck = await this.get(d.OID);
                if (pcheck.Status == 1) {
                    return true;
                    // return;
                }
            }
            if (!d.Param) {
                throw new Error('支付订单创建失败');
            }
            if ('string' == typeof d.Param) {
                d.Param = JSON.parse(d.Param);
            }
            for (let i = 0; i < 3; i++) {
                try {
                    return await new Promise(async (s, j) => {
                        glo.WeixinJSBridge.invoke("getBrandWCPayRequest", d.Param, async (res: any) => {
                            console.error(res);
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                //支付成功，等待服务器确认
                                if (waitForConfirm) {
                                    for (let i = 0; i < 30; i++) {
                                        let pcheck = await this.get(d.OID);
                                        if (pcheck.Status == 1) {
                                            s(pcheck);
                                            return;
                                        }
                                        await timeout(1000);
                                    }
                                    j('查询支付结果超时');
                                } else {
                                    s(true);
                                }
                            } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                                j('取消支付');
                            } else {
                                console.error(res.err_msg);
                                j('取消支付或支付失败');
                            }
                        });
                    });
                } catch (error: any) {
                    if (error == '取消支付') {
                        throw new Error('支付失败，客户取消');
                    } else {
                        await timeout(10);
                    }
                }
            }
            throw new Error('支付失败，调用失败');
        }
    }
    export const PayApi = new pay();
}

export default Pay;