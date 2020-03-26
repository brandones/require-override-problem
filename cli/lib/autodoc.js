const path = require("path");
var Module = require("module");

require("ts-node").register(
  Object.assign(
    {
      ignore: [/\.js/]
    },
    require("../tsconfig.json")
  )
);

module.exports = async function(opts) {
  let cwd = process.cwd();
  if (!path.isAbsolute(cwd)) {
    cwd = path.resolve(process.cwd(), cwd);
  }
  const entrypoint = path.resolve(cwd, opts.entrypoint);

  // We are going to use the chalkStub to steal the text from the entrypoint file
  var blueText;
  // This is the stub. Once it gets the text, it throws in order to abort
  // the entrypoint require, returning control flow to this program
  const chalkStub = {
    blue: (text) => {
      blueText = text;
      throw "GOT TEXT"
    }
  };

  // Hack nodejs require
  var originalRequire = Module.prototype.require;
  Module.prototype.require = function() {
    const name = arguments[0];
    const entrypointFilename = /[^/]*$/.exec(opts.entrypoint)[0];
    if (name.match(new RegExp(".*" + entrypointFilename))) {
      // actually require the entrypoint
      const realModule = originalRequire.apply(this, arguments);
      return realModule;
    } else if (name.match(/.*chalk/)) {
      // return our module-config stub
      return chalkStub;
    } else {
      // return nothing for everything else
      return {};
    }
  };

  try {
    require(entrypoint);
  } catch (e) {
    if (e === "GOT TEXT") {
      console.log(blueText);
    } else {
      console.error(e);
      console.error(e.stack);
      process.exit(1);
    }
  }
};
