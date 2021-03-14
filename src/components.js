const {
    task,
    series
} = require('gulp');

const fs = require('fs');

// Get the compnents
const { getComponents } = require('./utils');
const components = getComponents();

// Get the main tasks
const getTasks = (mainTasks) => {
    var results = [];

    for (index in components) {
        results.push(`${mainTasks}.${components[index]}`);
    }
    return results;
}

// Requiere each component source file
for (index in components) {
    let filesPath = `${__dirname}/../gulp-joomla-extensions/components/`;
    let filePath = `${filesPath}${components[index]}.js`

    if (!fs.existsSync(filePath)){
        fs.copyFileSync(`${filesPath}foo.js`, filePath)
    }

    require(filePath);
}


task('clean:components', series(getTasks('clean:components')));
task('copy:components', series(getTasks('copy:components')));
task('release:components', series(getTasks('release:components')));

