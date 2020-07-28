# Gulp build system for Joomla!

This build system works exactly the same as the [joomla-gulp](https://github.com/phproberto/joomla-gulp) system developed by Roberto Segura, in fact I have based my development on it to create this system.
The difference can be found when adding new extensions to the system.
You don't need to create new code for each extension, just copy and paste the foo.js file and rename it with your extension name.

## Getting started
* The first thing you need is node. For installation you can go to [node.js](https://nodejs.org).
* Next you need gulp. Once you have node installed you can follow the installation instructions [here](https://gulpjs.com/docs/en/getting-started/quick-start).
* Now you must clone this repository. Path to the repository folder and type `npm install`, it will automatically install all the dependencies needed to make the system work.

At this point everything is ready for you to start working on your new project with Joomla!.

## Configuring your system

**Rename** the file **`joomla-gulp-config.json.dist`** to **`joomla-gulp-config.json`**.
This is what the file contents look like:

```bash
    {
        "wwwDir":"path_to_joomla_site",
        "extDir":"your_extensions_path",
        "browserProxy": "probably_localhost"
    }
```
You just have to add your local installation configuration. Can be something like:

```bash
    {
        "wwwDir": "/var/www/html/mi_joomla",
        "extDir": "/home/petter/mi_joomla_extensions",
        "browserProxy": "localhost"
    }
```

**Rename** the file **`extensions-config.json.dist`** to **`extensions-config.json`**. Here is where you tell the system what extensions to look for.
This is the structure of this configuration file
```bash
    {
        "components": ["foo"],
        "plugins": {
            "bar": ["foo"],
            "system": ["foo"]
        },
        "modules": {
            "site": ["foo"],
            "admin": ["foo"]
        },
        "packages": ["foo"]
    }
```
This is an example configuration and corresponds to the **"joomla-scafolding-example"** I offer you in this package. You can remove or change the "foo" strings with your real extensions name.

## How to add my own extensions?

For these instructions we will assume that we use the configuration described above.

### Components
The component name will be "micomponent".
* I must have a folder named "micomponent" with the component content at `/home/petter/mi_joomla_extensions/components/micomponent`.
* The `extensions-config.json` must look like:
```bash
    {
        "components": ["micomponent"]
    }
```
* I must copy, paste and rename the `./gulp-joomla-extensions/components/foo.js` file to `./gulp-joomla-extensions/components/micomponent.js`

Thats all.

### Modules
In joomla! the modules can be developed for both the backend and the frontend. I'll show you how to add a module for each case.
The module name will always be "mimodule".

#### Backend
* I must have a folder named "mod_mimodule" (It must be preceded by "mod_") with the module content at `/home/petter/mi_joomla_extensions/modules/admin/mod_mimodule`
* The `extensions-config.json` must look like:
```bash
    {
        "components": ["micomponent"],
        "modules": {
            "admin": ["mimodule"]
        }
    }
```
* I must copy, paste and rename the `./gulp-joomla-extensions/modules/admin/foo.js` file to `./gulp-joomla-extensions/modules/admin/mimodule.js`
**Watch out!!**. Even if the folder name is mod_mimodule, the file name must be "mimodule.js"

Thats all.

#### Frontend
* I must have a folder named "mod_mimodule" with the module content at `/home/petter/mi_joomla_extensions/modules/site/mod_mimodule`
* The `extensions-config.json` must look like:
```bash
    {
        "components": ["micomponent"],
        "modules": {
            "admin": ["mimodule"],
            "site": ["mimodule"]
        }
    }
```
* I must copy, paste and rename the `./gulp-joomla-extensions/modules/site/foo.js` file to `./gulp-joomla-extensions/modules/site/mimodule.js`

Thats all.

### Plugins
In joomla! the plugins are grouped by type of plugin, where the system plugins are added to the system folder, the authentication plugins are added to the authentication folder and so on.
The name of the plugin will be "miplugin" and it will be of the type system.

* I must have a folder named "miplugin" with the plugin content at `/home/petter/mi_joomla_extensions/plugins/system/miplugin`
* The `extensions-config.json` must look like:
```bash
    {
        "components": ["micomponent"],
        "modules": {
            "admin": ["mimodule"],
            "site": ["mimodule"]
        },
        "plugins": {
            "system": ["miplugin"]
        }
    }
```
* I must copy, paste and rename the `./gulp-joomla-extensions/plugins/system/foo.js` file to `./gulp-joomla-extensions/plugins/system/miplugin.js`

Thats all.