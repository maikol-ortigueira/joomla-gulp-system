const { task, src, series, dest } = require('gulp');
const del = require('del');

const { extDir, wwwDir } = require('../../../src/utils');
var module = __filename.split('/').pop().split('.')[0];
const client = __dirname.split('/').pop();

const folder = client === 'admin' ? 'administrator/' : '';
const srcDir = `${extDir}/modules/${client}/mod_${module}`;
const langDest = `${wwwDir}/${folder}language`;
const wwwDest = `${wwwDir}/${folder}modules/mod_${module}`

// Clean
// Clean language
task(`clean:modules.${client}.${module}.language`,
    () => {
        return del(`${langDest}/**/*.mod_${module}.*`, {
            force: true
        })
    }
)

// Clean module
task(`clean:modules.${client}.${module}.module`,
    () => {
        return del(`${wwwDest}`, {
            force: true
        })
    }
)

// Copy
// Copy language
task(`copy:modules.${client}.${module}.language`,
    series(
        `clean:modules.${client}.${module}.language`,
        () => {
            return src(`${srcDir}/language/**`, {
                    allowEmpty: true
                })
                .pipe(dest(langDest))
        }
    )
)

// Copy module
task(`copy:modules.${client}.${module}.module`,
    series(
        `clean:modules.${client}.${module}.module`,
        () => {
            return src(`${srcDir}/**`, {
                    allowEmpty: true
                })
                .pipe(dest(wwwDest))
        }
    )
)

task(`clean:modules.${client}.${module}`, series(`clean:modules.${client}.${module}.language`, `clean:modules.${client}.${module}.module`))
task(`copy:modules.${client}.${module}`, series(`copy:modules.${client}.${module}.language`, `copy:modules.${client}.${module}.module`))
