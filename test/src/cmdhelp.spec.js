var should = require('should'),
  chai = require("chai"),
  sinon = require("sinon"),
  CmdHelp = require('./../../src/cmdhelp'),
  args = {
    err: {
      empty: require('./../mocks/src/cmdhelp/argv.err.empty.json'),
      multiple: require('./../mocks/src/cmdhelp/argv.err.multiple.json'),
      unavailable: require('./../mocks/src/cmdhelp/argv.err.unavailable.json'),
      many: require('./../mocks/src/cmdhelp/argv.err.many.json')
    },
    success: {
      default: require('./../mocks/src/cmdhelp/argv.success.default.json'),
      any: require('./../mocks/src/cmdhelp/argv.success.any.json')
    }
  },
  flag_types = {
    "foo": { description: "--foo[=]<command>", method: "foo" },
    "bar": { description: "--bar[=]<command>", method: "bar" }
  },
  default_flag = "foo",
  flag,
  checker,
  result,
  spy,
  spyOn
  ;

describe("Fireprocess - class CmdHelp (./src/cmdhelp)", function () {
  describe("var checker = new CmdHelp(<flag-types>,<default-flag>)", function () {
    before(function () {
      checker = new CmdHelp(flag_types, default_flag);
    });
    describe("'checker' Properties", function () {
      describe("'checker.flag_types'", function () {
        it("is a clone of <flag-types>", function () {
          checker.should.have.a.property("flag_types").and.containEql(flag_types);
          Object.keys(checker.flag_types).length.should.be.exactly(Object.keys(flag_types).length);
          checker.flag_types.should.not.be.exactly(flag_types);
        });
        describe("'checker.flag_types' Properties", function () {
          describe("'checker.flag_types[x].description'", function () {
            it("are all String", function () {
              checker.flag_types.should.matchEach(function (flag) {
                return typeof flag.description === "string";
              });
            });
          });
          describe("'checker.flag_types[x].method'", function () {
            it("are all String", function () {
              checker.flag_types.should.matchEach(function (flag) {
                return typeof flag.method === "string";
              });
            });
          });
        });
      });
      describe("'checker.default_flag'", function () {
        it("is equal to <default-flag>", function () {
          checker.default_flag.should.be.exactly(default_flag);
        });
        it("is a String", function () {
          checker.default_flag.should.be.type("string");
        });
      });
    });

    describe("'checker' Methods", function () {

      describe("'checker.parse'", function () {
        describe("var result = checker.parse(<argv>)", function () {
          describe("Errors:", function () {
            before(function () {
              result = checker.parse();
            });
            it("'result' contains 'args' and 'res'", function () {
              result.should.have.properties("args", "res");
            });
            it("'result.args' is the commands Object", function () {
              result.args.should.be.an.instanceOf(Object);
            });
            describe("'result.res'", function () {
              it("'result.res' contains 'id' and 'msg'", function () {
                result.res.should.have.properties("id", "msg");
              });
              it("'result.res.id' is a Number", function () {
                result.res.id.should.be.type("number");
              });
              it("'result.res.msg' is a String", function () {
                result.res.msg.should.be.type("string");
              });
            });
            describe("When <argv> is undefined:", function () {
              before(function () {
                result = checker.parse();
              });
              it("'result.res.id' is 0", function () {
                result.res.id.should.be.exactly(0);
              });
            });
            describe("When <argv> is empty:", function () {
              before(function () {
                result = checker.parse(args.err.empty);
              });
              it("'result.res.id' is 0", function () {
                result.res.id.should.be.exactly(0);
              });
            });
            describe("When <argv> has more than 1 flag:", function () {
              before(function () {
                result = checker.parse(args.err.multiple);
              });
              it("'result.res.id' is 1", function () {
                result.res.id.should.be.exactly(1);
              });
            });
            describe("When <argv> contains unavailable flags:", function () {
              before(function () {
                result = checker.parse(args.err.unavailable);
              });
              it("'result.res.id' is 2", function () {
                result.res.id.should.be.exactly(2);
              });
            });
            describe("When <argv> contains more than 1 command:", function () {
              before(function () {
                result = checker.parse(args.err.many);
              });
              it("'result.res.id' is 3", function () {
                result.res.id.should.be.exactly(3);
              });
            })
          });
          describe("Success:", function () {
            before(function () {
              result = checker.parse(args.success.default);
              flag = Object.keys(args.success.default).filter(function (flag) { return flag === "_" })[0];
            });
            it("'result' contains 'type' and 'cmd'", function () {
              result.should.have.properties("type", "cmd");
            });
            describe("When <argv> contains a default flag command:", function () {
              it("'results.type' is a string equal to the default_flag", function () {
                result.type.should.be.type("string").and.exactly(flag_types[default_flag].method);
              });
              it("'results.cmd' is a string equal to the command", function () {
                result.cmd.should.be.type("string").and.exactly(args.success.default[flag][0]);
              });
            });
            describe("When <argv> contains any other flag command:", function () {
              before(function () {
                result = checker.parse(args.success.any);
                flag = Object.keys(args.success.any).filter(function (flag) { return flag !== "_" })[0];
              });
              it("'results.type' is a string equal to the provided flag method", function () {

                result.type.should.be.type("string").and.exactly(flag_types.foo.method);
              });
              it("'results.cmd' is a string equal to the provided command", function () {
                result.cmd.should.be.type("string").and.exactly(args.success.any[flag]);
              });
            });
          });
        });

        describe("var result = checker.parse(<argv>,<callback>)", function () {
          describe("on Error", function () {
            before(function () {
              spy = sinon.spy();
              result = checker.parse(args.err.empty, spy);
            });
            it("<callback> is called once", function () {
              spy.calledOnce.should.be.ok;
            });
            it("<callback> is called with (result)", function () {
              spy.calledOnce.should.be.ok;
              spy.calledWith(result).should.be.ok;
            });
          });
          describe("on Success", function () {
            before(function () {
              spy = sinon.spy();
              result = checker.parse(args.success.default, spy);
            });
            it("<callback> is called once", function () {
              spy.calledOnce.should.be.ok;
            });
            it("<callback> is called with (null,result)", function () {
              spy.calledWith(null, result).should.be.ok;
            });
          });
        });

      });

      describe("'checker.getParser'", function () {

        describe("var result = checker.getParser(<argv>)", function () {
          before(function () {
            result = checker.getParser(args.err.empty);
          });
          it("'result' is a function", function () {
            result.should.be.type("function");
          });
          describe("result(<callback>)", function () {
            before(function () {
              spyOn = sinon.spy(checker, "parse");
              spy = sinon.spy();
              result = checker.getParser(args.err.empty);
              result(spy);
            });
            it("'checker.parse' is called with (<argv>,<callback>)", function () {
              spyOn.calledWith(args.err.empty, spy).should.be.ok;
            });
            it("'checker.parse' is called once", function () {
              spyOn.calledOnce.should.be.ok;
            });
            it("<callback> is called once", function () {
              spy.calledOnce.should.be.ok;
            });
            describe("on Error", function () {
              it("<callback> is called with (checker.parse(<argv>))", function () {
                spy.calledWith(checker.parse(args.err.empty)).should.be.ok;
              });
            });
            describe("on Success", function () {
              before(function () {
                result = checker.getParser(args.success.default);
                result = result(spy);
              });
              it("<callback> is called with (null,checker.parse(<argv>))", function () {
                spy.calledWith(null, checker.parse(args.success.default)).should.be.ok;
              });
            });
          });
        });

      });

    });
  });
});