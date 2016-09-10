var path = require("path"),
  should = require('should'),
  chai = require("chai"),
  sinon = require("sinon"),
  silence = require("./../../src/silence").status(true),
  fork_path = path.join(__dirname, './../mocks/src/main/fireprocess.fork'),
  cmd = "echo",
  args = ["foo"],
  command = [cmd].concat(args).join(" "),
  options = {
    silent: true,
    env: {
      FOO: "Bar"
    }
  },
  callback,
  fireprocess,
  proc
  ;

describe("Fireprocess - constructor Main (./src/main)", function () {
  describe("var fireprocess = require('./main')", function () {
    before(function () {
      fireprocess = require('./../../src/main');
    });
    describe("'fireprocess' Properties", function () {
      describe("'fireprocess.processes'", function () {
        it("is an empty Array", function () {
          fireprocess.processes.should.be.an.instanceOf(Array).and.have.a.property("length").and.be.equal(0);
        });
      });
    });
    describe("'fireprocess' Methods", function () {

      describe("'fireprocess.exec'", function () {
        describe("var proc = fireprocess.exec(<command>)", function () {
          before(function () {
            proc = fireprocess.exec(command);
          });
          it("'proc' is an instance of ChildProcess", function () {
            proc.constructor.name.should.be.exactly("ChildProcess")
          });
          it("'proc' is the last item in 'fireprocess.processes'", function () {
            proc.should.be.exactly(fireprocess.processes[fireprocess.processes.length - 1])
          });
        });
        describe("var proc = fireprocess.exec(<command>,<callback>)", function () {
          it("<callback> called once on 'proc' close", function (done) {
            callback = sinon.spy();
            proc = fireprocess.exec(command, options, callback);
            proc.on("close", function () {
              callback.calledOnce.should.be.ok;
              done();
            });
          });
        });
        describe("var proc = fireprocess.exec(<command>,<options>,<callback>)", function () {
          it("<callback> called once on 'proc' close", function (done) {
            callback = sinon.spy();
            proc = fireprocess.exec(command, options, callback);
            proc.on("close", function () {
              callback.calledOnce.should.be.ok;
              done();
            });
          });
        });
      });

      describe("'fireprocess.execFile'", function () {
        describe("var proc = fireprocess.execFile(<command>)", function () {
          before(function () {
            proc = fireprocess.execFile(cmd);
          });
          it("'proc' is an instance of ChildProcess", function () {
            proc.constructor.name.should.be.exactly("ChildProcess")
          });
          it("'proc' is the last item in 'fireprocess.processes'", function () {
            proc.should.be.exactly(fireprocess.processes[fireprocess.processes.length - 1])
          });
        });
        describe("var proc = fireprocess.execFile(<command>,<callback>)", function () {
          it("<callback> called once on 'proc' close", function (done) {
            callback = sinon.spy();
            proc = fireprocess.execFile(cmd, callback);
            proc.on("close", function () {
              callback.calledOnce.should.be.ok;
              done();
            });
          });
        });
        describe("var proc = fireprocess.execFile(<command>,<args>,<callback>)", function () {
          it("<callback> called once on 'proc' close", function (done) {
            callback = sinon.spy();
            proc = fireprocess.execFile(cmd, args, callback);
            proc.on("close", function () {
              callback.calledOnce.should.be.ok;
              done();
            });
          });
        });
        describe("var proc = fireprocess.execFile(<command>,<args>,<options>,<callback>)", function () {
          it("<callback> called once on 'proc' close", function (done) {
            callback = sinon.spy();
            proc = fireprocess.execFile(cmd, args, options, callback);
            proc.on("close", function () {
              callback.calledOnce.should.be.ok;
              done();
            });
          });
        });
      });

      describe("'fireprocess.fork'", function () {
        describe("var proc = fireprocess.fork(<command>)", function () {
          before(function () {
            proc = fireprocess.fork(fork_path);
          });
          it("'proc' is an instance of ChildProcess", function () {
            proc.constructor.name.should.be.exactly("ChildProcess")
          });
          it("'proc' is the last item in 'fireprocess.processes'", function () {
            proc.should.be.exactly(fireprocess.processes[fireprocess.processes.length - 1])
          });
        });
        describe("var proc = fireprocess.fork(<command>,<callback>)", function () {
          it("<callback> called once on 'proc' close", function (done) {
            callback = sinon.spy();
            proc = fireprocess.fork(fork_path, callback);
            proc.on("close", function () {
              callback.calledOnce.should.be.ok;
              done();
            });
          });
        });
        describe("var proc = fireprocess.fork(<command>,<args>,<callback>)", function () {
          it("<callback> called once on 'proc' close", function (done) {
            callback = sinon.spy();
            proc = fireprocess.fork(fork_path, args, callback);
            proc.on("close", function () {
              callback.calledOnce.should.be.ok;
              done();
            });
          });
        });
        describe("var proc = fireprocess.fork(<command>,<args>,<options>,<callback>)", function () {
          it("<callback> called once on 'proc' close", function (done) {
            callback = sinon.spy();
            proc = fireprocess.fork(fork_path, args, options, callback);
            proc.on("close", function () {
              callback.calledOnce.should.be.ok;
              done();
            });
          });
        });
      });

      describe("'fireprocess.spawn'", function () {
        describe("var proc = fireprocess.spawn(<command>)", function () {
          before(function () {
            proc = fireprocess.spawn(cmd);
          });
          it("'proc' is an instance of ChildProcess", function () {
            proc.constructor.name.should.be.exactly("ChildProcess")
          });
          it("'proc' is the last item in 'fireprocess.processes'", function () {
            proc.should.be.exactly(fireprocess.processes[fireprocess.processes.length - 1])
          });
        });
        describe("var proc = fireprocess.spawn(<command>,<callback>)", function () {
          it("<callback> called once on 'proc' close", function (done) {
            callback = sinon.spy();
            proc = fireprocess.spawn(cmd, callback);
            proc.on("close", function () {
              callback.calledOnce.should.be.ok;
              done();
            });
          });
        });
        describe("var proc = fireprocess.spawn(<command>,<args>,<callback>)", function () {
          it("<callback> called once on 'proc' close", function (done) {
            callback = sinon.spy();
            proc = fireprocess.spawn(cmd, args, callback);
            proc.on("close", function () {
              callback.calledOnce.should.be.ok;
              done();
            });
          });
        });
        describe("var proc = fireprocess.execFile(<command>,<args>,<options>,<callback>)", function () {
          it("<callback> called once on 'proc' close", function (done) {
            callback = sinon.spy();
            proc = fireprocess.spawn(cmd, args, options, callback);
            proc.on("close", function () {
              callback.calledOnce.should.be.ok;
              done();
            });
          });
        });
      });

    });
  })
});