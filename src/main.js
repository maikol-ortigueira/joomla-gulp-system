const { series, task, watch } = require('gulp');
const { hasComponents, hasModules, hasPlugins, extDir, hasPackages } = require("./utils");
const browserSync = require('browser-sync').create();
var { browserProxy } = require('../joomla-gulp-config.json');

if(!browserProxy || browserProxy === ''){
    browserProxy = 'localhost';
}

if (hasComponents()) {
    require('./components');
}

if (hasPlugins()) {
    require('./plugins');
}

if (hasModules()) {
    require('./modules');
}

if (hasPackages()){
    require('./packages');
}

const getTasks = (mainTask) => {
    var results = [];
    if (hasComponents()){
        const components = require("./components");
        results.push(`${mainTask}:components`);
    }
    if (hasModules()){
        require('./modules');
        results.push(`${mainTask}:modules`);
    }
    if (hasPlugins()){
        const modules = require('./plugins');
        results.push(`${mainTask}:plugins`)
    }
    if (hasPackages()){
        const packages = require('./packages');
        results.push(`${mainTask}:packages`)
    }
    return results;
}

task('clean', series(getTasks('clean')));

task('copy', series(getTasks('copy')));

task('ext-watch', series('copy', (done) => {
    browserSync.reload();
    done();
}))

task('watch', () => {
    browserSync.init({
        proxy: browserProxy
    })
    watch(extDir,
        series(
            'ext-watch'
        )
    )
});