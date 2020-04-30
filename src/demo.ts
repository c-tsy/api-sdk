import TaskApi from './modules/Task';
import ClassTask from './modules/task/class/Task';


let task = new ClassTask();
task.Title = 'aba'
TaskApi.TaskApi.add(task)
TaskApi.TaskApi.search({
    W: {},
    Keyword: '',
    P: 1, N: 10,
});