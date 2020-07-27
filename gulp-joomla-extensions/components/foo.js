const { task, src, series, dest } = require('gulp');
const del = require('del');

const { extDir, wwwDir } = require('../../src/utils');
const tasksSuffix = ['manifest', 'admin.language', 'site.language', 'admin', 'site', 'media'];

const component = __filename.split('/').pop().split('.')[0];

const getTasks = (mainTask, component) => {
    results = [];
    for (var index in tasksSuffix) {
        results.push(`${mainTask}.${component}.${tasksSuffix[index]}`)
    }
    return results;
}

// Clean
// clean:components.foo.manifest
task(`clean:components.${component}.manifest`, () => {
    return del(`${wwwDir}/administrator/components/com_${component}/${component}.xml`, {
        force: true
    })
})

// clean:components.foo.admin.language
task(`clean:components.${component}.admin.language`, () => {
    return del(`${wwwDir}/administrator/language/**/*.com_${component}.*`, {
        force: true
    })
})

// clean:components.foo.site.language
task(`clean:components.${component}.site.language`, () => {
    return del(`${wwwDir}/language/**/*.com_${component}.*`, {
        force: true
    })
})

// clean:components.foo.admin
task(`clean:components.${component}.admin`, () => {
    return del(`${wwwDir}/administrator/components/com_${component}`, {
        force: true
    })
})

// clean:components.foo.site
task(`clean:components.${component}.site`, () => {
    return del(`${wwwDir}/components/com_${component}`, {
        force: true
    })
})

// clean:components.foo.media
task(`clean:components.${component}.media`, () => {
    return del(`${wwwDir}/media/com_${component}`, {
        force: true
    })
})

task(`clean:components.${component}`, series(...getTasks('clean:components', component)));

// Copy
// copy:components.foo.manifest
task(`copy:components.${component}.manifest`,
    series(`clean:components.${component}.manifest`,
        () => {
            return src(`${extDir}/components/${component}/${component}.xml`, {
                    allowEmpty: true
                })
                .pipe(dest(`${wwwDir}/administrator/components/com_${component}`))
        }
    )
);

// copy:components.foo.admin.language
task(`copy:components.${component}.admin.language`,
    series(`clean:components.${component}.admin.language`,
        () => {
            return src(`${extDir}/components/${component}/admin/language/**`, {
                    allowEmpty: true
                })
                .pipe(dest(`${wwwDir}/administrator/language`))
        }
    )
);

// copy:components.foo.site.language
task(`copy:components.${component}.site.language`,
    series(`clean:components.${component}.site.language`,
        () => {
            return src(`${extDir}/components/${component}/site/language/**`, {
                    allowEmpty: true
                })
                .pipe(dest(`${wwwDir}/language`))
        }
    )
);

// copy:components.foo.admin
task(`copy:components.${component}.admin`,
    series(`clean:components.${component}.admin`,
        `copy:components.${component}.manifest`,
        `copy:components.${component}.admin.language`,
        () => {
            return src(`${extDir}/components/${component}/admin/**`, {
                    read: false,
                    allowEmpty: true
                })
                .pipe(dest(`${wwwDir}/administrator/components/com_${component}`))
        }
    )
);

// copy:components.foo.site
task(`copy:components.${component}.site`,
    series(`clean:components.${component}.site`,
        `copy:components.${component}.site.language`,
        () => {
            return src(`${extDir}/components/${component}/site/**`, {
                    read: false,
                    allowEmpty: true
                })
                .pipe(dest(`${wwwDir}/components/com_${component}`))
        }
    )
);

// copy:components.foo.media
task(`copy:components.${component}.media`,
    series(`clean:components.${component}.media`,
        () => {
            return src(`${extDir}/components/${component}/media/**`, {
                    read: false,
                    allowEmpty: true
                })
                .pipe(dest(`${wwwDir}/media/com_${component}`))
        }
    )
);

// copy:components.foo
task(`copy:components.${component}`, series(...getTasks('copy:components', component)));