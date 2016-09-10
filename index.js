/**
 * @file Firepocess initiator through command lin
 * @author José Marco Zanichelli
 * @version: 0.1
 */
var argv = require('minimist')(process.argv.slice(2)),
  processor = require("./src/processor")
  ;

processor(argv);
