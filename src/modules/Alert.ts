import { ControllerApi } from "..";
import ClassAlertLog from "./alert/class/Log";
import ClassAlertGroup from "./alert/class/Group";
import ClassAlertValue from "./alert/class/Value";

namespace AlertApi {
    var prefix = "_alert";
    class log extends ControllerApi<ClassAlertLog>{
    }
    export const LogApi = new log('Log', prefix)
    class group extends ControllerApi<ClassAlertGroup>{
    }
    export const GroupApi = new group('Group', prefix)
    class value extends ControllerApi<ClassAlertValue>{
    }
    export const ValueApi = new value('Value', prefix)
    class rule extends ControllerApi<ClassAlertValue>{
    }
    export const RuleApi = new rule('Rule', prefix)
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
    class cmd extends ControllerApi<ClassAlertValue>{
    }

    export const CmdApi = new cmd('Cmd', prefix)
}

export default AlertApi