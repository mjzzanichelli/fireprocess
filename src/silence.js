/**
 * @file Silence Class
 * @author José Marco Zanichelli
 * @version: 0.1
 */

/**
 * @alias Silence
 * @class Silence
 * @namespace
 * @description
    {@link Silence.prototype.status set}, {@link Silence.prototype.status get} and {@link Silence.prototype.log log} {@link Silence.is_silent Silence status}.
    <br/><b>process.env.SILENT</b> inherits from {@link Silence.is_silent Silence status}.
    <br/>{@link Silence.is_silent Silence status} default value: <b>false</b>.
 */
var Silence = function () {
  this.status(!!(new Function("return " + (process.env.SILENT || false).toString()))());
};

/**
 * @private
 * @alias Silence.is_silent
 * @memberof Silence
 * @var {boolean} is_silent
 * @description
 global silence status
 */
var is_silent;


/**
 * @private
 * @alias Silence.setSilent
 * @memberof Silence
 * @param {*} [val] - sets {@link Silence.is_silent is_silent} and process.env.SILENT to <b>!!val</b> when passed
 * @returns {@link Silence.is_silent is_silent}
 */
var setSilent = function (val) {
  if (arguments.length > 0) process.env.SILENT = is_silent = !!val;
  return is_silent;
};

/**
 * @private
 * @alias Silence.log
 * @memberof Silence
 * @param {...string} - console.log(..arguemnts) if {@link Silence.is_silent is_silent} is <b>false</b>
 * @returns {@link Silence.is_silent is_silent}
 */
var log = function () {
  if (!is_silent) console.log.apply(process, Array.prototype.slice.call(arguments, 0));
  return this.status();
};

/**
 * @public
 * @alias Silence.prototype.status
 * @memberof Silence
 * @description
    exposes {@link Silence.setSilent setSilent}
 */
Silence.prototype.status = setSilent;

/**
 * @public
 * @alias Silence.prototype.log
 * @memberof Silence
 * @description
    exposes {@link Silence.log log}
 */
Silence.prototype.log = log;

/**
 * @module ./src/silence
 * @description
    returns an instance of {@link Silence Silence}.
 */
module.exports = new Silence();