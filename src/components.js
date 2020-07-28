const {
    task,
    series
} = require('gulp');

const { getComponents } = require('./utils');
const components = getComponents();

const getTasks = (mainTasks) => {
    var results = [];

    for (index in components) {
        results.push(`${mainTasks}.${components[index]}`);
    }
    return results;
}

for (index in components) {
    require(`../gulp-joomla-extensions/components/${components[index]}.js`);
}


task('clean:components', series(getTasks('clean:components')));
task('copy:components', series(getTasks('copy:components')));
