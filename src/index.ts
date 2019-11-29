import { ApiConfig } from './utils';
/**
 * 创建Api客户端
 * @param appid 
 * @param secret 
 * @param usertoken 
 */
export default function create(appid: string, secret: string) {
    ApiConfig.AppID = appid;
    ApiConfig.Secret = secret;
}