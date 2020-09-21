var extensions = require('../extensions-config.json');
const fs = require('fs');




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
    if (hasComponents()){
        return extensions.components;
    }
}

const getPackages = () => {
    if (hasPackages()){
        return extensions.packages;
    }
}

const getPlugins = () => {
    var results = [];
    if (hasPlugins()){
        var groups = getGroups('plugins');
        for (i in groups){
            var group = groups[i];
            var plugins = getExtensions('plugins', group);
            for (index in plugins){
                var plugin = plugins[index];
                results.push({"group": group, "plugin": plugin})
            }
        }
    }
    return results;
}

const getModules = () => {
    var results = [];
    if (hasModules()){
        var clients = getGroups('modules');
        for (i in clients){
            var client = clients[i];
            var modules = getExtensions('modules', client);
            for (index in modules){
                var module = modules[index];
                results.push({"client": client, "module": module})
            }
        }
    }
    return results;
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

// Get Paths
var { wwwDir, extDir, releaseFolder, browserProxy } = require('../joomla-gulp-config.json');

// Get extension custom paths if exists
// If it's a package
if (hasPackages()) {
    extDir = `${extDir}/packages/${getPackages()}`;
}
// If it's a component 
else if (hasComponents()) {
    extDir = `${extDir}/components/${getComponents()}`;
}
// TODO if it's other extension type

if (fs.existsSync(`${extDir}/joomla-gulp-config.json`)){
    var { wwwDir, releaseFolder, browserProxy } = require(`${extDir}/joomla-gulp-config.json`); 
}

if (fs.existsSync(`${extDir}/extensions-config.json`)){
    var extensions = require(`${extDir}/extensions-config.json`);
}

extDir = (extDir && extDir !== '') ? extDir : '../extensions';

module.exports = {
    hasComponents,
    hasPlugins,
    hasModules,
    hasPackages,
    getComponents,
    getModules,
    getPlugins,
    getPackages,
    getGroups,
    getExtensions,
    extensions,
    extDir,
    wwwDir,
    releaseFolder,
    browserProxy
}