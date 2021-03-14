const { getPackages } = require("./utils");
const { task, series } = require("gulp");
const fs = require('fs');
const filesPath = `${__dirname}/../gulp-joomla-extensions/packages/`

const packages = getPackages();

const getTasks = (mainTask) => {
    var results = [];

    for (i in packages){
        var package = packages[i];

        results.push(`${mainTask}:packages.${package}`);
    }

    return results;
}

for (i in packages){
    var package = packages[i];
    if (!fs.existsSync(`${filesPath}${package}.js`)){
        fs.copyFileSync(`${filesPath}foo.js`, `${filesPath}${package}.js`)
    }

    require(`${filesPath}${package}.js`);
}


task(`clean:packages`, series(...getTasks('clean')));
task(`copy:packages`, series(...getTasks('copy')));
task(`release:packages`, series(...getTasks('release')));

