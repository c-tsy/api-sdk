import TaskApi from './modules/Task';
import ClassTask from './modules/task/class/Task';


let task = new ClassTask();
task.Title = 'aba'
TaskApi.TaskApi.add(task)