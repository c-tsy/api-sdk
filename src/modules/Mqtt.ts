import hook, { HookWhen } from "@ctsy/hook";
import { load_script } from "../lib";

declare let window: any

export default class MQTT {
    conn: any

    // 连接选项
    options = {
        clean: true, // true: 清除会话, false: 保留会话
        connectTimeout: 4000, // 超时时间
        // 认证信息
        clientId: '',
        username: '',
        password: '',
    }

    host = ""

    // 连接字符串, 通过协议指定使用的连接方式
    // ws 未加密 WebSocket 连接
    // wss 加密 WebSocket 连接
    // mqtt 未加密 TCP 连接
    // mqtts 加密 TCP 连接
    // wxs 微信小程序连接
    // alis 支付宝小程序连接
    constructor(ClientID: string, Account: string, PWD: string, Host = 'wss://d.api.tansuyun.cn/mqtt') {
        this.host = Host;
        this.options.clientId = ClientID;
        this.options.username = Account;
        this.options.password = PWD
    }

    /**
     * 注册或移出请求服务
     * @param name 
     * @param func 
     */
    registCb(name: string, func: undefined | Function) {

    }

    async start() {
        if (window.mqtt === undefined) {
            await load_script('//npm.tansuyun.cn/mqtt/dist/mqtt.min.js', 'mqtt')
        }
        this.conn = window.mqtt.connect(this.host, this.options)
        this.conn.on('reconnect', (e: any) => {
            console.error('MQTT ReConn', e)
        })
        this.conn.on('error', (e: any) => {
            console.error('MQTT Conn Error', e)
        })
        this.conn.subscribe(this.options.clientId + '/#', () => { })
        this.conn.on('message', (topic: string, msg: string) => {
            hook.emit('MQTT/' + topic, HookWhen.After, this, msg)
            if (0 == topic.indexOf(this.options.clientId + '/cmd/')) {
                switch (topic.substr(this.options.clientId.length + 5)) {
                    case 'reload':
                        location.reload()
                        break
                    case 'open':
                        window.open(msg.toString())
                        break
                    case 'logout':

                        break
                    case 'login':

                        break;
                    case 'router':

                        break
                    case 'req':

                        break;
                    default:

                        break;
                }
            }
        })
    }

}

