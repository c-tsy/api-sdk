import TaskApi from './modules/Task';
import ClassTask from './modules/task/class/Task';
import { ApiConfig, Token } from '.';
Token = 'abc'
ApiConfig.Host = 'http://192.168.31.22:3000';
ApiConfig.AppID = 'dev'
ApiConfig.Secret = 'dev2930sf9fwopfwe9';
ApiConfig.Key = 'dev'
ApiConfig.Debug = true;

(async () => {
    let task = new ClassTask();
    task.Title = 'aba'
    let rs = await TaskApi.TaskApi.search(<any>{})
    console.log(JSON.stringify(rs))
})()
