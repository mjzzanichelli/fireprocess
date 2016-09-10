/**
 * @file Helper class
 * @author José Marco Zanichelli
 * @version: 0.1
 */

/**
 * @alias Helper
 * @class Helper
 * @namespace
 */
var Helper = function (flag_types, default_flag) {
  this.flag_types = extend({}, flag_types);
  this.default_flag = default_flag;
  //return this;
};

var colors = require('colors/safe'),
  extend = require('util')._extend,
  errors = [
    { id: 0, msg: "no command defined" },
    { id: 1, msg: "only 1 flag allowed" },
    { id: 2, msg: "flag type not found" },
    { id: 3, msg: "ony 1 command allowed" }
  ],
  flags,
  opts
  ;

getError = function (id) {
  return extend([], errors.filter(function (item) {
    return item.id == id;
  }))[0];
};

handleError = function (argv, err, callback) {
  var result = { args: argv, res: err };
  callback(result);
  return result;
};


/**
 * @private
 * @alias Helper.parse
 * @memberof Helper
 * @param {object} argv - <b>minimist</b> arguments
 * @param {object} [callback] - callback function
 * @returns {object}
 */
parseArgv = function (argv, callback) {
  callback = callback || function () { };
  argv = extend({}, argv || { _: [] });
  if (argv._.length) {
    argv[this.default_flag] = [].concat(argv[this.default_flag]);
    argv[this.default_flag] = argv[this.default_flag].concat(argv._);
  }
  delete argv._;
  flags = Object.keys(argv);

  if (!flags.length) return handleError(argv, getError(0), callback);
  if (flags.length > 1) return handleError(argv, getError(1), callback);

  flags.forEach(function (a) {
    argv[a] = [].concat(argv[a]);
    argv[a] = argv[a].filter(function (cmd) {
      return !!cmd;
    });
  });

  if (!this.flag_types[flags[0]]) return handleError(argv, getError(2), callback);
  if (argv[flags[0]].length != 1) return handleError(argv, getError(3), callback);


  opts = {
    type: flags[0],
    cmd: argv[flags[0]][0]
  };

  callback(null, opts);
  return opts;
};

getParser = function (argv) {
  return this.parse.bind(this, argv);
};

getFlagMethod = function (flag) {
  return this.flag_types[flag].method;
};


Helper.prototype.parse = parseArgv;
Helper.prototype.getParser = getParser;

module.exports = Helper;
