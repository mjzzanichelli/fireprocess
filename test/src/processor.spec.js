var path = require("path"),
  should = require('should'),
  chai = require("chai"),
  sinon = require("sinon"),
  silence = require("./../../src/silence").status(true),
  args = {
    err: {
      unavailable: require('./../mocks/src/processor/argv.err.unavailable.json'),
      code1: require('./../mocks/src/processor/argv.err.code1.json')
    },
    success: require('./../mocks/src/processor/argv.success.json')
  },
  processor,
  result,
  callback
  ;

process.env.SILENT = true;

describe("Fireprocess - function Processor (./src/processor)", function () {
  describe("var processor = require('./processor')", function () {
    before(function () {
      processor = require('./../../src/processor');
    });
    describe("var result = processor()", function () {
      before(function () {
        result = processor();
      });
      it("'result'  contains 'flag_types' and 'default_flag'", function () {
        result.should.have.properties("flag_types", "default_flag");
      });
      describe("'result.flag_types' Properties", function () {
        describe("'result.flag_types[x].description'", function () {
          it("are all String", function () {
            result.flag_types.should.matchEach(function (flag) {
              return typeof flag.description === "string";
            });
          });
        });
        describe("'result.flag_types[x].method'", function () {
          it("are all String", function () {
            result.flag_types.should.matchEach(function (flag) {
              return typeof flag.method === "string";
            });
          });
        });
      });
      describe("'result.default_flag'", function () {
        it("is a String", function () {
          result.default_flag.should.be.type("string");
        });
      });

    });

    describe("var result = processor(<argv>,<callback>)", function () {
      describe("Errors:", function () {
        it("<callback> receives only one argument 'err'", function (done) {
          callback = function () {
            arguments.length.should.be.exactly(1);
            done();
          };
          processor(args.err.unavailable, callback);
        });
        describe("When <argv> contains unavailable flags:", function () {
          describe("<callback>('err')", function () {
            it("'err' contains 'args' and 'res'", function (done) {
              callback = function (err) {
                err.should.have.properties("args", "res");
                done();
              };
              processor(args.err.unavailable, callback);
            });
            describe("'err.args'", function () {
              it("'err.args' is the commands Object", function (done) {
                callback = function (err) {
                  err.args.should.be.an.instanceOf(Object);
                  done();
                };
                processor(args.err.unavailable, callback);
              });
              it("'err.args[x]' is an array of Strings", function (done) {
                callback = function (err) {
                  err.args.should.matchEach(function (arg) {
                    return arg instanceof Array;
                  });
                  Object.keys(err.args).should.matchEach(function (arg) {
                    console.log(arg, typeof arg)
                    return typeof arg === "string";
                  });
                  done();
                };
                processor(args.err.unavailable, callback);
              });
            });
            describe("'err.res'", function () {
              it("'err.res' contains 'id' and 'msg'", function (done) {
                callback = function (err) {
                  err.res.should.have.properties("id", "msg");
                  done();
                };
                processor(args.err.unavailable, callback);
              });
              it("'err.res.id' is a Number'", function (done) {
                callback = function (err) {
                  err.res.id.should.be.type("number");
                  done();
                };
                processor(args.err.unavailable, callback);
              });
              it("'err.res.msg' is a String'", function (done) {
                callback = function (err) {
                  err.res.msg.should.be.type("string");
                  done();
                };
                processor(args.err.unavailable, callback);
              });
            });
          });
        });

        describe("When <argv> contains wrong commands:", function () {
          it("'err' is a Number", function (done) {
            callback = function (err) {
              err.should.be.type("number");
              done();
            };
            processor(args.err.code1, callback);
          });
          it("'err' is the node exit code", function (done) {
            callback = function (err) {
              err.should.be.exactly(1);
              done();
            };
            processor(args.err.code1, callback);
          });
        })
      });
      describe("Success:", function () {
        it("<callback> receives two arguments 'code' and 'signal'", function (done) {
          callback = function () {
            arguments.length.should.be.exactly(2);
            done();
          };
          processor(args.success, callback);
        });
        it("'err' is null", function (done) {
          callback = function (code, signal) {
            should(code).be.exactly(null);
            done();
          };
          processor(args.success, callback);
        });
      });
    });

  })
});