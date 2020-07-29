const {
    task,
    series
} = require('gulp');

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
    require(`../gulp-joomla-extensions/components/${components[index]}.js`);
}


task('clean:components', series(getTasks('clean:components')));
task('copy:components', series(getTasks('copy:components')));
task('release:components', series(getTasks('release:components')));

