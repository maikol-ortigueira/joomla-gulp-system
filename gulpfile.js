const { series } = require('gulp');
const entry = require("./src/main");

exports.default = series('clean', 'copy', 'watch');