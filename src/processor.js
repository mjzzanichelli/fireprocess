/**
 * @file Processor Function
 * @author José Marco Zanichelli
 * @version: 0.1
 */

/**
 * @alias Processor
 * @function Processor
 * @namespace
 * @param {object} args
 * @param {function} [callback]
 * @returns {object} {@link Processor.flag_types flag_types},{@link Processor.default_flag default_flag}
 * @description
 Accepts <b>minimist</b> argument and callback, and fires a new childprocess.
 */
processArgs = function (args, callback) {
  async.waterfall([
    checker.getParser(args)
    , startProcess
  ], processResults(callback));
  return {
    flag_types: extend({}, flag_types),
    default_flag: default_flag
  };
};

var async = require("async"),
  colors = require('colors/safe'),
  fireprocess = require("./main"),
  CmdHelp = require("./cmdhelp"),
  extend = require('util')._extend,
  silence = require("./silence"),
  /**
   * @private
   * @alias Processor.flag_types
   * @memberof Processor
   * @var {object} flag_types
   * @description
   Available flags.
   */
  flag_types = {
    "x": { description: "-[-]x[=]<command>", method: "exec" },
    "xf": { description: "--xf[=]<command>", method: "execFile" },
    "f": { description: "-f[=]<command>", method: "fork" },
    "s": { description: "-s[=]<command>", method: "spawn" }
  },
  /**
   * @private
   * @alias Processor.default_flag
   * @var {string} default_flag
   * @memberof Processor
   * @description
      default fla
   */
  default_flag = "x",
  checker = new CmdHelp(flag_types, default_flag)
  ;

/**
 * @private
 * @alias Processor.printFlags
 * @memberof Processor
 * @returns <b>process</b>
 */
printFlags = function () {
  silence.log(colors.yellow("-------------"));
  silence.log(colors.yellow("Flags allowed"));
  Object.keys(flag_types).forEach(function (f) {
    silence.log(colors.yellow(flag_types[f].method + " : " + flag_types[f].description));
  }.bind(this));
  silence.log(colors.yellow("-------------"));
  return this;
};

/**
 * @private
 * @alias Processor.getMethodName
 * @memberof Processor
 * @param {string} flag - a key in {@link Processor.flag_types flag_types}
 * @returns {string} {@link Processor.flag_types flag_types[flag].method}
 */
getMethodName = function (flag) {
  return flag_types[flag].method;
};

/**
 * @private
 * @alias Processor.processResults
 * @memberof Processor
 * @param {function} callback - passes process response back to {@link Processor}
 */
processResults = function (callback) {
  callback = callback || function () { };
  return function (err, data) {
    if (!err) return callback(null, data);
    if (err.res && err.args) {
      silence.log(colors.red("Err " + err.res.id + ": " + err.res.msg));
      Object.keys(err.args).forEach(function (a) {
        silence.log(colors.red(a + " => " + err.args[a]));
      });
      printFlags();
    } else silence.log(colors.red(err));
    callback(err)
  }
};

/**
 * @private
 * @alias Processor.startProcess
 * @memberof Processor
 * @param {object} opts
 * @param {function} [callback]
 */
startProcess = function (opts, callback) {
  return fireprocess[getMethodName(opts.type)](opts.cmd, callback);
};


/**
 * @module ./src/processor
 * @description
    returns {@link Processor}.
 */
module.exports = processArgs;
