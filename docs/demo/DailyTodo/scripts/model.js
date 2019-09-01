/**
 * Created by Allen on 10/14/2014.
 */

(function () {
    window.DailyTodo = window.DailyTodo || {};
    DailyTodo.Model = {};
    DailyTodo.Model.all = function (list) {
        if (list) {
            //reset task list
            amplify.store('tasks', list);
            return this;
        }
        var tasks = amplify.store('tasks') || [];
        return tasks;
    };
    DailyTodo.Model.insert = function (task) {
        var tasks = this.all();
        tasks.push(task);
        return this.all(tasks);
    };
    DailyTodo.Model.index = function (i) {
        var tasks = this.all();
        return tasks[i];
    };
    DailyTodo.Model.query = function (name) {
        var tasks = this.all();
        var task = {};
        tasks.forEach(function(t, i){
            if(t.name == name){
                task = t;
            }
        });
        return task;
    };
    DailyTodo.Model.update = function(task){
        var tasks = this.all();
        tasks.forEach(function(t, i){
            if(t.name == task.name){
                tasks[i] = task;
            }
        });
        this.all(tasks);
        return this;
    }

})();
