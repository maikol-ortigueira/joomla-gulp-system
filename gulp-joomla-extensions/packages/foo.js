const { task, src, series, dest } = require('gulp');
const del = require('del');

const { extDir, wwwDir } = require('../../src/utils');
var package = __filename.split('/').pop().split('.')[0];

const langDest = `${wwwDir}/language`;
const wwwDest = `${wwwDir}/administrator/manifests/packages`

// Clean
// Clean language
task(`clean:packages.${package}.language`,
    () => {
        return del(`${langDest}/**/*.pkg_${package}.*`,
        { force: true })
    }
)

// Clean manifest
task(`clean:packages.${package}.package`,
    () => {
        return del(`${wwwDest}/pkg_${package}.xml`,
        { force: true })
    }
)

task(`clean:packages.${package}`, series(
    `clean:packages.${package}.language`,
    `clean:packages.${package}.package`
));

// Copy
// Copy language
task(`copy:packages.${package}.language`,
    series(
        `clean:packages.${package}.language`,
        () => {
            return src(`${extDir}/language/**`, { allowEmpty: true })
                .pipe(dest(langDest))
        }
    )
)

// Copy manifest
task(`copy:packages.${package}.package`,
    series(
        `clean:packages.${package}.package`,
        () => {
            return src(`${extDir}/pkg_${package}.xml`, { allowEmpty: true })
                .pipe(dest(wwwDest))
        }
    )
)

task(`copy:packages.${package}`, series(
    `copy:packages.${package}.language`,
    `copy:packages.${package}.package`
));