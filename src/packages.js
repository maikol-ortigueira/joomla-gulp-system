const { getPackages } = require("./utils");
const { task, series } = require("gulp");

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
    require(`../gulp-joomla-extensions/packages/${package}.js`);
}


task(`clean:packages`, series(...getTasks('clean')));
task(`copy:packages`, series(...getTasks('copy')));

