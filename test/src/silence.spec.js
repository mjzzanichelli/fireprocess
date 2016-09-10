var path = require("path"),
  should = require('should'),
  chai = require("chai"),
  sinon = require("sinon"),
  is_silent = true,
  silence,
  text = "Foo",
  result
  ;

describe("Fireprocess - constructor Silence (./src/silence)", function () {
  describe("var silence = require('./silence')", function () {
    before(function () {
      silence = require('./../../src/silence');
    });

    describe("'silence' Methods", function () {

      describe("'silence.status'", function () {
        describe("var result = silence.status()", function () {
          before(function () {
            result = silence.status();
          });
          it("'result' is the current silent value", function () {
            result.should.not.be.ok;
          });
        });
        describe("var result = silence.status(<bool>)", function () {
          before(function () {
            result = silence.status(is_silent);
          });
          it("'result' is the current silent value", function () {
            result.should.be.exactly(is_silent);
          });
          it("process.env.SILENT is set to the current silent value", function () {
            process.env.SILENT.toString().should.be.exactly(result.toString());
          });
        });
      });

      describe("'silence.log'", function () {
        describe("var result = silence.log(<text>)", function () {
          before(function () {
            result = silence.log(text);
          });
          it("'result' is the current silent value", function () {
            result.should.be.exactly(silence.status());
          });
        });
      })

    });
  })
});