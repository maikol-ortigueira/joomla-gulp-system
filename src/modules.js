const { task, series } = require('gulp');

const { getGroups, getExtensions, extDir } = require('./utils');
const fs = require('fs');

const clients = getGroups('modules');
const mainTasks = ['copy', 'clean', 'release'];

const filesPath = `${__dirname}/../gulp-joomla-extensions/modules/`;

const moduleTasks = (mainTask, client) => {
    var results = [];
    var moduleNames = getExtensions('modules', client);

    for (i in moduleNames){
        var module = moduleNames[i];
            if (!fs.existsSync(`${filesPath}${client}/${module}.js`)){
                fs.copyFileSync(`${filesPath}${client}/foo.js`, `${filesPath}${client}/${module}.js`);
            }
            require(`${filesPath}${client}/${module}.js`);
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