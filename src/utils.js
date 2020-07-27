const extensions = require('../extensions-config.json');
var { wwwDir, extDir } = require('../joomla-gulp-config.json');

extDir = (extDir && extDir !== '') ? extDir : '../extensions';

const hasComponents = () => {
    if (extensions.hasOwnProperty('components') && extensions.components.length > 0) {
        return true;
    } else {
        return false
    }
}

const hasPlugins = () => {
    if (extensions.hasOwnProperty('plugins')) {
        var groups = extensions.plugins;

        // Has any plugin group?
        var groupSize = 0;
        for (var groupName in groups) {
            // Has the groups any plugin?
            if (extensions.plugins[groupName].length > 0){
                groupSize += 1;
            }
        }
        if (groupSize > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

const hasModules = () => {
    if (extensions.hasOwnProperty('modules')) {
        var clients = extensions.modules;

        // Has any client module
        var Size = 0;
        for (var clientName in clients) {
            // Has the client any module?
            if (extensions.modules[clientName].length > 0){
                Size += 1;
            }
        }
        if (Size > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

const hasPackages = () => {
    if (extensions.hasOwnProperty('packages') && extensions.packages.length > 0) {
        return true;
    } else {
        return false
    }
}

const getComponents = () => {
    return extensions.components;
}

const getPackages = () => {
    return extensions.packages;
}

const getGroups = (extensionType) => {
    var results = [];

    for (group in extensions[extensionType]) {
        if (extensions[extensionType][group].length > 0){
            results.push(group);
        }
    }

    return results;
}

/**
 * Method to get the extensions name for each group
 * @param {string} extensionType The extension type (modules, plugins)
 * @param {string} group The group or client the extension belongs to
 */
const getExtensions = (extensionType, group) => {
    var results = [];
    var groupExtensions = extensions[extensionType][group];

    for (index in groupExtensions){
        if (groupExtensions[index] !== ''){
            results.push(extensions[extensionType][group][index]);
        }
    }

    return results;
}

module.exports = {
    hasComponents,
    hasPlugins,
    hasModules,
    hasPackages,
    getComponents,
    getGroups,
    getExtensions,
    getPackages,
    extDir,
    wwwDir
}