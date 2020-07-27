const { task, src, series, dest } = require('gulp');
const del = require('del');

const { extDir, wwwDir } = require('../../../src/utils');
var plugin = __filename.split('/').pop().split('.')[0];
const group = __dirname.split('/').pop();

const srcDir = `${extDir}/plugins/${group}/${plugin}`;
const langDest = `${wwwDir}/administrator/language`;
const wwwDest = `${wwwDir}/plugins/${group}/${plugin}`

// Clean
// Clean language
task(`clean:plugins.${group}.${plugin}.language`,
    () => {
        return del(`${langDest}/**/*.plg_${group}_${plugin}.*`, {
            force: true
        })
    }
)

// Clean plugin
task(`clean:plugins.${group}.${plugin}.plugin`,
    () => {
        return del(`${wwwDest}`, {
            force: true
        })
    }
)

// Copy
// Copy language
task(`copy:plugins.${group}.${plugin}.language`,
    series(
        `clean:plugins.${group}.${plugin}.language`,
        () => {
            return src(`${srcDir}/language/**`, {
                    allowEmpty: true
                })
                .pipe(dest(langDest))
        }
    )
)

// Copy plugin
task(`copy:plugins.${group}.${plugin}.plugin`,
    series(
        `clean:plugins.${group}.${plugin}.plugin`,
        () => {
            return src(`${srcDir}/**`, {
                    allowEmpty: true
                })
                .pipe(dest(wwwDest))
        }
    )
)

task(`clean:plugins.${group}.${plugin}`, series(`clean:plugins.${group}.${plugin}.language`, `clean:plugins.${group}.${plugin}.plugin`))
task(`copy:plugins.${group}.${plugin}`, series(`copy:plugins.${group}.${plugin}.language`, `copy:plugins.${group}.${plugin}.plugin`))
