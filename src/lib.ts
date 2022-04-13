import { timeout, dataurl_to_file as d, load_script as l } from "@ctsy/common";
declare let window: any
export namespace ErrorType {
    export enum Art {
        DATA_LENGTH_TOO_LONG = 'DATA_LENGTH_TOO_LONG',
        DATA_LENGTH_IS_ERROR = 'DATA_LENGTH_IS_ERROR',
        DATA_LENGTH_IS_ZERO = 'DATA_LENGTH_IS_ZERO',
        PARAMS_IS_ERROR = 'PARAMS_IS_ERROR' // 参数出错
    }
    export enum IM {
        TEXT_LENGTH_TOO_SHORT = 'TEXT_LENGTH_TOO_SHORT',
        OID_LENGTH_IS_ZERO = 'OID_LENGTH_IS_ZERO',
        NOT_ACCEPTED_FOR_THE_MOMENT = 'NOT_ACCEPTED_FOR_THE_MOMENT', // 暂不支持
        PAGINATION_IS_EXCEED_1000 = 'PAGINATION_CANNOT_IS_1000', // 分页参数不能超过1000
        GID_LENGTH_IS_ZERO = 'GID_LENGTH_IS_ZERO',
        UIDS_LENGTH_IS_ZERO = 'UIDS_LENGTH_IS_ZERO',
        GID_PARAMS_IS_ERROR = 'GID_PARAMS_IS_ERROR',
        UID_PARAMS_IS_ERROR = 'UID_PARAMS_IS_ERROR',
        DATA_LENGTH_IS_ERROR = 'DATA_LENGTH_IS_ERROR',
        NICK_LENGTH_IS_ERROR = 'NICK_LENGTH_IS_ERROR',
        HEAD_LENGTH_IS_EXCEED_50 = 'HEAD_LENGTH_IS_EXCEED_50',
        PARAMS_IS_ERROR = 'PARAMS_IS_ERROR' // 参数出错
    }
    export enum Org {
        ORGAN_SHOULD_BE_ARRAY = 'ORGAN_SHOULD_BE_ARRAY',
        UNITIDS_SHOULD_BE_ARRAY = 'UNITIDS_SHOULD_BE_ARRAY',
        AIDS_SHOULD_BE_ARRAY = 'UNITIDS_SHOULD_BE_ARRAY',
        AID_PARAMS_IS_ERROR = 'AID_PARAMS_IS_ERROR',
        UNITID_PARAMS_IS_ERROR = 'UNITID_PARAMS_IS_ERROR',

    }
    export enum User {
        TYPE_PARAMS_IS_ERROR = 'TYPE_PARAMS_IS_ERROR',
        ACCOUNT_SHOULD_BE_STRING = 'ACCOUNT_SHOULD_BE_STRING',
        PWD_SHOULD_BE_STRING = 'PWD_SHOULD_BE_STRING',
        OLDPWD_SHOULD_BE_STRING = 'OLDPWD_SHOULD_BE_STRING',
        PWD_PARAMS_IS_ERROR = 'PWD_PARAMS_IS_ERROR',
        ACCOUNT_PARAMS_IS_ERROR = 'ACCOUNT_PARAMS_IS_ERROR',
        OLDPWD_PARAMS_IS_ERROR = 'OLDPWD_PARAMS_IS_ERROR',
        NAME_OR_NICK_CANNOT_BE_EMPTY = 'NAME_OR_NICK_CANNOT_BE_EMPTYE'
    }

}

/**
 * SDK的Hook
 */
export enum ApiSDKHooks {
    Request = "apisdk/Request"
}

/**
 * 查询结果
 */
export class SearchResult<T> {
    L: T[] = [];
    T: number = 0
    P: number = 1
    N: number = 10;
    R: { [index: string]: any } = {}
}

/**
 * 查询条件
 */
export class SearchWhere {
    [index: string]: any
    W: { [index: string]: any } = {}
    Keyword?: string = "";
    P?: number = 1;
    N?: number = 10;
    Sort?: string = "";
}

/**
 * 连接处理方式
 */
export enum LinkType {
    /**
     * 追加
     */
    append,
    /**
     * 替换
     */
    replace,
    /**
     * 移除
     */
    remove
}

export const dataurl_to_file = d;
export const load_script = l;
const ls = localStorage
class Store {
    get(key: string, def: string | number | any = "") {
        let r = ls.getItem(key)
        if (!r) { return def }
        let p = JSON.parse(r)
        if (p._v && p._e) {
            if (p._e > Date.now()) {
                return p._v
            } else {
                this.rm(key)
                return def;
            }
        }
        return r;
    }
    set(key: string, val: any, exp = 0) {
        if (exp) {
            val = {
                _v: val,
                _e: Date.now() + exp * 1000
            }
        }
        ls.setItem(key, JSON.stringify(val))
    }
    rm(key: string) {
        ls.removeItem(key)
    }
}
export const store = new Store