import { ControllerApi } from "..";
import ClassAlertLog from "./alert/class/Log";
import ClassAlertGroup from "./alert/class/Group";
import ClassAlertValue from "./alert/class/Value";

namespace AlertApi {
  export const prefix = "_alert";
  export class log extends ControllerApi<ClassAlertLog>{
    constructor(token = "") {
      super('Log', prefix, token)
    }
  }
  export const LogApi = new log()
  export class group extends ControllerApi<ClassAlertGroup>{
    constructor(token = "") {
      super('Group', prefix, token)
    }
  }
  export const GroupApi = new group()
  export class value extends ControllerApi<ClassAlertValue>{
    constructor(token = "") {
      super('Value', prefix, token)
    }
  }
  export const ValueApi = new value()
  export class rule extends ControllerApi<ClassAlertValue>{
    constructor(token = "") {
      super('Rule', prefix, token)
    }
  }
  export const RuleApi = new rule()
  /**
* 告警动作 Cmd
* ACID ACID 自增序号(bigint)
* AGID AGID 序号(bigint)
* Type Type 状态值(tinyint(1))
* Rule Rule 字符250(char(250))
* Name Name 字符50(char(50))
* Code Code 字符50(char(50))
* CTime CTime 时间日期(datetime)
* CUID CUID 序号(bigint)
* Status Status 状态值(tinyint(1))
* AID AID 序号(bigint)
* GID GID 序号(bigint)
* Key Key 字符50(char(50))
* 上次告警 UTime 时间日期(datetime)
*/
  export class cmd extends ControllerApi<ClassAlertValue>{
    constructor(token = "") {
      super('Cmd', prefix, token)
    }
  }

  export const CmdApi = new cmd()
}

export default AlertApi