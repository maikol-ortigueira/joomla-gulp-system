const { task, series } = require('gulp');

const fs = require('fs');
'./admin/foo.js'

const { getGroups, getExtensions, extDir } = require('./utils');

const clients = getGroups('modules');
const mainTasks = ['copy', 'clean'];

const moduleTasks = (mainTask, client) => {
    var results = [];
    var moduleNames = getExtensions('modules', client);

    for (i in moduleNames){
        var module = moduleNames[i];
            require(`../gulp-joomla-extensions/modules/${client}/${module}.js`);
            results.push(`${mainTask}:modules.${client}.${module}`);
    }
    return results;
}


const clientTasks = (mainTask) => {
    var results = [];
    
    for (index in clients){
        var client = clients[index];
        results.push(`${mainTask}:modules.${client}`);
        
    }
    return results;
}

for (i in clients){
    var client = clients[i];

    for (index in mainTasks){
        var mainTask = mainTasks[index];
        task(`${mainTask}:modules.${client}`, series(...moduleTasks(mainTask, client)));
    }
}

for (i in mainTasks){
    var mainTask = mainTasks[i];
    task(`${mainTask}:modules`, series(...clientTasks(mainTask)));
}