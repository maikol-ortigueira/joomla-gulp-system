const {
    task,
    series
} = require('gulp');

const { getComponents } = require('./utils');

const getTasks = (mainTasks) => {
    var results = [];
    var components = getComponents();

    for (index in components) {
        require(`../gulp-joomla-extensions/components/${components[index]}.js`);
        results.push(`${mainTasks}.${components[index]}`);
    }
    return results;
}

task('clean:components', series(getTasks('clean:components')));
task('copy:components', series(getTasks('copy:components')));
