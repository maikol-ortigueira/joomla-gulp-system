const {
    task,
    series
} = require('gulp');

const {
    getGroups,
    getExtensions
} = require('./utils');
const fs = require('fs');
const filesPath = `${__dirname}/../gulp-joomla-extensions/plugins/`;

const groups = getGroups('plugins');
const mainTasks = ['copy', 'clean', 'release'];

const pluginTasks = (mainTask, group) => {
    var results = [];
    var pluginNames = getExtensions('plugins', group);

    for (i in pluginNames) {
        var plugin = pluginNames[i];
        if (!fs.existsSync(`${filesPath}${group}/${plugin}.js`)) {
            fs.copyFileSync(`${filesPath}bar/foo.js`, `${filesPath}${group}/${plugin}.js`)
        }
        require(`${filesPath}${group}/${plugin}.js`);
        results.push(`${mainTask}:plugins.${group}.${plugin}`);
    }
    return results;
}


const groupTasks = (mainTask) => {
    var results = [];

    for (index in groups) {
        var group = groups[index];
        results.push(`${mainTask}:plugins.${group}`);

    }
    return results;
}

for (i in groups) {
    var group = groups[i];

    for (index in mainTasks) {
        var mainTask = mainTasks[index];
        task(`${mainTask}:plugins.${group}`, series(...pluginTasks(mainTask, group)));
    }
}

for (i in mainTasks) {
    var mainTask = mainTasks[i];
    task(`${mainTask}:plugins`, series(...groupTasks(mainTask)));
}