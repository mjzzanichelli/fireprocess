var child_process = require('child_process'),
  colors = require('colors/safe'),
  silence = require("./silence"),
  procs = {
    exec: child_process.exec,
    execFile: child_process.execFile,
    fork: child_process.fork,
    spawn: child_process.spawn
  }
  ;

var setProc = function (type, args, opts) {

  switch (type) {
    case "exec": return function (cmd) {
      return procs[type](cmd, opts)
    };
    default: return function (cmd) {
      return procs[type](cmd, args, opts)
    };
  }
};

var runProcess = function (type, cmd, args, opts, callback) {
  silence.log(colors.yellow("---------------------------------------"));
  silence.log(colors.yellow("FIREPROCESS - " + type.toUpperCase() + ":"));
  silence.log(colors.yellow(cmd + " " + (args || []).join(" ")));
  silence.log(colors.yellow("---------------------------------------"));
  var proc = setProc(type, args, opts);
  proc = this.processes.push(proc(cmd));
  proc = this.processes[proc - 1];
  (proc.stderr || { on: function () { } }).on('data', function (data) { silence.log(colors.red(data)) });
  (proc.stdin || { on: function () { } }).on('data', function (data) { silence.log(colors.blue(data)) });
  (proc.stdout || { on: function () { } }).on('data', function (data) { silence.log(colors.green(data)) });
  proc.on("close", function (err, data) {
    callback(err ? err : null, data)
  });
  return proc;
};

var setArgs = function (type) {
  var is_exec = type === "exec";
  return function (cmd, args, opts, callback) {
    var env = process.env;
    env.SILENT = silence.status()
    var _arguments = Array.prototype.slice.call(arguments, 0);
    switch (arguments.length - 1) {
      case 0:
        callback = function () { };
        opts = { env };
        args = [];
        break;
      case 1:
        callback = _arguments[1];
        opts = { env };
        args = [];
        break;
      case 2:
        callback = _arguments[2];
        if (is_exec) {
          opts = (function (arg) {
            var opts = typeof arg === 'object' ? Object.create(arg) : {};
            opts.env = env
            return opts;
          })(_arguments[1])
          args = []
        } else {
          opts = { env };
        }
        break;
      case 3:
        opts = (function (arg) {
          var opts = typeof arg === 'object' ? Object.create(arg) : {};
          opts.env = env
          return opts;
        })(opts)
        break;
    };
    // console.log(type, "@@", cmd, "@@", args, "@@", opts)
    return runProcess.call(this, type, cmd, args, opts, callback);
  };
};

var FireProcess = function () {
  this.processes = [];
  process.on('SIGINT', function () {
    this.processes.forEach(function (proc) {
      proc.kill('SIGINT')
      // // proc.kill('SIGINT')
      // console.log(proc.pid)
      // process.kill(proc.pid,'SIGINT')
    })
  }.bind(this))
};

FireProcess.prototype.exec = function () {
  return setArgs("exec").apply(this, Array.prototype.slice.call(arguments, 0))
};

FireProcess.prototype.execFile = function () {
  return setArgs("execFile").apply(this, Array.prototype.slice.call(arguments, 0))
};

FireProcess.prototype.fork = function () {
  return setArgs("fork").apply(this, Array.prototype.slice.call(arguments, 0))
};

FireProcess.prototype.spawn = function () {
  return setArgs("spawn").apply(this, Array.prototype.slice.call(arguments, 0))
};

module.exports = new FireProcess();
